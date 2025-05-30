//info

const experience = 10;

const discone = document.querySelector(".discone");
const experienceinfo = document.querySelector(".experienceinfo");
discone.innerHTML = `I'm a front-end Developer covering ${experience} months experience<br />but with high coding skills and pation. I love working<br />with others to build there dream website.`;
experienceinfo.innerHTML = `<strong>Experience:</strong> ${experience} months`;



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