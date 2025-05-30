const projectWindow = document.querySelector('.window');
const projectItem = document.querySelector('.projects-item');
function projectItemHold() {
  projectItem.addEventListener('mouseenter', () => {
    projectWindow.classList.add('active');
  })
  projectItem.addEventListener('mouseleave', () => {
    projectWindow.classList.remove('active');
  })
}
projectItemHold();