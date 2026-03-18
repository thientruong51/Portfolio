import { useMemo } from 'react'
import { Box, Typography, Stack, Chip, Button, Container } from '@mui/material'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import useLocalizedContent from '../../hooks/useLocalizedContent'
import UnicornScene from 'unicornstudio-react'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)
const MotionStack = motion(Stack)

const CV_LINK = '/cv/DiepNguyenThienTruong_Resume.pdf'

const socialLinks = [
  {
    icon: <LinkedInIcon />,
    label: 'https://www.linkedin.com/in/truongdnt0501',
    url: 'https://www.linkedin.com/in/truongdnt0501',
  },
  {
    icon: <FacebookIcon />,
    label: 'https://www.facebook.com/taosk2003',
    url: 'https://www.facebook.com/taosk2003',
  },
  {
    icon: <GitHubIcon />,
    label: 'https://github.com/thientruong51',
    url: 'https://github.com/thientruong51',
  },
  {
    icon: <EmailIcon />,
    label: 'thientruongdn51@gmail.com',
    url: 'mailto:thientruongdn51@gmail.com',
  },
]

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function AnimatedDescription({ text }) {
  const words = (text || '').split(' ')

  return (
    <Typography
      component="div"
      sx={{
        color: 'rgba(255, 232, 236, 0.84)',
        fontSize: { xs: '0.96rem', sm: '1rem', md: '1.05rem', lg: '1.08rem' },
        lineHeight: 1.9,
        fontWeight: 400,
        textShadow: '0 2px 14px rgba(0,0,0,0.24)',
        textAlign: { xs: 'left', md: 'right' },
        maxWidth: { xs: '100%', md: 560, lg: 620 },
        ml: { md: 'auto' },
      }}
    >
      {words.map((word, index) => (
        <MotionBox
          key={`${word}-${index}`}
          component="span"
          initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.28,
            delay: 0.4 + index * 0.04,
            ease: 'easeOut',
          }}
          sx={{
            display: 'inline-block',
            mr: '0.35em',
          }}
        >
          {word}
        </MotionBox>
      ))}
    </Typography>
  )
}

function HeroSection() {
  const localizedContent = useLocalizedContent()
  const hero = localizedContent?.hero || {}
  const locale = localizedContent?.locale || localizedContent?.language || 'default'

  const typingSequence = useMemo(() => {
    return hero.roles?.length > 0
      ? hero.roles.flatMap((item) => [item, 1600])
      : [hero.role || '', 1600]
  }, [hero.roles, hero.role])

  const typeAnimationKey = useMemo(() => {
    return `${locale}-${JSON.stringify(typingSequence)}`
  }, [locale, typingSequence])

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#120204',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -45%)',
            width: { xs: '180%', sm: '150%', md: '132%', lg: '127%' },
            height: { xs: '120vh', sm: '126vh', md: '130vh', lg: '133.5vh' },
          }}
        >
          <UnicornScene
            projectId="1yY0su5IUX1VpoLERwIX"
            width="100%"
            height="100%"
            scale={1}
            dpi={1}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                90deg,
                rgba(10,0,0,0.78) 0%,
                rgba(20,0,0,0.50) 20%,
                rgba(20,0,0,0.10) 42%,
                rgba(20,0,0,0.06) 56%,
                rgba(10,0,0,0.32) 74%,
                rgba(10,0,0,0.66) 100%
              ),
              linear-gradient(
                180deg,
                rgba(0,0,0,0.12) 0%,
                rgba(0,0,0,0.24) 100%
              )
            `,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 42%, rgba(255,70,70,0.12) 0%, rgba(255,70,70,0.04) 22%, transparent 46%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 3, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'grid',
            alignItems: 'center',
            gap: { xs: 5, sm: 6, md: 4, lg: 6 },
            gridTemplateColumns: {
              xs: '1fr',
              md: 'minmax(0, 1.05fr) minmax(360px, 0.95fr)',
              lg: 'minmax(0, 1.08fr) minmax(420px, 0.92fr)',
            },
            py: { xs: 12, sm: 10, md: 8 },
          }}
        >
          <MotionBox
            initial="hidden"
            animate="show"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 620, lg: 700 },
              pr: { xs: 0, md: 2, lg: 4 },
            }}
          >
            <MotionTypography
              component="h1"
              custom={0.08}
              variants={fadeLeft}
              sx={{
                fontFamily: 'Hatton, serif',
                fontWeight: 700,
                lineHeight: { xs: 0.98, sm: 0.94, md: 0.9, lg: 0.88 },
                letterSpacing: '-0.04em',
                fontSize: {
                  xs: '3rem',
                  sm: '3.6rem',
                  md: '4.6rem',
                  lg: '5.5rem',
                  xl: '6.2rem',
                },
                color: '#fff5f6',
                textShadow: '0 8px 30px rgba(0,0,0,0.28)',
                '@keyframes textGlowMove': {
                  '0%': {
                    backgroundPosition: '0% 50%',
                    filter: 'drop-shadow(0 0 6px rgba(255,70,110,0.35))',
                  },
                  '50%': {
                    backgroundPosition: '100% 50%',
                    filter: 'drop-shadow(0 0 16px rgba(255,70,110,0.6))',
                  },
                  '100%': {
                    backgroundPosition: '0% 50%',
                    filter: 'drop-shadow(0 0 6px rgba(255,70,110,0.35))',
                  },
                },
              }}
            >
              {hero.titleLines?.map((line, index) => {
                const isAccent =
                  index >= (hero.titleLines.length || 0) - 2 || line.includes('&')

                return (
                  <Box
                    key={`${line}-${index}`}
                    component="span"
                    sx={{
                      display: 'block',
                      whiteSpace: { xs: 'normal', md: 'nowrap' },
                      ...(isAccent && {
                        background:
                          'linear-gradient(90deg, #ffe9e9, #ff6a3a, #e23a3a, #ff6a3a, #ffe9e9)',
                        backgroundSize: '300% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'textGlowMove 6s linear infinite',
                      }),
                      ...(!isAccent && {
                        textShadow: '0 8px 30px rgba(0,0,0,0.28)',
                      }),
                    }}
                  >
                    {line}
                  </Box>
                )
              })}
            </MotionTypography>
          </MotionBox>

          <MotionBox
            initial="hidden"
            animate="show"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', md: 520, lg: 620 },
                textAlign: { xs: 'left', md: 'right' },
              }}
            >
              <MotionBox
                custom={0.18}
                variants={fadeRight}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1.6,
                  py: 0.8,
                  mb: 2.5,
                  borderRadius: '999px',
                  border: '1px solid rgba(255,110,130,0.24)',
                  background: 'rgba(30, 6, 10, 0.34)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 24px rgba(255, 50, 80, 0.10)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Hatton, serif',
                    fontSize: { xs: '0.96rem', sm: '1rem', md: '1.08rem', lg: '1.15rem' },
                    fontWeight: 700,
                    color: 'rgba(255,230,235,0.95)',
                    minHeight: '1.4em',
                    letterSpacing: '0.01em',
                  }}
                >
                  <TypeAnimation
                    key={typeAnimationKey}
                    sequence={typingSequence}
                    wrapper="span"
                    speed={58}
                    repeat={Infinity}
                    cursor={true}
                  />
                </Typography>
              </MotionBox>

              <MotionBox custom={0.3} variants={fadeRight} sx={{ mb: 4 }}>
                <AnimatedDescription text={hero.description} />
              </MotionBox>

              <MotionStack
                direction="row"
                custom={0.5}
                variants={fadeRight}
                sx={{
                  mb: 4,
                  flexWrap: 'wrap',
                  gap: 1.2,
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                }}
              >
                {hero.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      height: 36,
                      color: '#ffe9ed',
                      fontWeight: 600,
                      border: '1px solid rgba(255,105,125,0.18)',
                      background: 'rgba(20, 7, 10, 0.45)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
                      '& .MuiChip-label': {
                        px: 1.8,
                      },
                      '&:hover': {
                        background: 'rgba(60, 10, 18, 0.72)',
                        borderColor: 'rgba(255,105,125,0.34)',
                      },
                    }}
                  />
                ))}
              </MotionStack>

              <MotionStack
                direction="row"
                spacing={2}
                custom={0.64}
                variants={fadeRight}
                sx={{
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  rowGap: 1.5,
                }}
              >
                <Button
                  component="a"
                  href={CV_LINK}
                  download="DiepNguyenThienTruong_Resume.pdf"
                  variant="contained"
                  size="large"
                  sx={{
                    position: 'relative',
                    minWidth: 170,
                    height: 54,
                    px: 3.2,
                    borderRadius: '16px',
                    fontWeight: 700,
                    textTransform: 'none',
                    color: '#fff',
                    background: 'transparent',
                    overflow: 'hidden',
                    isolation: 'isolate',
                    boxShadow: 'none',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-2px',
                      borderRadius: 'inherit',
                      background:
                        'linear-gradient(90deg, #ff2f2f 0%, #ff8f8f 25%, #ff4f4f 50%, #ffb3b3 75%, #ff2f2f 100%)',
                      backgroundSize: '300% 100%',
                      animation: 'movingBorderPrimary 4s linear infinite',
                      zIndex: 0,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: '2px',
                      borderRadius: '14px',
                      background:
                        'linear-gradient(180deg, rgba(28,8,12,0.96) 0%, rgba(20,7,10,0.92) 100%)',
                      zIndex: 1,
                    },
                    '& .btn-content': {
                      position: 'relative',
                      zIndex: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    animation: 'glowPulse 2.2s ease-in-out infinite',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'none',
                    },
                    '&:hover::before': {
                      animationDuration: '1.8s',
                      filter: 'brightness(1.15)',
                    },
                    '&:hover .btn-content': {
                      textShadow: '0 0 10px rgba(255,255,255,0.18)',
                    },
                    '@keyframes movingBorderPrimary': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '100%': { backgroundPosition: '200% 50%' },
                    },
                    '@keyframes glowPulse': {
                      '0%': { filter: 'drop-shadow(0 0 8px rgba(255, 60, 95, 0.22))' },
                      '50%': { filter: 'drop-shadow(0 0 18px rgba(255, 60, 95, 0.40))' },
                      '100%': { filter: 'drop-shadow(0 0 8px rgba(255, 60, 95, 0.22))' },
                    },
                  }}
                >
                  <Box component="span" className="btn-content">
                    {hero.ctaPrimary}
                  </Box>
                </Button>

                <Button
                  component="a"
                  href="#contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    position: 'relative',
                    minWidth: 150,
                    height: 54,
                    px: 3.2,
                    borderRadius: '16px',
                    fontWeight: 700,
                    textTransform: 'none',
                    color: '#ffd8df',
                    border: 'none',
                    background: 'transparent',
                    overflow: 'hidden',
                    isolation: 'isolate',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      borderRadius: 'inherit',
                      background:
                        'linear-gradient(90deg, #ff2f2f 0%, #ff8f8f 25%, #ff4f4f 50%, #ffb3b3 75%, #ff2f2f 100%)',
                      backgroundSize: '300% 100%',
                      animation: 'movingBorderSecondary 4.5s linear infinite',
                      zIndex: 0,
                      opacity: 0.9,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: '1.5px',
                      borderRadius: '14px',
                      background: 'rgba(20, 7, 10, 0.84)',
                      backdropFilter: 'blur(10px)',
                      zIndex: 1,
                    },
                    '& .btn-content': {
                      position: 'relative',
                      zIndex: 2,
                    },
                    animation: 'glowPulseSoft 2.4s ease-in-out infinite',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      color: '#fff3f6',
                    },
                    '&:hover::before': {
                      animationDuration: '2s',
                      opacity: 1,
                    },
                    '@keyframes movingBorderSecondary': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '100%': { backgroundPosition: '200% 50%' },
                    },
                    '@keyframes glowPulseSoft': {
                      '0%': {
                        filter: 'drop-shadow(0 0 6px rgba(255, 90, 120, 0.16))',
                      },
                      '50%': {
                        filter: 'drop-shadow(0 0 14px rgba(255, 90, 120, 0.30))',
                      },
                      '100%': {
                        filter: 'drop-shadow(0 0 6px rgba(255, 90, 120, 0.16))',
                      },
                    },
                  }}
                >
                  <Box component="span" className="btn-content">
                    {hero.ctaSecondary}
                  </Box>
                </Button>
              </MotionStack>

              <MotionStack
                direction="row"
                spacing={1.5}
                custom={0.8}
                variants={fadeRight}
                sx={{
                  mt: 3,
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                }}
              >
                {socialLinks.map((item) => (
                  <Tooltip key={item.label} title={item.label} arrow>
                    <IconButton
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 44,
                        height: 44,
                        color: '#ffd8df',
                        border: '1px solid rgba(255,120,140,0.25)',
                        background: 'rgba(20,7,10,0.35)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all .25s ease',
                        '&:hover': {
                          color: '#fff',
                          borderColor: '#ff5c7a',
                          background: 'rgba(255,60,90,0.15)',
                          boxShadow: '0 0 18px rgba(255,70,110,0.45)',
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </MotionStack>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection