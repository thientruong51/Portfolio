import { useEffect, useMemo, useRef } from 'react'
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLocalizedContent from '../../hooks/useLocalizedContent'
import { useNavigate } from 'react-router-dom'
gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773500206/ChatGPT_Image_21_42_14_14_thg_3_2026_ynutvy.png'

const PROFILE_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773510773/TaosK_jkxsyx.png'

const CV_LINK = "/cv/DiepNguyenThienTruong_Resume.pdf"


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

function AboutSection() {
  const { about } = useLocalizedContent()
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const cardRef = useRef(null)
  const marqueeTopRef = useRef(null)
  const marqueeBottomRef = useRef(null)
  const textRef = useRef(null)
  const focusTextRef = useRef(null)

  const roles = useMemo(() => about?.marquee || [], [about])
  const loopText = useMemo(() => [...roles, ...roles, ...roles], [roles])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          y: 32,
          opacity: 0,
        })
      }

      if (cardRef.current) {
        gsap.set(cardRef.current, {
          y: 36,
          opacity: 0,
          scale: 0.98,
        })
      }

      const textWords = textRef.current?.querySelectorAll('.word-reveal') || []
      const focusWords = focusTextRef.current?.querySelectorAll('.word-reveal') || []

      if (textWords.length) {
        gsap.set(textWords, {
          opacity: 0,
          y: 18,
          filter: 'blur(6px)',
        })
      }

      if (focusWords.length) {
        gsap.set(focusWords, {
          opacity: 0,
          y: 16,
          filter: 'blur(5px)',
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(
          textWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.028,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          cardRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
          },
          '-=0.45'
        )
        .to(
          focusWords,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
          },
          '-=0.2'
        )

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (marqueeTopRef.current) {
        gsap.fromTo(
          marqueeTopRef.current,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: 24,
            repeat: -1,
            ease: 'none',
          }
        )
      }

      if (marqueeBottomRef.current) {
        gsap.fromTo(
          marqueeBottomRef.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            duration: 26,
            repeat: -1,
            ease: 'none',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [about])

  return (
    <Box
      id="about"
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
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
              135deg,
              rgba(10, 3, 6, 0.72) 0%,
              rgba(20, 3, 7, 0.54) 34%,
              rgba(75, 10, 14, 0.18) 60%,
              rgba(20, 3, 7, 0.84) 100%
            )
          `,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.07,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {!!loopText.length && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 52, md: 72 },
              left: 0,
              width: '100%',
              overflow: 'hidden',
              zIndex: 2,
              transform: 'rotate(-2deg)',
              pointerEvents: 'none',
            }}
          >
            <Box
              ref={marqueeTopRef}
              sx={{
                display: 'flex',
                width: 'max-content',
                gap: 4,
              }}
            >
              {loopText.map((item, index) => (
                <Typography
                  key={`top-${index}`}
                  sx={{
                    fontFamily: 'Hatton, serif',
                    fontSize: { xs: '1.9rem', md: '3.6rem' },
                    lineHeight: 1,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    color: (theme) =>
                      index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    textShadow: (theme) =>
                      index % 2 === 0
                        ? `0 0 18px ${theme.palette.primary.main}55`
                        : '0 0 10px rgba(255,255,255,0.10)',
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 70, md: 88 },
              left: 0,
              width: '100%',
              overflow: 'hidden',
              zIndex: 2,
              transform: 'rotate(2deg)',
              pointerEvents: 'none',
              opacity: 0.9,
            }}
          >
            <Box
              ref={marqueeBottomRef}
              sx={{
                display: 'flex',
                width: 'max-content',
                gap: 4,
              }}
            >
              {loopText.map((item, index) => (
                <Typography
                  key={`bottom-${index}`}
                  sx={{
                    fontFamily: 'Hatton, serif',
                    fontSize: { xs: '1.7rem', md: '3.2rem' },
                    lineHeight: 1,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    color: (theme) =>
                      index % 2 === 0
                        ? theme.palette.text.primary
                        : theme.palette.secondary.main,
                    textShadow: (theme) =>
                      index % 2 === 0
                        ? '0 0 8px rgba(255,255,255,0.08)'
                        : `0 0 14px ${theme.palette.secondary.main}44`,
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            alignItems: 'center',
            gap: { xs: 6, md: 4, lg: 8 },
          }}
        >
          <Box ref={contentRef}>
            <Chip
              label={about?.badge || about?.title || 'ABOUT'}
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
                    ${theme.palette.primary.main}2e,
                    ${theme.palette.secondary.main}1e
                  )`,
                backdropFilter: 'blur(10px)',
              }}
            />

            <Typography
              sx={{
                fontFamily: 'Hatton, serif',
                fontSize: { xs: '2.4rem', md: '4.4rem' },
                lineHeight: { xs: 1.03, md: 0.95 },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'text.primary',
                maxWidth: 700,
                mb: 2.5,
                textShadow: '0 8px 30px rgba(0,0,0,0.35)',
              }}
            >
              {about?.subtitleTop || 'I build'}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  ml: 1.2,
                  background: (theme) =>
                    `linear-gradient(
                      90deg,
                      ${theme.palette.primary.main} 0%,
                      ${theme.palette.secondary.main} 60%,
                      ${theme.palette.primary.light} 100%
                    )`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
                }}
              >
                {about?.subtitleHighlight || 'modern'}
              </Box>
              <br />
              {about?.subtitleBottom || 'digital experiences.'}
            </Typography>

            <Typography
              ref={textRef}
              component="div"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.9,
                maxWidth: 640,
                mb: 4,
              }}
            >
              {splitWords(about?.text || '')}
            </Typography>

            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              {(about?.skills || []).map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 700,
                    borderRadius: '999px',
                    border: (theme) => `1px solid ${theme.palette.primary.main}38`,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: { xs: 'center', md: 'center' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: { xs: 260, md: 360 },
                height: { xs: 260, md: 360 },
                borderRadius: '50%',
                background: (theme) =>
                  `radial-gradient(
                    circle,
                    ${theme.palette.primary.main}55 0%,
                    ${theme.palette.primary.main}1c 40%,
                    transparent 72%
                  )`,
                filter: 'blur(20px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            <Box
              ref={cardRef}
              sx={{
                position: 'relative',
                width: { xs: '100%', sm: 390, md: 430 },
                maxWidth: 430,
                minHeight: { xs: 520, md: 620 },
                borderRadius: '28px',
                overflow: 'hidden',
                cursor: 'pointer',
                isolation: 'isolate',
                border: (theme) => `1px solid ${theme.palette.primary.main}40`,
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(14px)',
                boxShadow:
                  '0 20px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.03) inset',
                transition:
                  'transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',

                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-20%',
                  zIndex: 4,
                  pointerEvents: 'none',
                  background: `
                    linear-gradient(
                      115deg,
                      transparent 18%,
                      rgba(255,255,255,0.03) 28%,
                      rgba(255,255,255,0.15) 38%,
                      rgba(255,255,255,0.38) 48%,
                      rgba(255,255,255,0.12) 58%,
                      rgba(255,255,255,0.08) 64%,
                      transparent 74%
                    )
                  `,
                  transform: 'translateX(-150%) rotate(12deg)',
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                },

                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: 'none',
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.12) 0%,
                      rgba(255,255,255,0.04) 18%,
                      rgba(255,255,255,0) 38%
                    )
                  `,
                  opacity: 0.5,
                },

                '&:hover': {
                  transform: 'translateY(-10px) rotateX(1deg) rotateY(-1deg)',
                  borderColor: (theme) => theme.palette.primary.light,
                  boxShadow: (theme) =>
                    `0 30px 110px rgba(0,0,0,0.55),
                     0 0 35px ${theme.palette.primary.main}2c,
                     0 0 0 1px rgba(255,255,255,0.05) inset`,
                },

                '&:hover::before': {
                  transform: 'translateX(150%) rotate(12deg)',
                },

                '&:hover .card-shine-soft': {
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url("${PROFILE_IMAGE}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  zIndex: 0,
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
                      rgba(10, 10, 16, 0.06) 0%,
                      rgba(10, 10, 16, 0.04) 28%,
                      rgba(8, 8, 14, 0.16) 48%,
                      rgba(8, 8, 14, 0.68) 74%,
                      rgba(8, 8, 14, 0.94) 100%
                    )
                  `,
                }}
              />

              <Box
                className="card-shine-soft"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.45s ease',
                  background: `
                    radial-gradient(
                      circle at 22% 16%,
                      rgba(255,255,255,0.22) 0%,
                      rgba(255,255,255,0.08) 16%,
                      transparent 40%
                    )
                  `,
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  zIndex: 3,
                  background: (theme) =>
                    `linear-gradient(
                      90deg,
                      ${theme.palette.primary.main} 0%,
                      ${theme.palette.secondary.main} 60%,
                      ${theme.palette.primary.light} 100%
                    )`,
                  boxShadow: (theme) => `0 0 14px ${theme.palette.primary.main}88`,
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  display: 'flex',
                  gap: 0.8,
                  zIndex: 3,
                }}
              >
                {['primary.main', 'secondary.main', 'text.primary'].map((colorKey, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: colorKey,
                      boxShadow: (theme) => {
                        const value = colorKey
                          .split('.')
                          .reduce((obj, key) => obj?.[key], theme.palette)
                        return `0 0 10px ${value}`
                      },
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: 18,
                  right: 18,
                  bottom: 18,
                  zIndex: 3,
                  borderRadius: '22px',
                  p: { xs: 2, md: 2.4 },
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Hatton, serif',
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    mb: 0.5,
                  }}
                >
                  {about?.name || 'Your Name'}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.95rem',
                    mb: 1.8,
                  }}
                >
                  {about?.role || 'Frontend Developer'}
                </Typography>

                <Typography
                  sx={{
                    color: 'secondary.main',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    mb: 0.8,
                  }}
                >
                  {about?.focusTitle || 'CURRENT FOCUS'}
                </Typography>

                <Typography
                  ref={focusTextRef}
                  component="div"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    mb: 1.8,
                  }}
                >
                  {splitWords(about?.focusText || '')}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={1.8}>
                  {(about?.highlights || []).map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 700,
                        backgroundColor: (theme) => `${theme.palette.primary.main}1c`,
                        border: (theme) => `1px solid ${theme.palette.primary.main}30`,
                      }}
                    />
                  ))}
                </Stack>

                <Stack direction="row" spacing={1.2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    onClick={() => navigate('/projects')}
                    sx={{
                      px: 2.2,
                      py: 1.1,
                      borderRadius: '14px',
                      fontWeight: 800,
                      textTransform: 'none',
                      background: (theme) =>
                        `linear-gradient(
        90deg,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.secondary.main} 100%
      )`,
                      boxShadow: (theme) => `0 12px 24px ${theme.palette.primary.main}3d`,
                    }}
                  >
                    {about?.cta || 'View Projects'}
                  </Button>

                  <Button
                    component="a"
                    href={CV_LINK}
                    download="DiepNguyenThienTruong_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{
                      px: 2.2,
                      py: 1.1,
                      borderRadius: '14px',
                      fontWeight: 700,
                      textTransform: 'none',
                      borderColor: (theme) => `${theme.palette.primary.main}66`,
                      color: 'text.primary',
                      backdropFilter: 'blur(10px)',
                      background: (theme) => `${theme.palette.primary.main}12`,
                      '&:hover': {
                        borderColor: 'secondary.main',
                        background: (theme) => `${theme.palette.primary.main}20`,
                        boxShadow: (theme) => `0 0 14px ${theme.palette.primary.main}55`,
                      },
                    }}
                  >
                    Download CV
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutSection