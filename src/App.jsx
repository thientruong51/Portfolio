import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import SplashScreen from './components/intro/SplashScreen'
import PageTransition from './components/common/PageTransition'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsLeaving(true)
    }, 3000)

    const removeTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3600)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (showSplash) {
    return <SplashScreen isLeaving={isLeaving} />
  }

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App