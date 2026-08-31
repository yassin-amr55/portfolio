import { useCallback, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import ThemeControls from "./components/ThemeControls";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useLoadingScreen } from "./hooks/useLoadingScreen";
import { useTheme } from "./hooks/useTheme";
import { useHeaderTransition } from "./hooks/useHeaderTransition";
import { useScrollReveals } from "./hooks/useScrollReveals";
import { useSectionPositioning } from "./hooks/useSectionPositioning";
import { useSyncBodyWidth } from "./hooks/useSyncBodyWidth";

export default function App() {
  useSyncBodyWidth();
  const { loadingDone, behindDone } = useLoadingScreen();
  const { lightMode, toggleLightMode, changeAccentColor } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    signatureTrans,
    headerTrans,
    headerTransTwo,
    headerTransThree,
    btnTrans,
    btnTransTwo,
    sideTrans,
    homeTrans,
  } = useHeaderTransition();

  const { scrollsActive, servicesTitleTrans, projectsTitleTrans, contactTitleTrans } = useScrollReveals();

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = { home: homeRef, about: aboutRef, services: servicesRef, projects: projectsRef, contact: contactRef };
  useSectionPositioning(sectionRefs);

  const handleNavigate = useCallback((key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSettings = useCallback(() => setSettingsOpen((open) => !open), []);

  return (
    <>
      <LoadingScreen loadingDone={loadingDone} behindDone={behindDone} />
      <Cursor />

      <Header
        onNavigate={handleNavigate}
        signatureTrans={signatureTrans}
        headerTrans={headerTrans}
        headerTransTwo={headerTransTwo}
        headerTransThree={headerTransThree}
        btnTrans={btnTrans}
        btnTransTwo={btnTransTwo}
      />

      <ThemeControls
        lightMode={lightMode}
        onToggleLightMode={toggleLightMode}
        settingsOpen={settingsOpen}
        onToggleSettings={handleToggleSettings}
        onChangeAccentColor={changeAccentColor}
        sideTrans={sideTrans}
      />

      <Home ref={homeRef} trans={homeTrans} />
      <About ref={aboutRef} scrollsActive={scrollsActive} />
      <Services ref={servicesRef} titleTrans={servicesTitleTrans} scrollsActive={scrollsActive} />
      <Projects ref={projectsRef} titleTrans={projectsTitleTrans} scrollsActive={scrollsActive} />
      <Contact ref={contactRef} titleTrans={contactTitleTrans} scrollsActive={scrollsActive} />
    </>
  );
}
