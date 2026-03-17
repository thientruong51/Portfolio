import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import useLocalizedContent from '../../hooks/useLocalizedContent'
import PolygonBottomLine from './PolygonBottomLine'

const polygonClip = {
  xs: 'polygon(0 0,100% 0,100% 100%,0 100%)',
  md: 'polygon(0 0,100% 0,100% 82%,76% 82%,71% 100%,29% 100%,24% 82%,0 82%)',
}

function Navbar() {
  const { i18n } = useTranslation()
  const { site } = useLocalizedContent()
  const location = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentLang = i18n.language?.startsWith('vi') ? 'vi' : 'en'

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'vi' ? 'en' : 'vi')
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 900) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navHeight = {
    xs: scrolled ? 72 : 86,
    md: scrolled ? 68 : 80,
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        overflow: 'visible',
        '&.MuiPaper-root': {
          background: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: navHeight,
            clipPath: polygonClip,
            transition: 'height 260ms ease, transform 260ms ease, filter 260ms ease',
            background: (theme) =>
              scrolled
                ? `linear-gradient(
                    180deg,
                    ${alpha(theme.palette.background.default, 0.97)} 0%,
                    rgba(8,2,5,0.99) 100%
                  )`
                : `linear-gradient(
                    180deg,
                    ${alpha(theme.palette.background.default, 0.94)} 0%,
                    rgba(10,2,5,0.985) 100%
                  )`,
            boxShadow: (theme) =>
              scrolled
                ? `
                  0 10px 28px rgba(0,0,0,0.45),
                  0 0 34px ${alpha(theme.palette.primary.main, 0.12)},
                  inset 0 1px 0 rgba(255,255,255,0.04)
                `
                : `
                  0 10px 28px rgba(0,0,0,0.34),
                  0 0 28px ${alpha(theme.palette.primary.main, 0.08)},
                  inset 0 1px 0 rgba(255,255,255,0.03)
                `,
            backdropFilter: scrolled ? 'blur(14px)' : 'blur(10px)',
            WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'blur(10px)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: scrolled ? 0.75 : 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 360,
                height: 360,
                left: '-8%',
                top: '-220%',
                borderRadius: '50%',
                background: (theme) =>
                  `radial-gradient(
                    circle,
                    ${alpha(theme.palette.primary.main, 0.18)} 0%,
                    ${alpha(theme.palette.primary.main, 0.08)} 30%,
                    ${alpha(theme.palette.primary.main, 0)} 70%
                  )`,
                filter: 'blur(18px)',
                animation: 'cyberFloatLeft 8s ease-in-out infinite',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 420,
                height: 420,
                right: '-10%',
                top: '-260%',
                borderRadius: '50%',
                background: (theme) =>
                  `radial-gradient(
                    circle,
                    ${alpha(theme.palette.secondary.main, 0.16)} 0%,
                    ${alpha(theme.palette.secondary.main, 0.07)} 30%,
                    ${alpha(theme.palette.secondary.main, 0)} 72%
                  )`,
                filter: 'blur(24px)',
                animation: 'cyberFloatRight 10s ease-in-out infinite',
              },
              '@keyframes cyberFloatLeft': {
                '0%': { transform: 'translate3d(0,0,0) scale(1)' },
                '50%': { transform: 'translate3d(28px,18px,0) scale(1.06)' },
                '100%': { transform: 'translate3d(0,0,0) scale(1)' },
              },
              '@keyframes cyberFloatRight': {
                '0%': { transform: 'translate3d(0,0,0) scale(1)' },
                '50%': { transform: 'translate3d(-24px,20px,0) scale(1.08)' },
                '100%': { transform: 'translate3d(0,0,0) scale(1)' },
              },
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              clipPath: polygonClip,
              background: (theme) =>
                `linear-gradient(
                  180deg,
                  ${alpha(theme.palette.background.default, 0.94)} 0%,
                  rgba(10,2,5,0.985) 100%
                )`,
              boxShadow: (theme) => `
                0 10px 28px rgba(0,0,0,0.34),
                0 0 28px ${alpha(theme.palette.primary.main, 0.06)},
                inset 0 1px 0 rgba(255,255,255,0.03)
              `,
              backdropFilter: 'blur(6px)',
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              clipPath: polygonClip,
              opacity: 0.08,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: scrolled ? '26px 26px' : '32px 32px',
              pointerEvents: 'none',
              animation: 'gridPulse 3s ease-in-out infinite',
              '@keyframes gridPulse': {
                '0%': { opacity: 0.05 },
                '50%': { opacity: 0.1 },
                '100%': { opacity: 0.05 },
              },
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.2,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '18%',
                background: (theme) =>
                  `linear-gradient(
                    90deg,
                    transparent,
                    ${alpha(theme.palette.primary.main, 0.13)},
                    ${alpha(theme.palette.secondary.main, 0.09)},
                    transparent
                  )`,
                filter: 'blur(10px)',
                animation: 'scanMove 5.5s linear infinite',
              },
              '@keyframes scanMove': {
                '0%': { transform: 'translateX(-130%)' },
                '100%': { transform: 'translateX(850%)' },
              },
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1,
              background: (theme) =>
                `linear-gradient(
                  90deg,
                  ${alpha(theme.palette.primary.main, 0.05)},
                  ${alpha(theme.palette.secondary.main, 0.18)},
                  ${alpha(theme.palette.primary.main, 0.05)}
                )`,
              pointerEvents: 'none',
            }}
          />

          <PolygonBottomLine scrolled={scrolled} />

          <Container
            maxWidth="xl"
            sx={{
              position: 'relative',
              zIndex: 3,
              height: '100%',
              px: { xs: 2, md: 4 },
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                minHeight: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                }}
              >
                <NavItem to="/" active={location.pathname === '/'}>
                  {site.nav.home}
                </NavItem>
                <NavItem to="/about" active={location.pathname === '/about'}>
                  {site.nav.about}
                </NavItem>
                <NavItem to="/projects" active={location.pathname === '/projects'}>
                  {site.nav.projects}
                </NavItem>
              </Stack>

              <Box
                component={RouterLink}
                to="/"
                sx={{
                  position: 'relative',
                  minWidth: { xs: 0, md: 520 },
                  maxWidth: { xs: '100%', md: 620 },
                  justifySelf: { xs: 'start', md: 'center' },
                  px: { xs: 0, md: 3.5 },
                  py: { xs: 1, md: 1.3 },
                  transition: 'transform 260ms ease',
                  transform: scrolled ? 'scale(0.96)' : 'scale(1)',
                  textDecoration: 'none',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', md: 'center' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: 38, md: 48 },
                      height: { xs: 38, md: 48 },
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'secondary.main',
                      border: (theme) => `1px solid ${alpha(theme.palette.secondary.main, 0.28)}`,
                      background: (theme) =>
                        `linear-gradient(
                          180deg,
                          ${alpha(theme.palette.secondary.main, 0.14)},
                          ${alpha(theme.palette.primary.main, 0.07)}
                        )`,
                      boxShadow: (theme) => `
                        0 0 18px ${alpha(theme.palette.secondary.main, 0.16)},
                        inset 0 0 14px rgba(255,255,255,0.03)
                      `,
                      flexShrink: 0,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                        boxShadow: (theme) => `0 0 14px ${alpha(theme.palette.primary.main, 0.18)}`,
                        animation: 'iconPulse 2.4s ease-in-out infinite',
                      },
                      '@keyframes iconPulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.45 },
                        '50%': { transform: 'scale(1.08)', opacity: 0.9 },
                        '100%': { transform: 'scale(1)', opacity: 0.45 },
                      },
                    }}
                  >
                    <ShieldOutlinedIcon fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.7rem' },
                        lineHeight: 1,
                        fontWeight: 800,
                        color: 'secondary.main',
                        textTransform: 'uppercase',
                        textShadow: (theme) => `0 0 14px ${alpha(theme.palette.secondary.main, 0.24)}`,
                      }}
                    >
                      {site.brandName}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.4,
                        fontSize: { xs: '0.58rem', md: '0.78rem' },
                        color: 'primary.light',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        textShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.18)}`,
                      }}
                    >
                      {site.brandSubtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >



                <IconButton
                  onClick={toggleLanguage}
                  sx={{
                    width: 42,
                    height: 42,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    color: 'text.primary',
                    background: 'rgba(255,255,255,0.035)',
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    transition: 'all 220ms ease, box-shadow 220ms ease, transform 220ms ease',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.1),
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.45),
                      boxShadow: (theme) => `
                        0 0 12px ${alpha(theme.palette.primary.main, 0.22)},
                        0 0 24px ${alpha(theme.palette.primary.main, 0.12)},
                        inset 0 0 12px rgba(255,255,255,0.03)
                      `,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <LanguageIcon fontSize="small" />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 24,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                    textShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.18)}`,
                  }}
                >
                  {currentLang}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  onClick={toggleLanguage}
                  sx={{
                    width: 38,
                    height: 38,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                    color: 'text.primary',
                    background: 'rgba(255,255,255,0.035)',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.08),
                      boxShadow: (theme) => `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
                    },
                  }}
                >
                  <LanguageIcon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={() => setMobileOpen((prev) => !prev)}
                  sx={{
                    position: 'relative',
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    color: 'text.primary',
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                    background: (theme) =>
                      `linear-gradient(
                        180deg,
                        ${alpha(theme.palette.primary.main, 0.1)},
                        ${alpha(theme.palette.primary.main, 0.04)}
                      )`,
                    boxShadow: (theme) => `
                      0 0 14px ${alpha(theme.palette.primary.main, 0.12)},
                      inset 0 0 10px rgba(255,255,255,0.03)
                    `,
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
                      transform: mobileOpen ? 'translateX(120%)' : 'translateX(-120%)',
                      transition: 'transform 420ms ease',
                    },
                    '&:hover': {
                      borderColor: 'primary.light',
                      boxShadow: (theme) => `
                        0 0 14px ${alpha(theme.palette.primary.main, 0.24)},
                        0 0 30px ${alpha(theme.palette.primary.main, 0.1)}
                      `,
                    },
                  }}
                >
                  {mobileOpen ? (
                    <CloseRoundedIcon fontSize="small" />
                  ) : (
                    <MenuRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Stack>
            </Toolbar>
          </Container>
        </Box>

        <Collapse in={mobileOpen} timeout={260} unmountOnExit>
          <Box
            sx={{
              px: 2,
              pt: 1.2,
            }}
          >
            <Box
              sx={{
                mx: 'auto',
                maxWidth: 'xl',
                clipPath: 'polygon(0 0,100% 0,100% 88%,94% 100%,6% 100%,0 88%)',
                background: (theme) =>
                  `linear-gradient(
                    180deg,
                    ${alpha(theme.palette.background.default, 0.97)} 0%,
                    rgba(11,2,5,0.99) 100%
                  )`,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                boxShadow: (theme) => `
                  0 10px 30px rgba(0,0,0,0.34),
                  0 0 22px ${alpha(theme.palette.primary.main, 0.08)},
                  inset 0 1px 0 rgba(255,255,255,0.03)
                `,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '22px 22px',
                  pointerEvents: 'none',
                }}
              />

              <Stack
                spacing={1}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  p: 1.2,
                }}
              >
                <MobileNavItem
                  to="/"
                  active={location.pathname === '/'}
                  onClick={() => setMobileOpen(false)}
                >
                  {site.nav.home}
                </MobileNavItem>

                <MobileNavItem
                  to="/about"
                  active={location.pathname === '/about'}
                  onClick={() => setMobileOpen(false)}
                >
                  {site.nav.about}
                </MobileNavItem>

                <MobileNavItem
                  to="/projects"
                  active={location.pathname === '/projects'}
                  onClick={() => setMobileOpen(false)}
                >
                  {site.nav.projects}
                </MobileNavItem>

             

                <Box
                  sx={{
                    mt: 0.5,
                    px: 1.5,
                    py: 1,
                    borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                    color: 'text.secondary',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Language: {currentLang}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </AppBar>
  )
}

function NavItem({ to, children, active = false }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      sx={{
        position: 'relative',
        px: 2.2,
        py: 1,
        borderRadius: 999,
        color: active ? '#ffffff' : 'text.primary',
        fontWeight: 700,
        letterSpacing: '0.05em',
        border: (theme) =>
          active
            ? `1px solid ${alpha(theme.palette.primary.main, 0.28)}`
            : '1px solid transparent',
        background: (theme) =>
          active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        overflow: 'hidden',
        transition: 'all 220ms ease',
        boxShadow: (theme) =>
          active
            ? `
              0 0 14px ${alpha(theme.palette.primary.main, 0.16)},
              inset 0 0 14px rgba(255,255,255,0.02)
            `
            : 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 999,
          background: (theme) =>
            `linear-gradient(
              90deg,
              ${alpha(theme.palette.primary.main, 0.1)},
              ${alpha(theme.palette.secondary.main, 0.08)},
              ${alpha(theme.palette.primary.main, 0.1)}
            )`,
          opacity: active ? 1 : 0,
          transition: 'opacity 220ms ease',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '12%',
          right: '12%',
          bottom: 6,
          height: 1,
          background: (theme) =>
            `linear-gradient(
              90deg,
              transparent,
              ${alpha(theme.palette.primary.light, 0.95)},
              transparent
            )`,
          transform: active ? 'scaleX(1)' : 'scaleX(0.3)',
          opacity: active ? 1 : 0,
          transition: 'all 220ms ease',
        },
        '&:hover': {
          color: '#ffffff',
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.26),
          boxShadow: (theme) => `
            0 0 14px ${alpha(theme.palette.primary.main, 0.18)},
            0 0 26px ${alpha(theme.palette.primary.main, 0.08)},
            inset 0 0 14px rgba(255,255,255,0.02)
          `,
          textShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.28)}`,
          transform: 'translateY(-1px)',
          background: (theme) => alpha(theme.palette.primary.main, 0.05),
          '&::before': {
            opacity: 1,
          },
          '&::after': {
            opacity: 1,
            transform: 'scaleX(1)',
          },
        },
      }}
    >
      <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Button>
  )
}

function MobileNavItem({ to, children, onClick, active = false }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      onClick={onClick}
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        px: 1.5,
        py: 1.25,
        borderRadius: 2,
        color: 'text.primary',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        border: (theme) =>
          active
            ? `1px solid ${alpha(theme.palette.primary.main, 0.22)}`
            : `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        background: (theme) =>
          active
            ? alpha(theme.palette.primary.main, 0.1)
            : alpha(theme.palette.primary.main, 0.02),
        boxShadow: (theme) =>
          active ? `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}` : 'none',
        transition: 'all 220ms ease',
        '&:hover': {
          background: (theme) => alpha(theme.palette.primary.main, 0.08),
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.22),
          boxShadow: (theme) => `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          transform: 'translateX(4px)',
        },
      }}
    >
      {children}
    </Button>
  )
}

export default Navbar