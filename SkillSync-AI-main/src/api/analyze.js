export async function analyzeResume({ resume, jd }) {
  await new Promise(r => setTimeout(r, 900));
  return {
    fitScore: 72,
    existingSkills: ["React", "REST APIs", "Git", "MongoDB basics"],
    missingSkills: ["TypeScript", "Jest", "Accessibility (a11y)", "CI/CD"],
    resumeKeywords: ["TypeScript", "Unit testing (Jest)", "React Router", "a11y", "CI/CD"],
    resources: [
      { platform: "FreeCodeCamp", title: "TypeScript for JS Devs", level: "Beginner", cost: "Free", link: "https://www.freecodecamp.org" },
      { platform: "YouTube • Net Ninja", title: "Jest Crash Course", level: "Beginner", cost: "Free", link: "https://youtube.com" },
      { platform: "Udemy", title: "React Testing with Jest", level: "Intermediate", cost: "Paid", link: "https://udemy.com" },
      { platform: "Web.dev", title: "Accessibility Fundamentals", level: "Beginner", cost: "Free", link: "https://web.dev" }
    ],
    tip: "Focus on TypeScript & testing for a quick uplift."
  };
}
