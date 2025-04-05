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
        const text = `I am a self-taught web developer with a strong passion for coding and creating impactful digital experiences. Over the past ${experience} months, I have dedicated myself to learning and mastering web development through hands-on projects, self-directed study, and constant practice. Despite being relatively new to this field, my skills and experience reflect a high level of competence and attention to detail. I thrive on working collaboratively with clients and team members to bring their vision to life by building user-friendly, visually appealing, and functional websites. My dedication to continuous learning and problem-solving has allowed me to develop a deep understanding of web technologies in a short period. I am eager to take on new challenges, grow my expertise, and contribute meaningfully to innovative projects.`;
  
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
  