//info

// Calculate dynamic experience based on start date (July 11, 2024)
function calculateExperience() {
  const startDate = new Date('2024-07-11');
  const today = new Date();
  
  const diffTime = Math.abs(today - startDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.floor(diffYears * 10) / 10; // Round to 1 decimal place
}

const experience = calculateExperience();

const discone = document.querySelector(".discone");
const experienceinfo = document.querySelector(".experienceinfo");
discone.innerHTML = `I'm a front-end Developer covering ${experience} year(s) experience<br />but with high coding skills and passion. I love working<br />with others to build thier dream website.`;
experienceinfo.innerHTML = `<strong>Experience:</strong> ${experience} year(s)`;



//

let leftPathHtml = ``;
//path generator
for (let i = 0; i < paths.length/2; i++) {
  console.log(i);
  leftPathHtml += `
    <div class="path-item">
        <div class="about-date">
          <img src="icons/calendar.png" class="icon">
          <p>${paths[i].date}</p>
        </div>
        <div class="path-content">
          <h2>${paths[i].title}</h2>
          <p>${paths[i].disc}</p>
        </div>
      </div>
    </div>
`;
}
document.querySelector('.path-left').innerHTML = leftPathHtml;
let rightPathHtml = ``;
for (let i = Math.ceil(paths.length / 2); i < paths.length; i++) {
  console.log(i);
  rightPathHtml += `
    <div class="path-item">
        <div class="about-date">
          <img src="icons/calendar.png" class="icon">
          <p>${paths[i].date}</p>
        </div>
        <div class="path-content">
          <h2>${paths[i].title}</h2>
          <p>${paths[i].disc}</p>
        </div>
      </div>
    </div>
`;
}
document.querySelector('.path-right').innerHTML = rightPathHtml;