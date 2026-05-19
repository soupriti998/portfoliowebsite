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
import SpecSheet from './components/SpecSheet'
import ActivityLog from './components/ActivityLog'
import Nav from './components/Nav'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [specOpen, setSpecOpen] = useState(false)
  const [activityLogOpen, setActivityLogOpen] = useState(false)

  useEffect(() => {
    // Expose toggles globally so they can be triggered from anywhere
    window.openSpecSheet = () => setSpecOpen(true)
    window.openActivityLog = () => setActivityLogOpen(true)
    return () => {
      delete window.openSpecSheet
      delete window.openActivityLog
    }
  }, [])

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
          <Nav />
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
          
          {specOpen && (
            <SpecSheet onClose={() => setSpecOpen(false)} />
          )}

          {activityLogOpen && (
            <ActivityLog onClose={() => setActivityLogOpen(false)} />
          )}
        </>
      )}
    </>
  )
}
