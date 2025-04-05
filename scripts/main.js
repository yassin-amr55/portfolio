

      //info

      const experience = 9;

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

      // Define the projectItem function
      function projectItem(event) {
        const projectElement = event.currentTarget;
        const projectDisc = projectElement.querySelector('p');
        const text = projectDisc.textContent;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        function typeEffect() {
          if (isDeleting) {
            // Decrease letters
            charIndex--;
            projectDisc.textContent = text.slice(0, charIndex);
            if (charIndex === 0) {
              isDeleting = false;
              clearTimeout(typingTimeout);
            } else {
              typingTimeout = setTimeout(typeEffect, 1); // Faster when deleting
            }
          } else {
            // Increase letters
            charIndex++;
            projectDisc.textContent = text.slice(0, charIndex);
            if (charIndex === text.length) {
              clearTimeout(typingTimeout);
              return; // Stop typing when the full text is displayed
            } else {
              typingTimeout = setTimeout(typeEffect, 2); // Slower when typing
            }
          }
        }

        if (event.type === 'mouseenter') {
          // Start typing effect
          projectDisc.style.display = 'block';
          charIndex = 0;
          isDeleting = false;
          clearTimeout(typingTimeout);
          typeEffect();
        } else if (event.type === 'mouseleave') {
          // Start untyping effect
          isDeleting = true;
          clearTimeout(typingTimeout);
          typeEffect();
        }
      }

      // Add event listeners to projects-item elements
      document.addEventListener('DOMContentLoaded', () => {
        const projectItems = document.querySelectorAll('.projects-item');
        projectItems.forEach(item => {
          item.addEventListener('mouseenter', projectItem);
          item.addEventListener('mouseleave', projectItem);
        });
      });