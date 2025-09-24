// src/screens/SignUpScreen.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

/* ---------- SCORING KNOBS (keeps score lower) ---------- */
const STRICTNESS = "very_strict";
const knobs = {
  normal:      { bias: -10, scale: 0.9,  minPwdOk: 50 },
  strict:      { bias: -20, scale: 0.85, minPwdOk: 60 },
  very_strict: { bias: -30, scale: 0.8,  minPwdOk: 70 },
}[STRICTNESS];

const SCORE_BIAS = knobs.bias;
const SCORE_SCALE = knobs.scale;
const MIN_PASSWORD_FOR_OK = knobs.minPwdOk;

/* ---------- OPTIONS ---------- */
const ROLES = ["Frontend Developer","Backend Developer","Full-stack","Mobile","Data / AI","UI/UX"];

export default function SignUpScreen({ navigation }) {
  const { height } = useWindowDimensions();

  // --- Responsive scale: 1.0 around tall screens, ~0.85 on short screens
  const scale = Math.max(0.82, Math.min(1.0, height / 820));
  const padH   = 24 * scale;
  const padTop = 28 * scale;
  const padBot = 36 * scale;
  const gapY   = 8  * scale;
  const inputH = 44 * scale;
  const titleF = 26 * scale;
  const subF   = 14 * scale;
  const bodyF  = 15 * scale;
  const hintF  = 11 * scale;
  const btnH   = 44 * scale;
  const iconSz = 42 * scale;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [role, setRole] = useState("");
  const [goal, setGoal] = useState("");
  const [agree, setAgree] = useState(false);
  const [allowAI, setAllowAI] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Profile photo state
  const [photoUri, setPhotoUri] = useState(null);
  const [picking, setPicking] = useState(false);

  // ✅ NEW API usage: mediaTypes is an ARRAY of ImagePicker.MediaType
  async function pickProfilePhoto() {
  try {
    setPicking(true);

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      setPicking(false);
      alert("Permission to access photos is required.");
      return;
    }

    // ✅ Works with both old (~15.x) and new (>=17) APIs
    const isNewAPI = !!ImagePicker.MediaType; // detect new API
    const options = isNewAPI
      ? {
          mediaTypes: [ImagePicker.MediaType.images], // NEW API
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          exif: false,
        }
      : {
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // OLD API
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          exif: false,
        };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    setPicking(false);
    if (!result.canceled && result.assets?.length) {
      setPhotoUri(result.assets[0].uri);
    }
  } catch (e) {
    setPicking(false);
    console.warn("Image pick error:", e);
  }
}

  function passwordStrength(p) {
    if (!p) return { score: 0, label: "Too weak" };
    let s = 0;
    if (p.length >= 8)  s += 10;
    if (p.length >= 12) s += 15;
    if (p.length >= 14) s += 10;
    if (/[a-z]/.test(p)) s += 8;
    if (/[A-Z]/.test(p)) s += 15;
    if (/\d/.test(p))    s += 12;
    if (/[^A-Za-z0-9]/.test(p)) s += 20;

    if (/password|1234|qwerty|abcd|admin|welcome/i.test(p)) s -= 40;
    if (/(\w)\1\1/.test(p)) s -= 15;
    if (/^[A-Za-z]+$/.test(p)) s -= 15;
    if (/^\d+$/.test(p)) s -= 20;
    if (p.length < 10) s -= 15;

    s = Math.max(0, Math.min(100, s));
    let label = "Too weak";
    if (s >= 75) label = "Strong";
    else if (s >= 60) label = "Okay";
    else if (s >= 40) label = "Weak";
    return { score: s, label };
  }
  const pwdInfo = useMemo(() => passwordStrength(pwd), [pwd]);

  const readiness = useMemo(() => {
    let raw = 0;
    const nameOk = name.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const confirmOk = pwd && pwd === pwd2;
    const roleOk = !!role;
    const goalOk = goal.trim().length >= 3;

    if (nameOk) raw += 10;
    if (emailOk) raw += 12;
    raw += Math.floor(pwdInfo.score * 0.30);
    if (confirmOk) raw += 8;
    if (roleOk)    raw += 8;
    if (goalOk)    raw += 8;
    if (agree)     raw += 8;

    const biased = raw * SCORE_SCALE + SCORE_BIAS;
    return Math.max(0, Math.min(100, Math.round(biased)));
  }, [name, email, pwd, pwd2, role, goal, agree, pwdInfo.score]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    agree &&
    emailOk &&
    pwdInfo.score >= MIN_PASSWORD_FOR_OK &&
    pwd &&
    pwd === pwd2 &&
    name.trim().length >= 2 &&
    !!role &&
    goal.trim().length >= 3;

  const onSignUp = () => navigation.replace("Onboarding");

  return (
    <LinearGradient colors={["#2C90F5", "#001A3A"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: padH,
            paddingTop: padTop,
            paddingBottom: padBot,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ alignItems: "center", marginBottom: 50 * scale, marginTop: 80 }}>
            <Text style={{ fontSize: titleF, color: "#fff", fontFamily: "Inter_700Bold" }}>
              Create your account
            </Text>
            <Text style={{ marginTop: 6 * scale, color: "rgba(255,255,255,0.85)", fontSize: subF }}>
              We’re Glad to see you
            </Text>
          </View>

          {/* Inputs */}
          <Field
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            inputH={inputH}
            bodyF={bodyF}
            gapY={gapY}
          />

          <ValidatedField
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            ok={!email ? undefined : emailOk}
            errorText={email && !emailOk ? "Enter a valid email" : ""}
            inputH={inputH}
            bodyF={bodyF}
            gapY={gapY}
          />

          <ValidatedField
            placeholder="Type a password"
            secure
            value={pwd}
            onChangeText={setPwd}
            ok={pwdInfo.score >= 75}
            warningText={pwd ? `Password: ${pwdInfo.label}` : ""}
            inputH={inputH}
            bodyF={bodyF}
            gapY={gapY}
          />

          <ValidatedField
            placeholder="Confirm Password"
            secure
            value={pwd2}
            onChangeText={setPwd2}
            ok={pwd && pwd === pwd2}
            errorText={pwd2 && pwd !== pwd2 ? "Passwords do not match" : ""}
            inputH={inputH}
            bodyF={bodyF}
            gapY={gapY}
          />

          {/* Role */}
          <TouchableOpacity
            onPress={() => setPickerOpen(true)}
            activeOpacity={0.85}
            style={[
              styles.inputBox,
              {
                height: inputH,
                marginBottom: gapY,
                paddingHorizontal: 14 * scale,
              },
            ]}
          >
            <Text style={{ color: role ? "#fff" : "rgba(255,255,255,0.8)", fontSize: bodyF }}>
              {role || "Role/Interest"}
            </Text>
            <Text style={{ color: "#fff", fontSize: 16 * scale }}>▾</Text>
          </TouchableOpacity>

          {/* Career Goal */}
          <TextInput
            placeholder="Career Goal"
            placeholderTextColor="rgba(255,255,255,0.8)"
            value={goal}
            onChangeText={setGoal}
            multiline
            style={[
              styles.inputBox,
              {
                minHeight: Math.max(84 * scale, 70),
                textAlignVertical: "top",
                paddingHorizontal: 14 * scale,
                fontSize: bodyF,
                marginBottom: 6 * scale,
              },
            ]}
          />
          <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: hintF, marginTop: 4 * scale, marginLeft: 6 }}>
            [Short text e.g., “Frontend Developer”]
          </Text>

          {/* Profile photo uploader */}
          <View style={{ marginTop: 10 * scale }}>
            {photoUri ? (
              <View
                style={[
                  styles.inputBox,
                  {
                    paddingHorizontal: 14 * scale,
                    paddingVertical: 12 * scale,
                    backgroundColor: "rgba(255,255,255,0.20)",
                  },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: photoUri }}
                    style={{
                      width: Math.max(72 * scale, 60),
                      height: Math.max(72 * scale, 60),
                      borderRadius: 12,
                      marginRight: 12 * scale,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#EAF2FF", marginBottom: 6 * scale, fontSize: 13 * scale }}>
                      Selected Profile Picture
                    </Text>
                    <View style={{ flexDirection: "row", gap: 10 * scale }}>
                      <TouchableOpacity
                        onPress={pickProfilePhoto}
                        disabled={picking}
                        style={{ paddingVertical: 8 * scale, paddingHorizontal: 12 * scale, backgroundColor: "#ffffff", borderRadius: 8, opacity: picking ? 0.7 : 1 }}
                      >
                        <Text style={{ color: "#0A2345", fontWeight: "600" }}>Change</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setPhotoUri(null)}
                        style={{ paddingVertical: 8 * scale, paddingHorizontal: 12 * scale, borderWidth: 1, borderColor: "rgba(255,255,255,0.7)", borderRadius: 8 }}
                      >
                        <Text style={{ color: "#EAF2FF" }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Pressable
                onPress={pickProfilePhoto}
                disabled={picking}
                style={[
                  styles.inputBox,
                  {
                    height: Math.max(72 * scale, 60),
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 14 * scale,
                    opacity: picking ? 0.6 : 1,
                  },
                ]}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#EAF2FF", marginBottom: 6 * scale, fontSize: 13 * scale }}>
                    Tap to upload profile photo
                  </Text>
                  <Image source={require("../../assets/upload.png")} style={{ width: 40 * scale, height: 40 * scale ,}} />
                </View>
              </Pressable>
            )}
          </View>

          {/* Checkboxes */}
          <CheckboxRow
            checked={agree}
            onToggle={() => setAgree(!agree)}
            label={
              <Text style={{ color: "#EAF2FF", fontSize: 14 * scale,}}>
                I agree to the <Text style={{ textDecorationLine: "underline" }}>Terms & Privacy Policy</Text>.
              </Text>
            }
            scale={scale}
          />
          <CheckboxRow
            checked={allowAI}
            onToggle={() => setAllowAI(!allowAI)}
            label={<Text style={{ color: "#EAF2FF", fontSize: 14 * scale }}>I allow my data to be analyzed by AI.</Text>}
            scale={scale}
          />

          {/* Readiness */}
          <View style={{ marginTop: 12 * scale }}>
            <Text style={{ color: "#EAF2FF", marginBottom: 6 * scale, fontFamily: "Inter_600SemiBold", fontSize: 14 * scale ,marginTop:6}}>
              Readiness Score: {readiness} / 100
            </Text>
            <View style={{ height: 10, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 999 }}>
              <View
                style={{
                  height: 10,
                  width: `${readiness}%`,
                  backgroundColor: readiness >= 70 ? "#22c55e" : readiness >= 50 ? "#f59e0b" : "#ef4444",
                  borderRadius: 999,
                }}
              />
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            onPress={onSignUp}
            disabled={!canSubmit}
            style={{
              height: btnH,
              borderRadius: 10,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20 * scale,
              opacity: canSubmit ? 1 : 0.6,
            }}
          >
            <Text style={{ color: "#0A2345", fontFamily: "Inter_700Bold", fontSize: 16 * scale }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 * scale }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
            <Text style={{ marginHorizontal: 12 * scale, color: "#fff", fontSize: 16 * scale }}>Or Login with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
          </View>

          {/* Icons only */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 * scale, gap: 60 * scale }}>
            <TouchableOpacity activeOpacity={0.9}>
                          <Image source={require("../../assets/google.png")} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}>
                          <Image source={require("../../assets/facebook.png")} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ alignItems: "center", marginTop: 35 * scale }}>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 * scale }}>
              Already have an account?{" "}
              <Text onPress={() => navigation.navigate("Login")} style={{ textDecorationLine: "underline", color: "#fff", fontFamily: "Inter_600SemiBold" }}>
                Login Now
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Role picker */}
      <Modal transparent visible={pickerOpen} animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <Pressable style={modalStyles.backdrop} onPress={() => setPickerOpen(false)}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.title}>Select Role/Interest</Text>
            {ROLES.map((r) => (
              <Pressable key={r} onPress={() => { setRole(r); setPickerOpen(false); }} style={modalStyles.item}>
                <Text style={modalStyles.itemText}>{r}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

/* ---------- Reusable pieces (responsive) ---------- */
function Field({ inputH, bodyF, gapY, ...props }) {
  return (
    <TextInput
      placeholderTextColor="rgba(255,255,255,0.8)"
      style={[styles.inputBox, { height: inputH, marginBottom: gapY, fontSize: bodyF, paddingHorizontal: 14 * (inputH / 44) }]}
      {...props}
    />
  );
}

function ValidatedField({ placeholder, value, onChangeText, secure, ok, errorText, warningText, inputH, bodyF, gapY, ...rest }) {
  const borderColor = ok === true ? "rgba(255,255,255,0.9)" : ok === false ? "#ef4444" : "rgba(255,255,255,0.35)";
  return (
    <View style={{ marginBottom: gapY }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.8)"
        style={[styles.inputBox, { height: inputH, borderWidth: 1, borderColor, fontSize: bodyF, paddingHorizontal: 14 * (inputH / 44) }]}
        {...rest}
      />
      {!!errorText && <Text style={{ color: "#ffe5e5", fontSize: Math.max(11, bodyF - 3), marginLeft: 4 }}>{errorText}</Text>}
      {!errorText && !!warningText && <Text style={{ color: "#FFF2D8", fontSize: Math.max(11, bodyF - 3), marginLeft: 4 }}>{warningText}</Text>}
    </View>
  );
}

function CheckboxRow({ checked, onToggle, label, scale }) {
  const box = 20 * scale;
  return (
    <TouchableOpacity onPress={onToggle} style={{ flexDirection: "row", alignItems: "center", gap: 10 * scale, marginTop: 8 * scale }}>
      <View style={{ width: box, height: box, borderRadius: 4, borderWidth: 2, borderColor: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center", backgroundColor: checked ? "#2A6EF5" : "transparent" }}>
        {checked ? <Text style={{ color: "#fff", fontSize: 14 * scale }}>✓</Text> : null}
      </View>
      {label}
    </TouchableOpacity>
  );
}

/* ---------- Base styles ---------- */
const styles = {
  inputBox: {
    borderRadius: 10,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.35)",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
};

const modalStyles = {
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 24 },
  sheet: { backgroundColor: "#0f172a", borderRadius: 14, padding: 12 },
  title: { color: "EAF2FF", fontSize: 16, margin: 8, textAlign: "center" },
  item: { paddingVertical: 10, paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.08)" },
  itemText: { color: "#EAF2FF", fontSize: 15 },
};
