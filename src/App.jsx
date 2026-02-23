import { ThemeProvider } from './context/ThemeContext';
import ThreeScene from './three/ThreeScene';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import { About, Experience, Projects, Hackathons, Skills, Testimonials, Contact } from './components/Sections';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <ThreeScene />
      <Cursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Hackathons />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
