import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import DynamicNotch from './components/DynamicNotch'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Expertise from './components/Expertise'
import Projects from './components/Projects'
import Tools from './components/Tools'
import Testimonial from './components/Testimonial'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true })
    window.__lenis = lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [loading])

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <DynamicNotch activeProject={activeProject} />
          <main>
            <Hero />
            <Expertise />
            <Projects activeProject={activeProject} setActiveProject={setActiveProject} />
            <About />
            <Journey />
            <Tools />
            <Testimonial />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
