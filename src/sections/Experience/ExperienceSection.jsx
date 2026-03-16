import { useEffect, useMemo, useRef } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import useLocalizedContent from '../../hooks/useLocalizedContent'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773500206/ChatGPT_Image_21_42_14_14_thg_3_2026_ynutvy.png'

function splitWords(text = '') {
  return text.split('\n').map((line, lineIndex) => (
    <Box key={`line-${lineIndex}`} component="span" sx={{ display: 'block' }}>
      {line.split(' ').map((word, wordIndex) => (
        <Box
          key={`${lineIndex}-${wordIndex}`}
          component="span"
          className="exp-word"
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

function TimelineBlock({
  title,
  items,
  lineRef,
  cardsRef,
  type = 'experience',
}) {
  const Icon = type === 'experience' ? WorkOutlineRoundedIcon : SchoolRoundedIcon

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 980,
        mx: 'auto',
        pl: { xs: 3, md: 0 },
        mb: { xs: 8, md: 10 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
        <Typography
          sx={{
            fontFamily: 'Hatton, serif',
            color: 'text.primary',
            fontSize: { xs: '1.8rem', md: '2.6rem' },
            lineHeight: 1,
            fontWeight: 700,
            mb: 1,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        ref={lineRef}
        sx={{
          position: 'absolute',
          top: 90,
          bottom: 0,
          left: { xs: 14, md: '50%' },
          transform: { xs: 'translateX(0)', md: 'translateX(-50%)' },
          width: '3px',
          borderRadius: '999px',
          background: (theme) =>
            type === 'experience'
              ? `linear-gradient(
                  180deg,
                  ${theme.palette.primary.main} 0%,
                  ${theme.palette.secondary.main} 50%,
                  ${theme.palette.primary.light} 100%
                )`
              : `linear-gradient(
                  180deg,
                  ${theme.palette.secondary.main} 0%,
                  ${theme.palette.primary.light} 55%,
                  ${theme.palette.text.primary} 100%
                )`,
          boxShadow: (theme) =>
            `0 0 22px ${
              type === 'experience'
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }66`,
          zIndex: 1,
        }}
      />

      <Box sx={{ display: 'grid', gap: { xs: 4, md: 5 } }}>
        {items.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 80px 1fr' },
                alignItems: 'center',
              }}
            >
              <Box
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                sx={{
                  gridColumn: {
                    xs: '1 / -1',
                    md: isLeft ? '1 / 2' : '3 / 4',
                  },
                  ml: { xs: 3, md: 0 },
                  position: 'relative',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  border: (theme) => `1px solid ${theme.palette.primary.main}35`,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
                  backdropFilter: 'blur(14px)',
                  boxShadow:
                    '0 20px 70px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,255,255,0.03)',
                  p: { xs: 2.2, md: 2.8 },
                  minHeight: 230,
                  transition:
                    'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `
                      linear-gradient(
                        135deg,
                        rgba(255,255,255,0.10) 0%,
                        rgba(255,255,255,0.04) 18%,
                        rgba(255,255,255,0) 42%
                      )
                    `,
                    pointerEvents: 'none',
                  },

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: (theme) =>
                      type === 'experience'
                        ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        : `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
                    boxShadow: (theme) =>
                      `0 0 14px ${
                        type === 'experience'
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main
                      }66`,
                  },

                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: (theme) => theme.palette.primary.light,
                    boxShadow: (theme) =>
                      `0 26px 95px rgba(0,0,0,0.46), 0 0 24px ${theme.palette.primary.main}22`,
                  },
                }}
              >
                <Chip
                  label={item.label}
                  size="small"
                  sx={{
                    mb: 1.8,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'text.primary',
                    backgroundColor: (theme) =>
                      type === 'experience'
                        ? `${theme.palette.primary.main}22`
                        : `${theme.palette.secondary.main}20`,
                    border: (theme) =>
                      `1px solid ${
                        type === 'experience'
                          ? `${theme.palette.primary.main}55`
                          : `${theme.palette.secondary.main}55`
                      }`,
                  }}
                />

                <Typography
                  sx={{
                    color: 'secondary.main',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    mb: 1.2,
                  }}
                >
                  {item.period}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.primary',
                    fontFamily: 'Hatton, serif',
                    fontSize: { xs: '1.3rem', md: '1.65rem' },
                    lineHeight: 1.15,
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: '1rem',
                    mb: 0.7,
                    opacity: 0.92,
                  }}
                >
                  {item.organizationUrl ? (
                    <Box
                      component="a"
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'secondary.main',
                          textShadow: (theme) =>
                            `0 0 12px ${theme.palette.secondary.main}66`,
                        },
                      }}
                    >
                      @{item.organization}
                    </Box>
                  ) : (
                    item.organization
                  )}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.94rem',
                    mb: 1.4,
                  }}
                >
                  {item.location}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.85,
                    fontSize: { xs: '0.98rem', md: '1rem' },
                    mb: 1.8,
                  }}
                >
                  {item.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {(item.tags || []).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.main}26`,
                        backdropFilter: 'blur(8px)',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gridColumn: '2 / 3',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: 62,
                    height: 62,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    border: (theme) => `1px solid ${theme.palette.primary.main}55`,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(12px)',
                    boxShadow: (theme) =>
                      `0 0 24px ${theme.palette.primary.main}24`,
                  }}
                >
                  <Icon sx={{ fontSize: 28 }} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  position: 'absolute',
                  left: 0,
                  top: 22,
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    border: (theme) => `1px solid ${theme.palette.primary.main}55`,
                    background: (theme) => theme.palette.background.paper,
                    boxShadow: (theme) =>
                      `0 0 14px ${theme.palette.primary.main}30`,
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function ExperienceSection() {
  const { experience } = useLocalizedContent()

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const introRef = useRef(null)

  const expLineRef = useRef(null)
  const eduLineRef = useRef(null)

  const expCardsRef = useRef([])
  const eduCardsRef = useRef([])

  const certHeaderRef = useRef(null)
  const certCardsRef = useRef([])

  const experienceTimeline = useMemo(
    () => experience?.experienceTimeline || [],
    [experience]
  )
  const educationTimeline = useMemo(
    () => experience?.educationTimeline || [],
    [experience]
  )
  const certificates = useMemo(() => experience?.certificates || [], [experience])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introWords = introRef.current?.querySelectorAll('.exp-word') || []
      const expCards = expCardsRef.current.filter(Boolean)
      const eduCards = eduCardsRef.current.filter(Boolean)
      const certCards = certCardsRef.current.filter(Boolean)

      gsap.set(headerRef.current, { y: 36, opacity: 0 })
      gsap.set(introWords, { y: 18, opacity: 0, filter: 'blur(6px)' })
      gsap.set(expLineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(eduLineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(expCards, { y: 48, opacity: 0, scale: 0.985 })
      gsap.set(eduCards, { y: 48, opacity: 0, scale: 0.985 })
      gsap.set(certHeaderRef.current, { y: 28, opacity: 0 })
      gsap.set(certCards, { y: 40, opacity: 0, scale: 0.98 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      })

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          introWords,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          expLineRef.current,
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.15'
        )
        .to(
          expCards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .to(
          eduLineRef.current,
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .to(
          eduCards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .to(
          certHeaderRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.15'
        )
        .to(
          certCards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.3'
        )

      ;[expLineRef.current, eduLineRef.current].forEach((line) => {
        if (!line) return
        gsap.to(line, {
          opacity: 0.72,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      expCards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -7 : -10,
          duration: 3 + index * 0.22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      eduCards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -6 : -9,
          duration: 3 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      certCards.forEach((card, index) => {
        gsap.to(card, {
          y: -6,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [experience])

  return (
    <Box
      id="experience"
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        py: { xs: 10, md: 14 },
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
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              180deg,
              rgba(8, 4, 6, 0.94) 0%,
              rgba(20, 5, 8, 0.82) 30%,
              rgba(42, 8, 8, 0.56) 62%,
              rgba(8, 4, 6, 0.96) 100%
            )
          `,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label={experience?.badge || 'CAREER PATH'}
            sx={{
              mb: 2.5,
              height: 38,
              px: 1.2,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'text.primary',
              border: (theme) => `1px solid ${theme.palette.primary.main}55`,
              background: (theme) =>
                `linear-gradient(
                  135deg,
                  ${theme.palette.primary.main}24,
                  ${theme.palette.secondary.main}18
                )`,
              backdropFilter: 'blur(10px)',
            }}
          />

          <Typography
            sx={{
              fontFamily: 'Hatton, serif',
              fontSize: { xs: '2.3rem', md: '4.2rem' },
              lineHeight: { xs: 1.04, md: 0.95 },
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'text.primary',
              mb: 2,
              textShadow: '0 10px 30px rgba(0,0,0,0.35)',
            }}
          >
            {experience?.title || 'Experience'}
            <Box
              component="span"
              sx={{
                ml: 1.2,
                background: (theme) =>
                  `linear-gradient(
                    90deg,
                    ${theme.palette.primary.main} 0%,
                    ${theme.palette.secondary.main} 55%,
                    ${theme.palette.primary.light} 100%
                  )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {experience?.highlight || '& Education'}
            </Box>
          </Typography>

          <Typography
            ref={introRef}
            component="div"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.08rem' },
              lineHeight: 1.9,
              maxWidth: 760,
              mx: 'auto',
            }}
          >
            {splitWords(experience?.intro || '')}
          </Typography>
        </Box>

        <TimelineBlock
          title={experience?.experienceTitle || 'Experience'}
          items={experienceTimeline}
          lineRef={expLineRef}
          cardsRef={expCardsRef}
          type="experience"
        />

        <TimelineBlock
          title={experience?.educationTitle || 'Education'}
          items={educationTimeline}
          lineRef={eduLineRef}
          cardsRef={eduCardsRef}
          type="education"
        />

        <Box ref={certHeaderRef} sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            label={experience?.certificatesBadge || 'CERTIFIED SKILLS'}
            sx={{
              mb: 2,
              height: 36,
              px: 1.1,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'text.primary',
              border: (theme) => `1px solid ${theme.palette.secondary.main}55`,
              background: (theme) =>
                `linear-gradient(
                  135deg,
                  ${theme.palette.secondary.main}22,
                  ${theme.palette.primary.main}16
                )`,
              backdropFilter: 'blur(10px)',
            }}
          />

          <Typography
            sx={{
              fontFamily: 'Hatton, serif',
              color: 'text.primary',
              fontSize: { xs: '1.9rem', md: '3rem' },
              lineHeight: 1,
              fontWeight: 700,
              mb: 1.2,
            }}
          >
            {experience?.certificatesTitle || 'Certificates'}
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              maxWidth: 760,
              mx: 'auto',
              lineHeight: 1.85,
            }}
          >
            {experience?.certificatesSubtitle || ''}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 2.2, md: 2.8 },
          }}
        >
          {certificates.map((cert, index) => (
            <Box
              key={cert.id}
              ref={(el) => {
                certCardsRef.current[index] = el
              }}
              sx={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                minHeight: 260,
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                border: (theme) => `1px solid ${theme.palette.secondary.main}30`,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                backdropFilter: 'blur(14px)',
                boxShadow:
                  '0 18px 60px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(255,255,255,0.03)',
                transition:
                  'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',

                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.10) 0%,
                      rgba(255,255,255,0.03) 20%,
                      rgba(255,255,255,0) 40%
                    )
                  `,
                },

                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: (theme) =>
                    `linear-gradient(
                      90deg,
                      ${theme.palette.secondary.main},
                      ${theme.palette.primary.main},
                      ${theme.palette.primary.light}
                    )`,
                  boxShadow: (theme) =>
                    `0 0 14px ${theme.palette.secondary.main}66`,
                },

                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: (theme) => theme.palette.secondary.main,
                  boxShadow: (theme) =>
                    `0 26px 95px rgba(0,0,0,0.42), 0 0 24px ${theme.palette.secondary.main}22`,
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '18px',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.primary',
                  border: (theme) => `1px solid ${theme.palette.secondary.main}55`,
                  background: (theme) => `${theme.palette.secondary.main}18`,
                  boxShadow: (theme) => `0 0 24px ${theme.palette.secondary.main}22`,
                }}
              >
                <WorkspacePremiumRoundedIcon sx={{ fontSize: 28 }} />
              </Box>

              <Typography
                sx={{
                  color: 'text.primary',
                  fontFamily: 'Hatton, serif',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                {cert.name}
              </Typography>

              <Typography
                sx={{
                  color: 'secondary.main',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  letterSpacing: '0.06em',
                  mb: 1,
                  textTransform: 'uppercase',
                }}
              >
                {cert.issuer} • {cert.date}
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.92rem',
                  mb: 1.8,
                }}
              >
                Credential ID: {cert.credentialId}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2.2}>
                {(cert.skills || []).map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: (theme) =>
                        `1px solid ${theme.palette.secondary.main}26`,
                    }}
                  />
                ))}
              </Stack>

              <Button
                component="a"
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                variant="outlined"
                sx={{
                  mt: 'auto',
                  borderRadius: '14px',
                  px: 2,
                  py: 1,
                  fontWeight: 700,
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: (theme) => `${theme.palette.secondary.main}55`,
                  background: (theme) => `${theme.palette.secondary.main}10`,
                  '&:hover': {
                    borderColor: 'secondary.main',
                    background: (theme) => `${theme.palette.secondary.main}18`,
                    boxShadow: (theme) => `0 0 14px ${theme.palette.secondary.main}44`,
                  },
                }}
              >
                {cert.buttonText}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ExperienceSection