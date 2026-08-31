import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
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
