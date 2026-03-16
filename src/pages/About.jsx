import MainLayout from '../components/layout/MainLayout'
import AboutSection from '../sections/About/AboutSection'
import SkillsSection from '../sections/Skills/SkillsSection'
import ExperienceSection from '../sections/Experience/ExperienceSection'
import useSmoothSectionScroll from '../hooks/useSmoothSectionScroll'

function About() {
  useSmoothSectionScroll()

  return (
    <MainLayout>
      <section data-scroll-section>
        <AboutSection />
      </section>

      <section data-scroll-section>
        <SkillsSection />
      </section>

      <section data-scroll-section>
        <ExperienceSection />
      </section>
    </MainLayout>
  )
}

export default About