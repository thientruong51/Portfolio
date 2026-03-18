import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionContainer from '../../components/common/SectionContainer'
import useLocalizedContent from '../../hooks/useLocalizedContent'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773500206/ChatGPT_Image_21_42_14_14_thg_3_2026_ynutvy.png'

const groupColorMap = {
  Frontend: 'primary.main',
  Mobile: 'secondary.main',
  Backend: 'primary.light',
  Database: 'text.primary',
  Tools: 'secondary.main',
}

function chunkAlternate(allItems) {
  const left = []
  const right = []

  allItems.forEach((item, index) => {
    if (index % 2 === 0) left.push(item)
    else right.push(item)
  })

  return { left, right }
}

function buildPath({ x1, y1, x2, y2, side }) {
  const distance = Math.abs(x2 - x1)
  const curve = Math.max(60, distance * 0.34)

  const c1x = side === 'left' ? x1 - curve : x1 + curve
  const c2x = side === 'left' ? x2 + curve * 0.55 : x2 - curve * 0.55

  return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`
}

function SkillNode({ item, side, className = '' }) {
  const Icon = item.icon

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <Box
        className="skill-card"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: '100%', md: 360, lg: 390 },
          px: { xs: 1.3, md: 1.5 },
          py: { xs: 1.05, md: 1.15 },
          borderRadius: '18px',
          overflow: 'hidden',
          cursor: 'pointer',
          isolation: 'isolate',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
          backdropFilter: 'blur(8px)',
          boxShadow: (theme) => `
            0 10px 24px rgba(0,0,0,0.22),
            0 0 12px ${alpha(theme.palette.primary.main, 0.06)}
          `,
          transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
          willChange: 'transform, opacity',

          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.10) 0%,
                rgba(255,255,255,0.025) 22%,
                rgba(255,255,255,0) 45%
              )
            `,
            pointerEvents: 'none',
          },

          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.28),
            boxShadow: (theme) => `
              0 14px 30px rgba(0,0,0,0.28),
              0 0 16px ${alpha(theme.palette.primary.main, 0.1)}
            `,
          },

          '&:hover .skill-glow': {
            opacity: 1,
          },
        }}
      >
        <Box
          className="skill-glow"
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 200ms ease',
            background: (theme) =>
              `radial-gradient(
                circle at 18% 20%,
                ${alpha(theme.palette.primary.main, 0.14)} 0%,
                transparent 50%
              )`,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: 36, md: 38 },
              height: { xs: 36, md: 38 },
              borderRadius: '11px',
              display: 'grid',
              placeItems: 'center',
              color: groupColorMap[item.group] || 'primary.main',
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
              background: (theme) =>
                `linear-gradient(
                  180deg,
                  ${alpha(theme.palette.primary.main, 0.11)},
                  ${alpha(theme.palette.secondary.main, 0.05)}
                )`,
              flexShrink: 0,
              '& svg': {
                fontSize: '1rem',
              },
            }}
          >
            <Icon />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '0.84rem', md: '0.93rem' },
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.18,
                color: 'text.secondary',
                fontSize: '0.63rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {item.group}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function SkillsSection() {
  const { skills: skillsContent } = useLocalizedContent()

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const centerRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const svgWrapRef = useRef(null)
  const pathsRef = useRef([])
  const rafRef = useRef(null)

  const [paths, setPaths] = useState([])
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })

  const flatSkills = useMemo(() => {
    const groups = skillsContent?.groups || {}
    return Object.values(groups).flat()
  }, [skillsContent])

  const { left, right } = useMemo(() => chunkAlternate(flatSkills), [flatSkills])

  useEffect(() => {
    const computePaths = () => {
      if (!svgWrapRef.current || !centerRef.current) return

      const wrapRect = svgWrapRef.current.getBoundingClientRect()

      setSvgSize({
        width: wrapRect.width,
        height: wrapRect.height,
      })

      if (window.innerWidth < 900) {
        setPaths([])
        return
      }

      const centerRect = centerRef.current.getBoundingClientRect()
      const leftCards =
        leftColRef.current?.querySelectorAll('.skill-node-left .skill-card') || []
      const rightCards =
        rightColRef.current?.querySelectorAll('.skill-node-right .skill-card') || []

      const centerLeftX = centerRect.left - wrapRect.left + centerRect.width * 0.18
      const centerRightX = centerRect.left - wrapRect.left + centerRect.width * 0.82
      const centerY = centerRect.top - wrapRect.top + centerRect.height / 2

      const nextPaths = []

      leftCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        nextPaths.push({
          id: `left-${index}`,
          d: buildPath({
            x1: centerLeftX,
            y1: centerY,
            x2: rect.right - wrapRect.left - 3,
            y2: rect.top - wrapRect.top + rect.height / 2,
            side: 'left',
          }),
        })
      })

      rightCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        nextPaths.push({
          id: `right-${index}`,
          d: buildPath({
            x1: centerRightX,
            y1: centerY,
            x2: rect.left - wrapRect.left + 3,
            y2: rect.top - wrapRect.top + rect.height / 2,
            side: 'right',
          }),
        })
      })

      setPaths(nextPaths)
    }

    const scheduleCompute = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(computePaths)
    }

    scheduleCompute()

    const resizeObserver = new ResizeObserver(scheduleCompute)
    if (svgWrapRef.current) resizeObserver.observe(svgWrapRef.current)

    window.addEventListener('resize', scheduleCompute)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('resize', scheduleCompute)
    }
  }, [left.length, right.length, skillsContent])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleEls = titleRef.current?.children || []
      const leftNodes = leftColRef.current?.querySelectorAll('.skill-node-left') || []
      const rightNodes = rightColRef.current?.querySelectorAll('.skill-node-right') || []
      const pathElements = pathsRef.current.filter(Boolean)

      gsap.set(titleEls, { y: 20, opacity: 0 })
      gsap.set(centerRef.current, { scale: 0.88, opacity: 0 })

      gsap.set([...leftNodes, ...rightNodes], {
        opacity: 0,
        y: 22,
      })

      gsap.set(pathElements, {
        opacity: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.to(titleEls, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      })
        .to(
          centerRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.22'
        )
        .to(
          leftNodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.46,
            stagger: 0.045,
            ease: 'power2.out',
          },
          '-=0.1'
        )
        .to(
          rightNodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.46,
            stagger: 0.045,
            ease: 'power2.out',
          },
          '<'
        )
        .add(() => {
          pathElements.forEach((path) => {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 1,
            })
          })
        })
        .to(pathElements, {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.025,
          ease: 'power2.out',
        })

      gsap.to(centerRef.current, {
        y: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [paths])

  return (
    <SectionContainer
      id="skills"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 6 },
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url("${BG_IMAGE}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.02)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              135deg,
              rgba(10, 3, 6, 0.84) 0%,
              rgba(20, 3, 7, 0.64) 34%,
              rgba(75, 10, 14, 0.18) 60%,
              rgba(20, 3, 7, 0.90) 100%
            )
          `,
        }}
      />

      <Box
        ref={sectionRef}
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            maxWidth: '1600px',
            px: { xs: 2, md: 4, lg: 6 },
          }}
        >
          <Box ref={titleRef} sx={{ mb: { xs: 4, md: 3 } }}>
            <Typography
              sx={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'secondary.main',
                mb: 1,
              }}
            >
              {skillsContent?.eyebrow || 'TECH STACK'}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Hatton, serif',
                fontSize: { xs: '2rem', md: '3.3rem' },
                lineHeight: { xs: 1.05, md: 0.98 },
                letterSpacing: '-0.03em',
                color: 'text.primary',
                mb: 1,
                textShadow: '0 8px 30px rgba(0,0,0,0.35)',
              }}
            >
              {skillsContent?.title || 'Skills'}
            </Typography>

            <Typography
              sx={{
                maxWidth: 780,
                color: 'text.secondary',
                fontSize: { xs: '0.96rem', md: '1rem' },
                lineHeight: 1.7,
              }}
            >
              {skillsContent?.subtitle}
            </Typography>
          </Box>

          <Box
            ref={svgWrapRef}
            sx={{
              position: 'relative',
              height: { xs: 'auto', md: 'calc(100vh - 210px)' },
              minHeight: { xs: 980, md: 720 },
              maxHeight: { md: 820 },
              borderRadius: '32px',
              overflow: 'hidden',
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))',
              backdropFilter: 'blur(10px)',
              boxShadow: (theme) => `
                0 18px 50px rgba(0,0,0,0.28),
                0 0 24px ${alpha(theme.palette.primary.main, 0.05)}
              `,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: (theme) =>
                  `linear-gradient(
                    90deg,
                    ${theme.palette.text.primary},
                    ${theme.palette.secondary.main},
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main},
                    ${theme.palette.text.primary}
                  )`,
                boxShadow: (theme) => `0 0 14px ${alpha(theme.palette.primary.main, 0.35)}`,
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                display: { xs: 'none', md: 'block' },
                pointerEvents: 'none',
              }}
            >
              <svg
                width={svgSize.width}
                height={svgSize.height}
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                {paths.map((path, index) => (
                  <g key={path.id}>
                    <path
                      d={path.d}
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                    <path
                      ref={(el) => {
                        pathsRef.current[index] = el
                      }}
                      className="skill-line-glow"
                      d={path.d}
                      fill="none"
                      stroke="rgba(226,58,58,0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
              </svg>
            </Box>

            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 320px 1fr' },
                alignItems: 'center',
                gap: { xs: 3, md: 2, lg: 3 },
                px: { xs: 2, md: 3, lg: 4 },
                py: { xs: 3, md: 3 },
              }}
            >
              <Box
                ref={leftColRef}
                sx={{
                  order: { xs: 2, md: 1 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  gap: { xs: 1.2, md: 1.15, lg: 1.3 },
                  height: '100%',
                  pr: { md: 1.5, lg: 2.5 },
                }}
              >
                {left.map((item) => (
                  <SkillNode
                    key={`left-${item.name}`}
                    item={item}
                    side="left"
                    className="skill-node-left"
                  />
                ))}
              </Box>

              <Box
                sx={{
                  order: { xs: 1, md: 2 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  ref={centerRef}
                  sx={{
                    position: 'relative',
                    width: { xs: 160, md: 210, lg: 230 },
                    height: { xs: 160, md: 210, lg: 230 },
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))',
                    backdropFilter: 'blur(12px)',
                    boxShadow: (theme) => `
                      0 0 28px ${alpha(theme.palette.primary.main, 0.1)}
                    `,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -22,
                      borderRadius: '50%',
                      background: (theme) =>
                        `radial-gradient(
                          circle,
                          ${alpha(theme.palette.primary.main, 0.13)} 0%,
                          transparent 68%
                        )`,
                      filter: 'blur(20px)',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Hatton, serif',
                        fontSize: { xs: '1.4rem', md: '1.95rem' },
                        color: 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {skillsContent?.centerTitle || 'SKILLS'}
                    </Typography>

                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.8rem', md: '0.92rem' },
                        lineHeight: 1.5,
                        maxWidth: 130,
                        mx: 'auto',
                      }}
                    >
                      {skillsContent?.centerText || 'Fullstack stack'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                ref={rightColRef}
                sx={{
                  order: { xs: 3, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  gap: { xs: 1.2, md: 1.15, lg: 1.3 },
                  height: '100%',
                  pl: { md: 1.5, lg: 2.5 },
                }}
              >
                {right.map((item) => (
                  <SkillNode
                    key={`right-${item.name}`}
                    item={item}
                    side="right"
                    className="skill-node-right"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </SectionContainer>
  )
}

export default SkillsSection