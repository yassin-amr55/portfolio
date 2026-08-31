import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useConsoleEasterEgg } from "./hooks/useConsoleEasterEgg";

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  useConsoleEasterEgg();

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
