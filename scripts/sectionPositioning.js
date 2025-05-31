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

// Adjust contact content position in different screens
function updateContactContentPosition() {
  const servicesContent = document.querySelector('.services-content');
  const projectsContent = document.querySelector('.projects-content');
  const contactContent = document.querySelector('.contact-content');

  const servicesContentHeight = servicesContent.offsetHeight;
  const projectsContentHeight = projectsContent.offsetHeight;
  contactContent.style.top = `${projectsContentHeight + servicesContentHeight + servicesContent.offsetTop - 200}px`;
}

window.addEventListener('resize', () => {
  updateAboutContentPosition();
  updateServicesContentPosition();
  updateProjectsContentPosition();
  updateContactContentPosition()
});

window.addEventListener('DOMContentLoaded', () => {
  updateAboutContentPosition();
  updateServicesContentPosition();
  updateProjectsContentPosition();
  updateContactContentPosition();
});