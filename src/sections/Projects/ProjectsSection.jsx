import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded'
import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import useLocalizedContent from '../../hooks/useLocalizedContent'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE =
  'https://res.cloudinary.com/dkfykdjlm/image/upload/v1773500206/ChatGPT_Image_21_42_14_14_thg_3_2026_ynutvy.png'

function getYoutubeEmbedUrl(url = '') {
  if (!url) return ''
  const match =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?&]+)/) ||
    url.match(/youtube\.com\/embed\/([^?&]+)/)

  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : ''
}

function ProjectDetailDialog({ open, onClose, project }) {
  if (!project) return null

  const videoEmbedUrl = getYoutubeEmbedUrl(project.video)

  const actionButtons = [
    {
      key: 'github',
      label: 'GitHub',
      href: project.github,
      icon: <GitHubIcon fontSize="small" />,
    },
    {
      key: 'website',
      label: 'Website',
      href: project.website,
      icon: <LanguageRoundedIcon fontSize="small" />,
    },
    {
      key: 'figma',
      label: 'Figma',
      href: project.figma,
      icon: <BrushRoundedIcon fontSize="small" />,
    },
    {
      key: 'video',
      label: 'Video',
      href: project.video,
      icon: <SmartDisplayRoundedIcon fontSize="small" />,
    },
  ].filter(item => item.href)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: '#090306',
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            minHeight: '100vh',
            position: 'relative',
            color: 'text.primary',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${project.cover}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.18,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(
                  180deg,
                  rgba(8, 3, 6, 0.86) 0%,
                  rgba(8, 3, 6, 0.92) 30%,
                  rgba(8, 3, 6, 0.98) 100%
                )
              `,
            }}
          />

          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: 4 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Chip
                  label={project.category}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 800,
                    border: theme => `1px solid ${theme.palette.primary.main}55`,
                    background: theme =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}10)`,
                  }}
                />
                <Typography color="text.secondary">{project.year}</Typography>
              </Stack>

              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.primary',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.10)',
                  },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    borderRadius: '26px',
                    overflow: 'hidden',
                    border: theme => `1px solid ${theme.palette.primary.main}30`,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 20px 70px rgba(0,0,0,0.35)',
                  }}
                >
                  <Box
                    component="img"
                    src={project.cover}
                    alt={project.title}
                    sx={{
                      width: '100%',
                      height: { xs: 260, md: 420 },
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>

                {!!project.images?.length && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {project.images.slice(0, 3).map((image, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box
                          component="img"
                          src={image}
                          alt={`${project.title}-${index}`}
                          sx={{
                            width: '100%',
                            height: 140,
                            objectFit: 'cover',
                            borderRadius: '18px',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}

                {!!videoEmbedUrl && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontWeight: 800,
                        color: 'text.primary',
                      }}
                    >
                      Live Demo Video
                    </Typography>

                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        pt: '56.25%',
                        borderRadius: '22px',
                        overflow: 'hidden',
                        border: theme => `1px solid ${theme.palette.primary.main}22`,
                        backgroundColor: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <Box
                        component="iframe"
                        src={videoEmbedUrl}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          border: 0,
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography
                  sx={{
                    fontFamily: 'Hatton, serif',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1,
                    mb: 2,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.85,
                    mb: 3,
                    fontSize: '1rem',
                  }}
                >
                  {project.content}
                </Typography>

                {!!actionButtons.length && (
                  <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap mb={3}>
                    {actionButtons.map(item => (
                      <Button
                        key={item.key}
                        component="a"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={item.icon}
                        endIcon={<LaunchRoundedIcon fontSize="small" />}
                        variant={item.key === 'website' ? 'contained' : 'outlined'}
                        sx={{
                          borderRadius: '14px',
                          textTransform: 'none',
                          fontWeight: 700,
                          px: 2,
                          py: 1,
                          ...(item.key === 'website'
                            ? {
                                background: theme =>
                                  `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                boxShadow: theme =>
                                  `0 12px 28px ${theme.palette.primary.main}33`,
                              }
                            : {
                                color: 'text.primary',
                                borderColor: theme => `${theme.palette.primary.main}45`,
                                backgroundColor: 'rgba(255,255,255,0.03)',
                              }),
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Stack>
                )}

                <Box
                  sx={{
                    p: 2.2,
                    mb: 2.2,
                    borderRadius: '22px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography sx={{ fontWeight: 800, mb: 1.4 }}>
                    Technologies
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {(project.technologies || []).map(item => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          color: 'text.primary',
                          fontWeight: 700,
                          borderRadius: '999px',
                          border: theme =>
                            `1px solid ${theme.palette.primary.main}34`,
                          backgroundColor: 'rgba(255,255,255,0.05)',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box
                  sx={{
                    p: 2.2,
                    borderRadius: '22px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography sx={{ fontWeight: 800, mb: 1.4 }}>
                    My Responsibilities
                  </Typography>

                  <Stack spacing={1.1}>
                    {(project.responsibilities || []).map((item, index) => (
                      <Typography
                        key={index}
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          position: 'relative',
                          pl: 2.2,
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '0.72em',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: theme => theme.palette.primary.main,
                            boxShadow: theme =>
                              `0 0 12px ${theme.palette.primary.main}`,
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '26px',
        overflow: 'hidden',
        minHeight: 420,
        display: 'flex',
        alignItems: 'flex-end',
        border: theme => `1px solid ${theme.palette.primary.main}26`,
        backgroundColor: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.30)',
        transition: 'transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
        '&:hover': {
          transform: 'translateY(-10px)',
          borderColor: theme => theme.palette.primary.light,
          boxShadow: theme =>
            `0 28px 90px rgba(0,0,0,0.44), 0 0 32px ${theme.palette.primary.main}22`,
        },
        '&:hover .project-image': {
          transform: 'scale(1.06)',
        },
        '&:hover .project-shine': {
          transform: 'translateX(140%) rotate(15deg)',
        },
      }}
    >
      <Box
        className="project-image"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${project.cover}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.8s ease',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              180deg,
              rgba(10, 10, 16, 0.06) 0%,
              rgba(10, 10, 16, 0.18) 40%,
              rgba(8, 8, 14, 0.80) 78%,
              rgba(8, 8, 14, 0.96) 100%
            )
          `,
        }}
      />

      <Box
        className="project-shine"
        sx={{
          content: '""',
          position: 'absolute',
          inset: '-20%',
          background: `
            linear-gradient(
              115deg,
              transparent 26%,
              rgba(255,255,255,0.03) 34%,
              rgba(255,255,255,0.18) 43%,
              rgba(255,255,255,0.38) 48%,
              rgba(255,255,255,0.10) 54%,
              transparent 62%
            )
          `,
          transform: 'translateX(-160%) rotate(15deg)',
          transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
          zIndex: 2,
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
          background: theme =>
            `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
          boxShadow: theme => `0 0 14px ${theme.palette.primary.main}88`,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          p: 2.4,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1.4}>
          <Chip
            label={project.category}
            size="small"
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              backgroundColor: theme => `${theme.palette.primary.main}20`,
              border: theme => `1px solid ${theme.palette.primary.main}35`,
            }}
          />
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            {project.year}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: 'Hatton, serif',
            fontWeight: 700,
            fontSize: '1.7rem',
            lineHeight: 1.05,
            color: 'text.primary',
            mb: 1.2,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.8,
            fontSize: '0.96rem',
            mb: 2.2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.summary}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2.2}>
          {(project.technologies || []).slice(0, 4).map(item => (
            <Chip
              key={item}
              label={item}
              size="small"
              sx={{
                color: 'text.primary',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </Stack>

        <Button
          onClick={() => onOpen(project)}
          endIcon={<OpenInNewRoundedIcon />}
          variant="contained"
          sx={{
            borderRadius: '14px',
            textTransform: 'none',
            fontWeight: 800,
            px: 2,
            py: 1.05,
            background: theme =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: theme => `0 12px 24px ${theme.palette.primary.main}33`,
          }}
        >
          View Detail
        </Button>
      </Box>
    </Box>
  )
}

function ProjectsSection() {
  const { projects } = useLocalizedContent()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.set(headerRef.current, { y: 24, opacity: 0 })
      }

      const cards = gridRef.current?.querySelectorAll('.project-card') || []
      if (cards.length) {
        gsap.set(cards, {
          y: 38,
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

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power2.out',
      }).to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
            opacity: 0.3,
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
                rgba(10, 3, 6, 0.82) 0%,
                rgba(18, 4, 8, 0.74) 34%,
                rgba(70, 10, 14, 0.14) 60%,
                rgba(10, 3, 6, 0.92) 100%
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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Box ref={headerRef} sx={{ mb: 6 }}>
            <Chip
              label={projects?.badge || 'PROJECTS'}
              sx={{
                mb: 2.5,
                height: 38,
                px: 1.2,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'text.primary',
                border: theme => `1px solid ${theme.palette.primary.main}55`,
                background: theme =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}2e, ${theme.palette.secondary.main}1e)`,
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
                maxWidth: 800,
                mb: 2.2,
                textShadow: '0 8px 30px rgba(0,0,0,0.35)',
              }}
            >
              {projects?.titleTop || 'Selected'}{' '}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  background: theme =>
                    `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 60%, ${theme.palette.primary.light} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {projects?.titleHighlight || 'Projects'}
              </Box>
              <br />
              {projects?.titleBottom || 'That I Built'}
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.9,
                maxWidth: 700,
              }}
            >
              {projects?.description}
            </Typography>
          </Box>

          <Grid container spacing={3} ref={gridRef}>
            {(projects?.items || []).map(project => (
              <Grid item xs={12} md={6} key={project.id} className="project-card">
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <ProjectDetailDialog
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  )
}

export default ProjectsSection