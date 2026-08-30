// Ports the date-math helpers from scripts/generator.js and
// scripts/otherEffects.js. Pure functions — no DOM, so no hook needed.

export function calculateExperience() {
  const startDate = new Date("2024-07-11");
  const today = new Date();

  const diffTime = Math.abs(today - startDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(diffYears * 10) / 10; // Round to 1 decimal place
}

export function calculateAge() {
  const birthDate = new Date("2009-12-10");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
