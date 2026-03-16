import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLocalizedContent from '../../hooks/useLocalizedContent'
import ProjectMiniCard from './ProjectMiniCard'
import ProjectDetailModal from './ProjectDetailModal'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import GitHubIcon from '@mui/icons-material/GitHub'


gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773500206/ChatGPT_Image_21_42_14_14_thg_3_2026_ynutvy.png'

const MAX_VISIBLE_MINI = 4

function splitWords(text = '') {
  return text.split('\n').map((line, lineIndex) => (
    <Box
      key={`line-${lineIndex}`}
      component="span"
      sx={{ display: 'block' }}
    >
      {line.split(' ').map((word, wordIndex) => (
        <Box
          key={`${lineIndex}-${wordIndex}`}
          component="span"
          className="word-reveal"
          sx={{
            display: 'inline-block',
            mr: '0.3em',
            willChange: 'transform, opacity, filter',
          }}
        >
          {word}
        </Box>
      ))}
    </Box>
  ))
}

function StarBorderButton({ children, onClick, endIcon }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        position: 'relative',
        borderRadius: '18px',
        p: '1px',
        overflow: 'hidden',
        background: theme =>
          `linear-gradient(
            135deg,
            ${alpha(theme.palette.primary.main, 0.95)} 0%,
            ${alpha(theme.palette.secondary.main, 0.9)} 38%,
            rgba(255,255,255,0.95) 52%,
            ${alpha(theme.palette.primary.main, 0.95)} 68%,
            ${alpha(theme.palette.secondary.main, 0.9)} 100%
          )`,
        boxShadow: theme => `
          0 14px 34px ${alpha(theme.palette.primary.main, 0.28)},
          0 0 22px ${alpha(theme.palette.primary.main, 0.16)}
        `,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '-120%',
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.95) 36deg, transparent 72deg)',
          animation: 'star-spin 4.2s linear infinite',
          opacity: 0.9,
        },
        '@keyframes star-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      <ButtonBase
        onClick={onClick}
        sx={{
          position: 'relative',
          zIndex: 2,
          px: 2.5,
          py: 1.25,
          borderRadius: '17px',
          color: '#fff',
          fontWeight: 800,
          fontSize: '0.98rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          textTransform: 'none',
          background: theme =>
            `linear-gradient(
              135deg,
              ${alpha(theme.palette.background.paper, 0.92)},
              ${alpha(theme.palette.background.default, 0.84)}
            )`,
          backdropFilter: 'blur(16px)',
          transition: 'transform 0.28s ease, background 0.28s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            top: 9,
            left: 16,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 0 12px rgba(255,255,255,0.95)',
          }}
        />
        <Box
          component="span"
          sx={{
            position: 'absolute',
            right: 18,
            bottom: 9,
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(255,255,255,0.9)',
          }}
        />
        <span>{children}</span>
        {endIcon}
      </ButtonBase>
    </Box>
  )
}
function ActionGlassButton({ children, href, icon }) {
  if (!href) return null

  return (
    <ButtonBase
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: '16px',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.95rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        textTransform: 'none',
        border: '1px solid rgba(255,255,255,0.12)',
        background: theme =>
          `linear-gradient(
            135deg,
            ${alpha(theme.palette.background.paper, 0.72)},
            ${alpha(theme.palette.background.default, 0.5)}
          )`,
        backdropFilter: 'blur(14px)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
        transition:
          'transform 0.28s ease, border-color 0.28s ease, background 0.28s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: theme => alpha(theme.palette.primary.main, 0.38),
          background: theme =>
            `linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.main, 0.16)},
              ${alpha(theme.palette.background.paper, 0.72)}
            )`,
        },
      }}
    >
      {icon}
      <span>{children}</span>
    </ButtonBase>
  )
}
function ProjectsTimelineSection() {
  const { projects } = useLocalizedContent()

  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const chipsRef = useRef(null)
  const buttonRef = useRef(null)
  const cardsRef = useRef(null)
  const bgRef = useRef(null)

  const years = projects?.years || []

  const [activeYear, setActiveYear] = useState(years?.[0]?.year || '')
  const [activeProjectId, setActiveProjectId] = useState(
    years?.[0]?.featuredProjectId || years?.[0]?.projects?.[0]?.id || ''
  )
  const [detailProject, setDetailProject] = useState(null)
  const [railIndex, setRailIndex] = useState(0)

  const currentYearData = useMemo(
    () => years.find(item => item.year === activeYear) || years[0],
    [years, activeYear]
  )

  const currentProjects = currentYearData?.projects || []

  const activeProject =
    currentProjects.find(item => item.id === activeProjectId) ||
    currentProjects.find(item => item.id === currentYearData?.featuredProjectId) ||
    currentProjects[0]

  const activeProjectIndex = Math.max(
    0,
    currentProjects.findIndex(item => item.id === activeProject?.id)
  )

  const remainingCount = Math.max(0, currentProjects.length - activeProjectIndex - 1)
  const maxRailIndex = Math.max(0, currentProjects.length - MAX_VISIBLE_MINI)

  const stackedProjects = currentProjects.slice(0, railIndex)
  const visibleProjects = currentProjects.slice(railIndex, railIndex + MAX_VISIBLE_MINI)

  useEffect(() => {
    if (!currentYearData) return

    const nextId =
      currentYearData.featuredProjectId || currentYearData.projects?.[0]?.id || ''

    setActiveProjectId(nextId)
    setRailIndex(0)
  }, [currentYearData])

  useEffect(() => {
    const index = currentProjects.findIndex(item => item.id === activeProjectId)
    if (index === -1) return

    if (index < railIndex) {
      setRailIndex(index)
    } else if (index >= railIndex + MAX_VISIBLE_MINI) {
      setRailIndex(index - MAX_VISIBLE_MINI + 1)
    }
  }, [activeProjectId, currentProjects, railIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { y: 30, opacity: 0 })

      const words = descRef.current?.querySelectorAll('.word-reveal') || []

      if (words.length) {
        gsap.set(words, {
          opacity: 0,
          y: 16,
          filter: 'blur(6px)',
        })
      }

      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 20,
          opacity: 0,
        })
      }

      if (chipsRef.current) {
        gsap.set(chipsRef.current.children, {
          y: 18,
          opacity: 0,
        })
      }

      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          y: 18,
          opacity: 0,
        })
      }

      const cards = cardsRef.current?.querySelectorAll('.project-mini-card') || []

      if (cards.length) {
        gsap.set(cards, {
          y: 36,
          opacity: 0,
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.to(heroRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.25'
        )
        .to(
          chipsRef.current?.children || [],
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.35'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!activeProject) return

    const tl = gsap.timeline()

    if (bgRef.current) {
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0.45 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        }
      )
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
        },
        0
      )
    }

    const words = descRef.current?.querySelectorAll('.word-reveal') || []

    if (words.length) {
      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 14,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.42,
          stagger: 0.014,
          ease: 'power2.out',
        },
        0.05
      )
    }

    if (chipsRef.current?.children?.length) {
      tl.fromTo(
        chipsRef.current.children,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.12
      )
    }

    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'power2.out',
        },
        0.18
      )
    }
  }, [activeProject])

  const handlePrev = () => {
    if (!currentProjects.length) return

    if (activeProjectIndex > railIndex) {
      setActiveProjectId(currentProjects[activeProjectIndex - 1].id)
      return
    }

    if (railIndex > 0) {
      const nextRail = railIndex - 1
      setRailIndex(nextRail)
      setActiveProjectId(currentProjects[nextRail].id)
    }
  }

  const handleNext = () => {
    if (!currentProjects.length) return

    const visibleLastIndex = Math.min(
      railIndex + MAX_VISIBLE_MINI - 1,
      currentProjects.length - 1
    )

    if (activeProjectIndex < visibleLastIndex) {
      setActiveProjectId(currentProjects[activeProjectIndex + 1].id)
      return
    }

    if (railIndex < maxRailIndex) {
      const nextRail = railIndex + 1
      setRailIndex(nextRail)
      setActiveProjectId(currentProjects[nextRail + MAX_VISIBLE_MINI - 1].id)
    }
  }

  const handleScrollBarClick = e => {
    if (!currentProjects.length) return

    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const nextRail = Math.round(ratio * maxRailIndex)
    const safeRail = Math.max(0, Math.min(maxRailIndex, nextRail))

    setRailIndex(safeRail)

    const nextActiveIndex = Math.max(
      safeRail,
      Math.min(currentProjects.length - 1, safeRail + Math.min(1, MAX_VISIBLE_MINI - 1))
    )

    setActiveProjectId(currentProjects[nextActiveIndex]?.id || currentProjects[0]?.id)
  }

  const handleYearChange = year => {
    setActiveYear(year)
  }

  return (
    <>
      <Box
        id="projects"
        ref={sectionRef}
        component="section"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          ref={bgRef}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${activeProject?.cover || BG_IMAGE}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.55s ease',
            filter: 'saturate(0.95)',
            willChange: 'transform, opacity',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                90deg,
                rgba(8, 3, 6, 0.94) 0%,
                rgba(8, 3, 6, 0.84) 24%,
                rgba(8, 3, 6, 0.56) 56%,
                rgba(8, 3, 6, 0.92) 100%
              )
            `,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '110px minmax(0, 1fr) 720px' },
              gap: { xs: 4, md: 5 },
              alignItems: 'end',
            }}
          >
            <Stack
              direction={{ xs: 'row', lg: 'column' }}
              spacing={1.2}
              sx={{
                alignItems: { xs: 'center', lg: 'flex-start' },
                overflowX: { xs: 'auto', lg: 'visible' },
                pb: { xs: 1, lg: 0 },
              }}
            >
              {years.map(item => {
                const active = item.year === activeYear

                return (
                  <Button
                    key={item.year}
                    onClick={() => handleYearChange(item.year)}
                    sx={{
                      minWidth: 'unset',
                      px: 1.35,
                      py: 0.8,
                      borderRadius: '999px',
                      color: active ? 'text.primary' : 'text.secondary',
                      fontWeight: active ? 800 : 600,
                      border: '1px solid',
                      borderColor: active ? 'primary.main' : 'rgba(255,255,255,0.08)',
                      backgroundColor: active
                        ? theme => alpha(theme.palette.primary.main, 0.16)
                        : 'rgba(255,255,255,0.04)',
                      boxShadow: active
                        ? theme => `0 0 20px ${alpha(theme.palette.primary.main, 0.22)}`
                        : 'none',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {item.year}
                  </Button>
                )
              })}
            </Stack>

            <Box ref={heroRef}>
              <Chip
                label={projects?.badge || 'PROJECTS'}
                sx={{
                  mb: 2,
                  color: 'text.primary',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.34)}`,
                  background: theme =>
                    `linear-gradient(
                      135deg,
                      ${alpha(theme.palette.primary.main, 0.18)},
                      ${alpha(theme.palette.secondary.main, 0.08)}
                    )`,
                  backdropFilter: 'blur(10px)',
                }}
              />

              <Typography
                sx={{
                  color: 'secondary.main',
                  mb: 1,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {currentYearData?.location || activeYear}
              </Typography>

              <Typography
                ref={titleRef}
                sx={{
                  fontFamily: 'Hatton, serif',
                  fontSize: { xs: '2.0rem', md: '3.5rem' },
                  lineHeight: { xs: 0.98, md: 1.2 },
                  fontWeight: 700,
                  color: 'text.primary',
                  maxWidth: 720,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.045em',
                  textShadow: '0 10px 30px rgba(0,0,0,0.36)',
                  willChange: 'transform, opacity',
                }}
              >
                {activeProject?.title || activeProject?.title}
              </Typography>

              <Box
                sx={{
                  width: 90,
                  height: 4,
                  borderRadius: 999,
                  mb: 3,
                  background: theme =>
                    `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: theme => `0 0 16px ${alpha(theme.palette.primary.main, 0.5)}`,
                }}
              />

              <Typography
                ref={descRef}
                component="div"
                sx={{
                  maxWidth: 640,
                  color: 'text.secondary',
                  lineHeight: 1.9,
                  fontSize: { xs: '0.98rem', md: '1.04rem' },
                  mb: 3,
                }}
              >
                {splitWords(activeProject?.description || activeProject?.description || '')}
              </Typography>

              <Stack
                ref={chipsRef}
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                mb={3}
              >
                {(activeProject?.technologies || []).slice(0, 20).map(item => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                ))}
              </Stack>

              <Box ref={buttonRef}>
                <Stack
                  direction="row"
                  spacing={1.2}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ alignItems: 'center' }}
                >
                  <StarBorderButton
                    onClick={() => setDetailProject(activeProject)}
                    endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 18 }} />}
                  >
                    {projects?.viewDetailLabel || 'View Detail'}
                  </StarBorderButton>

                  {!!activeProject?.website && (
                    <ActionGlassButton
                      href={activeProject.website}
                      icon={<LanguageRoundedIcon sx={{ fontSize: 18 }} />}
                    >
                      {projects?.viewWebsiteLabel || 'Website'}
                    </ActionGlassButton>
                  )}

                  {!!activeProject?.github && (
                    <ActionGlassButton
                      href={activeProject.github}
                      icon={<GitHubIcon sx={{ fontSize: 18 }} />}
                    >
                      {projects?.viewGithubLabel || 'GitHub'}
                    </ActionGlassButton>
                  )}
                </Stack>
              </Box>
            </Box>

            <Box ref={cardsRef}>
              <Box
                sx={{
                  pt: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '86px 1fr',
                    gap: 2,
                    alignItems: 'end',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 230,
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    {stackedProjects.slice(-4).map((project, index, arr) => {
                      const depth = arr.length - index - 1

                      return (
                        <Box
                          key={project.id}
                          onClick={() => {
                            setActiveProjectId(project.id)
                            const projectIndex = currentProjects.findIndex(
                              item => item.id === project.id
                            )
                            setRailIndex(projectIndex)
                          }}
                          sx={{
                            position: 'absolute',
                            left: depth * 8,
                            bottom: depth * 8,
                            width: 68,
                            height: 168,
                            borderRadius: '22px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backgroundImage: `url("${project.cover || BG_IMAGE}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 1 - depth * 0.18,
                            transform: `scale(${1 - depth * 0.06})`,
                            boxShadow: '0 18px 28px rgba(0,0,0,0.28)',
                            transition: 'all 0.35s ease',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              inset: 0,
                              background:
                                'linear-gradient(180deg, rgba(12,4,8,0.12), rgba(12,4,8,0.74))',
                            },
                            '&:hover': {
                              transform: `translateY(-4px) scale(${1 - depth * 0.06})`,
                            },
                          }}
                        />
                      )
                    })}
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={handlePrev}
                      disabled={railIndex === 0 && activeProjectIndex === 0}
                      sx={{
                        position: 'absolute',
                        left: { xs: 6, md: -18 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 6,
                        color: '#fff',
                        backgroundColor: 'rgba(10,10,10,0.34)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        '&.Mui-disabled': {
                          opacity: 0.28,
                          color: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.08)',
                        },
                      }}
                    >
                      <KeyboardArrowLeftRoundedIcon />
                    </IconButton>

                    <IconButton
                      onClick={handleNext}
                      disabled={activeProjectIndex >= currentProjects.length - 1}
                      sx={{
                        position: 'absolute',
                        right: { xs: 6, md: -18 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 6,
                        color: '#fff',
                        backgroundColor: 'rgba(10,10,10,0.34)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        '&.Mui-disabled': {
                          opacity: 0.28,
                          color: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.08)',
                        },
                      }}
                    >
                      <KeyboardArrowRightRoundedIcon />
                    </IconButton>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          sm: 'repeat(2, minmax(0, 1fr))',
                          md: 'repeat(4, minmax(0, 1fr))',
                        },
                        gap: 2,
                        minHeight: 230,
                      }}
                    >
                      {visibleProjects.map((project, index) => {
                        const isActive = project.id === activeProject?.id

                        return (
                          <Box
                            key={project.id}
                            sx={{
                              transition: 'transform 0.45s ease, opacity 0.45s ease',
                              transform: isActive
                                ? 'translateY(-18px) scale(1.03)'
                                : 'translateY(0px) scale(1)',
                              opacity: isActive ? 1 : 0.9,
                            }}
                          >
                            <ProjectMiniCard
                              project={project}
                              index={railIndex + index}
                              active={isActive}
                              onClick={() => setActiveProjectId(project.id)}
                            />
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 2.4,
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <Box
                    onClick={handleScrollBarClick}
                    sx={{
                      position: 'relative',
                      height: 5,
                      borderRadius: 999,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        height: 5,
                        width: `${Math.max(
                          14,
                          (MAX_VISIBLE_MINI / Math.max(currentProjects.length, MAX_VISIBLE_MINI)) * 100
                        )}%`,
                        transform: `translateY(-50%) translateX(${currentProjects.length <= 1
                            ? 0
                            : (activeProjectIndex / (currentProjects.length - 1)) * 100
                          }%)`,
                        borderRadius: 999,
                        background: theme =>
                          `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: theme =>
                          `0 0 10px ${alpha(theme.palette.primary.main, 0.32)}`,
                        transition: 'transform 0.35s ease',
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0))',
                        pointerEvents: 'none',
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.92)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      lineHeight: 1,
                      minWidth: 22,
                      textAlign: 'right',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {remainingCount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <ProjectDetailModal
        open={!!detailProject}
        onClose={() => setDetailProject(null)}
        project={detailProject}
        labels={projects?.detailLabels}
      />
    </>
  )
}

export default ProjectsTimelineSection