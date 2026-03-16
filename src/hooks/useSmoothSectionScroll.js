import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export default function useSmoothSectionScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const sections = gsap.utils.toArray('[data-scroll-section]')

    sections.forEach((section) => {
      const inner = section.querySelector('[data-scroll-inner]') || section

      gsap.fromTo(
        inner,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      lenis.destroy()
    }
  }, [])
}