let isTransitioning = false; // Flag to track if a transition is happening

      const header = document.querySelector("header");
      const headerbtns = document.querySelectorAll("header button");
      const signatureCont = document.querySelector(".signature-container");
      const homeContent = document.querySelector(".home-content");
      const profileimg = document.querySelector(".profileimg");

      //transforming header

      function transHeader() {
        if (isTransitioning) return; // Prevent further transitions if already transitioning

        isTransitioning = true; // Set the flag to true when transitioning

        signatureCont.classList.add("trans");
        setTimeout(() => {
          header.classList.add("trans");
          headerbtns.forEach((headerbtn) => {
            headerbtn.classList.add("trans");
          })
        }, 100);

        setTimeout(() => {
          header.classList.add("transtwo");
          lightModeButton.classList.add("trans");
          settingsPanel.classList.add("trans");
          settingsButton.classList.add("trans");
          homeContent.classList.add("trans");
          isTransitioning = false; // Reset the flag once the transition is complete
        }, 500);
        setTimeout(() => {
          headerbtns.forEach((headerbtn) => {
            headerbtn.classList.add("transtwo");
          });
        }, 700);
      }

      function reverseTrans() {
        if (isTransitioning) return; // Prevent reverse transition while transitioning

        isTransitioning = true; // Set the flag to true when transitioning

        homeContent.classList.remove("trans");
        headerbtns.forEach((headerbtn) => {
          headerbtn.classList.remove("transtwo");
        });
        header.classList.remove("transtwo");
        header.classList.add("transthree");
        lightModeButton.classList.remove("trans");
        settingsButton.classList.remove("trans");
        settingsPanel.classList.remove("trans");

        setTimeout(() => {
          header.classList.remove("trans", "transthree");
          headerbtns.forEach((headerbtn) => {
            headerbtn.classList.remove("trans", "transtwo");
          });
          signatureCont.classList.remove("trans");
          isTransitioning = false;
        }, 500);
      }

      const servicesTitle = document.querySelector('.services-title');
      const projectsTitle = document.querySelector('.projects-title');
      const contactTitle = document.querySelector('.contact-title');
      function handleScroll() {
      // Handle header transition
      if (window.scrollY > 2) {
        if (!header.classList.contains("trans")) {
          transHeader();
        }
      } else {
        if (header.classList.contains("trans")) {
          reverseTrans();
        }
      }

      // Handle contact title transition
      if (window.scrollY > 2930) { // Adjust this value as needed for your layout
        contactTitle.classList.add('trans');
      } else {
        contactTitle.classList.remove('trans');
      }

      // Handle services title transition
      if (window.scrollY > 1450) {
        servicesTitle.classList.add('trans');
      } else {
        servicesTitle.classList.remove('trans');
      }

      // Handle services title transition
      if (window.scrollY > 2450) {
        projectsTitle.classList.add('trans');
      } else {
        projectsTitle.classList.remove('trans');
      }
    }

      // Attach or detach scroll event based on window width
      function updateScrollHandler() {
        if (window.innerWidth >= 1000) {
          window.onscroll = handleScroll;
        } else { 
          window.onscroll = null;
        }
      }
      if (window.innerWidth >= 1000) {
        updateScrollHandler();

        window.addEventListener("resize", updateScrollHandler);
      } else if (window.innerWidth < 1000) {
        servicesTitle.classList.add('trans');
      }

      //

const scrollss = document.querySelectorAll(".scrolls");

      function scrollanimation() {
        if (window.scrollY > 10) {
          scrollss.forEach((scrolls) => {
            scrolls.classList.add("active");
          });
        } else if (window.scrollY === 0) {
          scrollss.forEach((scrolls) => {
            scrolls.classList.remove("active");
          });
        }
      }

      window.addEventListener("scroll", scrollanimation);
      
      // disc scrolling Effect
      document.addEventListener("DOMContentLoaded", () => {

        // Disc scrolling Effect
        const disctwo = document.querySelector(".disctwo");
        const text = `I am a self-taught full-stack developer with a strong passion for coding and creating impactful digital experiences. Over the past ${experience} year(s), I have dedicated myself to learning and mastering development through hands-on projects, self-directed study, and constant practice. Despite being relatively new to this field, my skills and experience reflect a high level of competence and attention to detail. I thrive on working collaboratively with clients and team members to bring their vision to life by building user-friendly, visually appealing, and functional websites and applications. From interactive web apps to mobile solutions, I create amazing digital products that solve real problems. My dedication to continuous learning and problem-solving has allowed me to develop a deep understanding of modern technologies in a short period. I am eager to take on new challenges, grow my expertise, and contribute meaningfully to innovative projects.`;
  
        // Split the text into individual characters wrapped in span elements
        disctwo.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
  
        const spans = disctwo.querySelectorAll('span');
        const totalLength = spans.length;
        let ticking = false;
  
        function updateTextBasedOnScroll() {
          const rect = disctwo.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
  
          // Calculate visibility and scrolling progress
          const visibleHeight = Math.min(
            viewportHeight,
            Math.max(0, viewportHeight - rect.top)
          );
          const totalHeight = rect.height + viewportHeight;
          const scrollProgress = Math.min(
            1,
            Math.max(0, (visibleHeight - rect.height) / totalHeight)
          );
  
          // Speed up the effect by applying a multiplier to scrollProgress
          const speedMultiplier = 2; // Adjust this value to control the speed
          const charsToShow = Math.round(scrollProgress * totalLength * speedMultiplier);
  
          // Update the color of each character based on scroll progress
          spans.forEach((span, index) => {
            if (index < charsToShow) {
              span.style.color = 'var(--disc-color)';
            } else {
              span.style.color = 'var(--disc-scroll-color)';
            }
          });
  
          ticking = false; // Allow the next scroll update
        }
  
        function onScroll() {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateTextBasedOnScroll);
          }
        }
  
        window.addEventListener("scroll", onScroll);
        updateTextBasedOnScroll(); // Initial call to set the text based on initial scroll position
      });
  