// Adjust about content position in different screens
function updateAboutContentPosition() {
  const homeContent = document.querySelector('.home-content');
  const aboutContent = document.querySelector('.about-content');

  const homeContentHeight = homeContent.offsetHeight;
  aboutContent.style.top = `${homeContentHeight -100}px`;
}

// Adjust services content position in different screens
function updateServicesContentPosition() {
  const aboutContent = document.querySelector('.about-content');
  const servicesContent = document.querySelector('.services-content');

  const aboutContentHeight = aboutContent.offsetHeight;
  servicesContent.style.top = `${aboutContentHeight + aboutContent.offsetTop -100}px`;
}

// Adjust projects content position in different screens
function updateProjectsContentPosition() {
  const servicesContent = document.querySelector('.services-content');
  const projectsContent = document.querySelector('.projects-content');

  const servicesContentHeight = servicesContent.offsetHeight;
  projectsContent.style.top = `${servicesContentHeight + servicesContent.offsetTop -100}px`;
}

// Add event listeners
window.addEventListener('resize', () => {
  updateAboutContentPosition();
  updateServicesContentPosition();
  updateProjectsContentPosition();
});

window.addEventListener('DOMContentLoaded', () => {
  updateAboutContentPosition();
  updateServicesContentPosition();
  updateProjectsContentPosition();
});