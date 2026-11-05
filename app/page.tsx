import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AudioExperiencePrompt from "@/components/AudioExperiencePrompt";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090B] text-[#F2F1ED] selection:bg-[#00D9FF] selection:text-[#08090B] relative">
      <Navbar />
      <Hero />
      <Projects />
      <InteractiveShowcase />
      <About />
      <Achievements />
      <Skills />
      <GithubActivity />
      <Contact />
      <Footer />
      <AudioExperiencePrompt />
    </main>
  );
}
