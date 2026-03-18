import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded'
import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'
import gsap from 'gsap'

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

function compactRefs(items) {
  return items.flat(Infinity).filter(Boolean)
}

const StatCard = memo(function StatCard({ icon, value, label }) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: { xs: 'calc(50% - 8px)', sm: 150 },
        px: 2,
        py: 1.6,
        borderRadius: '18px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10, 8, 14, 0.72)',
        transition: 'transform 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: theme => alpha(theme.palette.primary.main, 0.18),
        },
      }}
    >
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.12),
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: '1.02rem',
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.82rem',
            }}
          >
            {label}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
})

const ActionButton = memo(function ActionButton({
  href,
  icon,
  children,
  primary = false,
}) {
  if (!href) return null

  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={icon}
      endIcon={<LaunchRoundedIcon fontSize="small" />}
      variant={primary ? 'contained' : 'outlined'}
      sx={{
        px: 2.2,
        py: 1.05,
        borderRadius: '14px',
        textTransform: 'none',
        fontWeight: 700,
        transition:
          'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
        ...(primary
          ? {
              color: '#fff',
              background: theme =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: theme => `0 8px 18px ${alpha(theme.palette.primary.main, 0.2)}`,
            }
          : {
              color: 'text.primary',
              borderColor: theme => alpha(theme.palette.primary.main, 0.28),
              backgroundColor: 'rgba(8, 7, 12, 0.56)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(255,255,255,0.04)',
              },
            }),
      }}
    >
      {children}
    </Button>
  )
})

const SectionCard = memo(function SectionCard({ title, children, className = '' }) {
  return (
    <Box
      className={className}
      sx={{
        borderRadius: '24px',
        p: 2.2,
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8, 7, 12, 0.68)',
        transition: 'transform 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: theme => alpha(theme.palette.primary.main, 0.14),
        },
      }}
    >
      <Typography
        sx={{
          mb: 1.4,
          color: 'text.primary',
          fontWeight: 700,
          fontSize: '1.05rem',
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  )
})

const InfoRow = memo(function InfoRow({ icon, label, value }) {
  if (!value && value !== 0) return null

  return (
    <Stack
      direction="row"
      spacing={1.2}
      alignItems="flex-start"
      sx={{
        px: 1.2,
        py: 1.1,
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundColor: 'rgba(255,255,255,0.02)',
        transition: 'transform 0.22s ease, background-color 0.22s ease',
        '&:hover': {
          transform: 'translateX(3px)',
          backgroundColor: 'rgba(255,255,255,0.035)',
        },
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '10px',
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.8rem',
            mb: 0.25,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color: 'text.primary',
            fontSize: '0.94rem',
            fontWeight: 700,
            lineHeight: 1.6,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  )
})

const EmptyPreview = memo(function EmptyPreview({ title }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 260, md: 430 },
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        px: 3,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
      }}
    >
      <Box>
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 1.5,
            borderRadius: '18px',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.12),
          }}
        >
          <ImageRoundedIcon />
        </Box>

        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: '1rem',
            mb: 0.6,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            maxWidth: 320,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Preview media will be added soon.
        </Typography>
      </Box>
    </Box>
  )
})

const ImageLightbox = memo(function ImageLightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
  title,
}) {
  const currentImage = images[index] || ''

  useEffect(() => {
    if (!open) return

    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onPrev, onNext])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          background: 'rgba(5, 4, 8, 0.98)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, md: 6 },
          py: { xs: 7, md: 5 },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: { xs: 14, md: 22 },
            right: { xs: 14, md: 22 },
            zIndex: 5,
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {images.length > 1 && (
          <>
            <IconButton
              onClick={onPrev}
              sx={{
                position: 'absolute',
                left: { xs: 10, md: 18 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>

            <IconButton
              onClick={onNext}
              sx={{
                position: 'absolute',
                right: { xs: 10, md: 18 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <NavigateNextRoundedIcon />
            </IconButton>
          </>
        )}

        <Box
          sx={{
            maxWidth: 'min(92vw, 1500px)',
            maxHeight: '82vh',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 14px 36px rgba(0,0,0,0.34)',
          }}
        >
          <Box
            component="img"
            src={currentImage}
            alt={`${title}-${index + 1}`}
            loading="eager"
            decoding="async"
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: '82vh',
              objectFit: 'contain',
              display: 'block',
              backgroundColor: '#07030a',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 22 },
            left: '50%',
            transform: 'translateX(-50%)',
            px: 2,
            py: 1,
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}
        >
          {index + 1} / {images.length}
        </Box>
      </Box>
    </Dialog>
  )
})

function ProjectDetailModal({ open, onClose, project, labels = {} }) {
  const modalRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const titleRef = useRef(null)
  const headlineRef = useRef(null)
  const overviewRef = useRef(null)
  const descRef = useRef(null)
  const statsRef = useRef(null)
  const actionsRef = useRef(null)
  const infoRef = useRef(null)
  const mediaRef = useRef(null)
  const featuresRef = useRef(null)
  const galleryRef = useRef(null)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const text = {
    back: labels.back || 'Back',
    breadcrumbProjects: labels.breadcrumbProjects || 'Projects',
    technologies: labels.technologies || 'Technologies Used',
    features: labels.features || 'Key Features',
    responsibilities: labels.responsibilities || 'My Responsibilities',
    liveDemo: labels.liveDemo || 'Live Demo',
    github: labels.github || 'GitHub',
    figma: labels.figma || 'Figma',
    video: labels.video || 'Video',
    statsTechnologies: labels.statsTechnologies || 'Technologies',
    statsFeatures: labels.statsFeatures || 'Key Features',
    overview: labels.overview || 'Overview',
    projectInfo: labels.projectInfo || 'Project Info',
    role: labels.role || 'Role',
    teamSize: labels.teamSize || 'Team Size',
    teamStructure: labels.teamStructure || 'Team Structure',
    duration: labels.duration || 'Duration',
    category: labels.category || 'Category',
    gallery: labels.gallery || 'Gallery',
  }

  const galleryImages = useMemo(
    () => (project?.images || []).filter(Boolean),
    [project?.images]
  )

  const previewImages = useMemo(() => {
    const merged = [project?.cover, ...(project?.images || [])].filter(Boolean)
    return [...new Set(merged)]
  }, [project?.cover, project?.images])

  const openLightboxAt = imageOrIndex => {
    if (!previewImages.length) return

    const nextIndex =
      typeof imageOrIndex === 'number'
        ? imageOrIndex
        : Math.max(0, previewImages.findIndex(item => item === imageOrIndex))

    setLightboxIndex(nextIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const goPrevImage = () => {
    setLightboxIndex(prev => (prev - 1 + previewImages.length) % previewImages.length)
  }

  const goNextImage = () => {
    setLightboxIndex(prev => (prev + 1) % previewImages.length)
  }

  useEffect(() => {
    if (!open || !project) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      const targets = compactRefs([
        leftColRef.current,
        rightColRef.current,
        titleRef.current,
        headlineRef.current,
        overviewRef.current,
        descRef.current,
        statsRef.current,
        actionsRef.current,
        infoRef.current,
        mediaRef.current,
        featuresRef.current,
        galleryRef.current,
      ])

      gsap.fromTo(
        targets,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          stagger: 0.03,
          ease: 'power2.out',
        }
      )
    }, modalRef)

    return () => ctx.revert()
  }, [open, project])

  if (!project) return null

  const videoEmbedUrl = getYoutubeEmbedUrl(project.video)
  const hasCover = Boolean(project.cover)

  const stats = [
    {
      icon: <CodeRoundedIcon fontSize="small" />,
      value: project.technologies?.length || 0,
      label: text.statsTechnologies,
    },
    {
      icon: <AutoAwesomeRoundedIcon fontSize="small" />,
      value: project.features?.length || 0,
      label: text.statsFeatures,
    },
    {
      icon: <GroupsRoundedIcon fontSize="small" />,
      value: project.teamSize || 1,
      label: text.teamSize,
    },
    {
      icon: <ScheduleRoundedIcon fontSize="small" />,
      value: project.duration || '-',
      label: text.duration,
    },
  ]

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        transitionDuration={{ enter: 320, exit: 180 }}
        PaperProps={{
          sx: {
            backgroundColor: '#050308',
            color: '#fff',
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              position: 'relative',
              height: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              backgroundColor: '#050308',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.16,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(5,3,8,0.72) 0%, rgba(5,3,8,0.82) 55%, rgba(5,3,8,0.9) 100%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            <Container
              maxWidth="xl"
              sx={{
                position: 'relative',
                zIndex: 1,
                py: { xs: 2.5, md: 4 },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: { xs: 3, md: 4 } }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center" flexWrap="wrap">
                  <Button
                    onClick={onClose}
                    startIcon={<ArrowBackRoundedIcon />}
                    sx={{
                      color: 'text.primary',
                      px: 1.6,
                      py: 0.85,
                      borderRadius: '14px',
                      textTransform: 'none',
                      fontWeight: 700,
                      border: '1px solid rgba(255,255,255,0.06)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      transition: 'transform 0.22s ease, background-color 0.22s ease',
                      '&:hover': {
                        transform: 'translateX(-2px)',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                      },
                    }}
                  >
                    {text.back}
                  </Button>

                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    {text.breadcrumbProjects}
                  </Typography>

                  <Typography
                    sx={{
                      color: 'text.secondary',
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    ›
                  </Typography>

                  <Typography
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    {project.title}
                  </Typography>
                </Stack>

                <IconButton
                  onClick={onClose}
                  sx={{
                    color: 'text.primary',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    transition: 'transform 0.22s ease, background-color 0.22s ease',
                    '&:hover': {
                      transform: 'rotate(90deg)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                    },
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '1.02fr 0.98fr' },
                  gap: { xs: 3, md: 4 },
                  alignItems: 'start',
                }}
              >
                <Box ref={leftColRef}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 1.6 }}
                  >
                    {!!project.category && (
                      <Chip
                        label={project.category}
                        sx={{
                          color: 'text.primary',
                          fontWeight: 700,
                          borderRadius: '999px',
                          border: theme =>
                            `1px solid ${alpha(theme.palette.primary.main, 0.34)}`,
                          backgroundColor: alpha('#ffffff', 0.03),
                        }}
                      />
                    )}

                    {!!project.role && (
                      <Chip
                        label={project.role}
                        sx={{
                          color: 'text.primary',
                          fontWeight: 700,
                          borderRadius: '999px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                        }}
                      />
                    )}
                  </Stack>

                  <Typography
                    ref={titleRef}
                    sx={{
                      fontFamily: 'Hatton, serif',
                      fontWeight: 700,
                      color: 'text.primary',
                      fontSize: {
                        xs: '2.3rem',
                        sm: '3.1rem',
                        md: '4.2rem',
                      },
                      lineHeight: { xs: 1.02, md: 0.96 },
                      letterSpacing: '-0.04em',
                      maxWidth: 760,
                      mb: 1.4,
                    }}
                  >
                    {project.title}
                  </Typography>

                  {!!project.headline && (
                    <Typography
                      ref={headlineRef}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: { xs: '1.02rem', md: '1.16rem' },
                        letterSpacing: '-0.02em',
                        lineHeight: 1.5,
                        maxWidth: 760,
                        mb: 2,
                      }}
                    >
                      {project.headline}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      width: 88,
                      height: 4,
                      borderRadius: 999,
                      mb: 3,
                      background: theme =>
                        `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                  />

                  {!!project.overview && (
                    <Box ref={overviewRef} sx={{ mb: 2.2 }}>
                      <Typography
                        sx={{
                          color: 'text.primary',
                          fontWeight: 700,
                          fontSize: '1rem',
                          mb: 0.8,
                        }}
                      >
                        {text.overview}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          fontSize: { xs: '0.98rem', md: '1.02rem' },
                          maxWidth: 720,
                        }}
                      >
                        {project.overview}
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    ref={descRef}
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.85,
                      fontSize: { xs: '0.98rem', md: '1.04rem' },
                      maxWidth: 720,
                      mb: 3,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Stack
                    ref={statsRef}
                    direction="row"
                    spacing={1.4}
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ mb: 3 }}
                  >
                    {stats.map(item => (
                      <StatCard
                        key={item.label}
                        icon={item.icon}
                        value={item.value}
                        label={item.label}
                      />
                    ))}
                  </Stack>

                  <Stack
                    ref={actionsRef}
                    direction="row"
                    spacing={1.2}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 3 }}
                  >
                    <ActionButton
                      href={project.website}
                      icon={<LanguageRoundedIcon fontSize="small" />}
                      primary
                    >
                      {text.liveDemo}
                    </ActionButton>

                    <ActionButton
                      href={project.github}
                      icon={<GitHubIcon fontSize="small" />}
                    >
                      {text.github}
                    </ActionButton>

                    <ActionButton
                      href={project.figma}
                      icon={<BrushRoundedIcon fontSize="small" />}
                    >
                      {text.figma}
                    </ActionButton>

                    <ActionButton
                      href={project.video}
                      icon={<SmartDisplayRoundedIcon fontSize="small" />}
                    >
                      {text.video}
                    </ActionButton>
                  </Stack>

                  <Box
                    ref={infoRef}
                    sx={{
                      contentVisibility: 'auto',
                      containIntrinsicSize: '500px',
                    }}
                  >
                    <SectionCard title={text.projectInfo}>
                      <Stack spacing={1.1}>
                        <InfoRow
                          icon={<BadgeRoundedIcon fontSize="small" />}
                          label={text.role}
                          value={project.role}
                        />

                        <InfoRow
                          icon={<CategoryRoundedIcon fontSize="small" />}
                          label={text.category}
                          value={project.category}
                        />

                        <InfoRow
                          icon={<GroupsRoundedIcon fontSize="small" />}
                          label={text.teamSize}
                          value={
                            project.teamSize
                              ? project.teamSize === 1
                                ? '1 Member'
                                : `${project.teamSize} Members`
                              : null
                          }
                        />

                        <InfoRow
                          icon={<Diversity3RoundedIcon fontSize="small" />}
                          label={text.teamStructure}
                          value={project.teamStructure}
                        />

                        <InfoRow
                          icon={<ScheduleRoundedIcon fontSize="small" />}
                          label={text.duration}
                          value={project.duration}
                        />
                      </Stack>
                    </SectionCard>

                    {!!project.technologies?.length && (
                      <Box sx={{ mt: 2.2 }}>
                        <SectionCard title={text.technologies}>
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
                                    `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                  backgroundColor: alpha('#ffffff', 0.03),
                                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    borderColor: 'primary.main',
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        </SectionCard>
                      </Box>
                    )}

                    {!!project.responsibilities?.length && (
                      <Box sx={{ mt: 2.2 }}>
                        <SectionCard title={text.responsibilities}>
                          <Stack spacing={1.1}>
                            {project.responsibilities.map((item, index) => (
                              <Typography
                                key={index}
                                sx={{
                                  color: 'text.secondary',
                                  lineHeight: 1.8,
                                  position: 'relative',
                                  pl: 2.1,
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: '0.72em',
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                  },
                                }}
                              >
                                {item}
                              </Typography>
                            ))}
                          </Stack>
                        </SectionCard>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box ref={rightColRef}>
                  <Box
                    ref={mediaRef}
                    sx={{
                      borderRadius: '28px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(8, 7, 12, 0.62)',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
                      mb: 2.2,
                      position: 'relative',
                      cursor: !videoEmbedUrl && hasCover ? 'zoom-in' : 'default',
                      '&:hover .preview-zoom': {
                        opacity: !videoEmbedUrl && hasCover ? 1 : 0,
                        transform: !videoEmbedUrl && hasCover
                          ? 'translateY(0)'
                          : 'translateY(8px)',
                      },
                    }}
                  >
                    {videoEmbedUrl ? (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          pt: '56.25%',
                        }}
                      >
                        <Box
                          component="iframe"
                          src={videoEmbedUrl}
                          title={project.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 0,
                          }}
                        />
                      </Box>
                    ) : hasCover ? (
                      <Box
                        onClick={() => openLightboxAt(project.cover)}
                        sx={{ position: 'relative' }}
                      >
                        <Box
                          component="img"
                          src={project.cover}
                          alt={project.title}
                          loading="eager"
                          decoding="async"
                          sx={{
                            width: '100%',
                            height: { xs: 260, md: 430 },
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.35s ease',
                            '&:hover': {
                              transform: 'scale(1.015)',
                            },
                          }}
                        />

                        <Stack
                          className="preview-zoom"
                          direction="row"
                          spacing={0.8}
                          alignItems="center"
                          sx={{
                            position: 'absolute',
                            right: 16,
                            bottom: 16,
                            px: 1.3,
                            py: 0.8,
                            borderRadius: '999px',
                            color: '#fff',
                            backgroundColor: 'rgba(0,0,0,0.42)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            opacity: 0,
                            transform: 'translateY(8px)',
                            transition: 'all 0.22s ease',
                          }}
                        >
                          <ZoomInRoundedIcon sx={{ fontSize: 18 }} />
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>
                            Click to enlarge
                          </Typography>
                        </Stack>
                      </Box>
                    ) : (
                      <EmptyPreview title={project.title} />
                    )}
                  </Box>

                  {!!project.features?.length && (
                    <Box
                      sx={{
                        contentVisibility: 'auto',
                        containIntrinsicSize: '320px',
                      }}
                    >
                      <SectionCard title={text.features}>
                        <Stack ref={featuresRef} spacing={1}>
                          {project.features.map((feature, index) => (
                            <Box
                              key={index}
                              sx={{
                                px: 1.4,
                                py: 1.15,
                                borderRadius: '14px',
                                color: 'text.secondary',
                                border: '1px solid rgba(255,255,255,0.04)',
                                backgroundColor:
                                  index === 1 ? 'rgba(255,255,255,0.03)' : 'transparent',
                                position: 'relative',
                                pl: 2.4,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255,255,255,0.04)',
                                  color: 'text.primary',
                                  transform: 'translateX(3px)',
                                },
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 14,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: 7,
                                  height: 7,
                                  borderRadius: '50%',
                                  backgroundColor: 'primary.main',
                                },
                              }}
                            >
                              {feature}
                            </Box>
                          ))}
                        </Stack>
                      </SectionCard>
                    </Box>
                  )}

                  {!!galleryImages.length && (
                    <Box
                      sx={{
                        mt: 2.2,
                        contentVisibility: 'auto',
                        containIntrinsicSize: '700px',
                      }}
                    >
                      <SectionCard title={`${text.gallery} (${galleryImages.length})`}>
                        <Box
                          ref={galleryRef}
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(2, 1fr)' },
                            gap: 1.4,
                          }}
                        >
                          {galleryImages.map((image, index) => (
                            <Box
                              key={`${image}-${index}`}
                              onClick={() => openLightboxAt(image)}
                              sx={{
                                position: 'relative',
                                borderRadius: '18px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.06)',
                                transition: 'transform 0.22s ease, border-color 0.22s ease',
                                cursor: 'zoom-in',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  borderColor: theme =>
                                    alpha(theme.palette.primary.main, 0.18),
                                },
                                '&:hover .gallery-image': {
                                  transform: 'scale(1.04)',
                                },
                                '&:hover .gallery-zoom': {
                                  opacity: 1,
                                  transform: 'translate(-50%, -50%) scale(1)',
                                },
                              }}
                            >
                              <Box
                                component="img"
                                className="gallery-image"
                                src={image}
                                alt={`${project.title}-${index + 1}`}
                                loading="lazy"
                                decoding="async"
                                sx={{
                                  width: '100%',
                                  height: { xs: 120, md: 148 },
                                  objectFit: 'cover',
                                  display: 'block',
                                  transition: 'transform 0.35s ease',
                                }}
                              />

                              <Box
                                className="gallery-zoom"
                                sx={{
                                  position: 'absolute',
                                  left: '50%',
                                  top: '50%',
                                  transform: 'translate(-50%, -50%) scale(0.9)',
                                  width: 42,
                                  height: 42,
                                  borderRadius: '50%',
                                  display: 'grid',
                                  placeItems: 'center',
                                  color: '#fff',
                                  backgroundColor: 'rgba(0,0,0,0.42)',
                                  border: '1px solid rgba(255,255,255,0.12)',
                                  opacity: 0,
                                  transition: 'all 0.22s ease',
                                  pointerEvents: 'none',
                                }}
                              >
                                <ZoomInRoundedIcon sx={{ fontSize: 20 }} />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </SectionCard>
                    </Box>
                  )}
                </Box>
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>

      <ImageLightbox
        open={lightboxOpen}
        images={previewImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrevImage}
        onNext={goNextImage}
        title={project.title}
      />
    </>
  )
}

export default ProjectDetailModal