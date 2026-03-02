// Calculate and display dynamic age
function calculateAge() {
  const birthDate = new Date('2009-12-10');
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  const ageElement = document.getElementById('dynamic-age');
  if (ageElement) {
    ageElement.textContent = age;
  }
}

// Run on page load
calculateAge();
