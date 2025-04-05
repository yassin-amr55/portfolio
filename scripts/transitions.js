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
          isTransitioning = false;
        }, 300);
        setTimeout(() => {
          headerbtns.forEach((headerbtn) => {
            headerbtn.classList.remove("trans", "transtwo");
          });
          signatureCont.classList.remove("trans");
        }, 500);
      }

      const servicesTitle = document.querySelector('.services-title');
      const projectsTitle = document.querySelector('.projects-title');
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