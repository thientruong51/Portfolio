import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

function ProjectMiniCard({ project, active, index, onClick }) {
  return (
    <Box
      className="project-mini-card"
      onClick={onClick}
      sx={{
        position: 'relative',
        width: { xs: 150, md: 178 },
        height: { xs: 220, md: active ? 292 : 258 },
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        mt: { xs: 1, md: active ? 3.5 : 6.5 },
        border: theme =>
          `1px solid ${
            active ? alpha(theme.palette.common.white, 0.26) : 'rgba(255, 255, 255, 0.7)'
          }`,
        boxShadow: active
          ? '0 26px 60px rgba(0,0,0,0.42)'
          : '0 14px 34px rgba(0,0,0,0.28)',
        transform: active ? 'translateY(-4px)' : 'translateY(0)',
        transition:
          'height 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, margin-top 0.4s ease',
        '&:hover': {
          transform: active ? 'translateY(-10px)' : 'translateY(-6px)',
        },
        '&:hover .mini-card-image': {
          transform: 'scale(1.08)',
        },
        '&:hover .mini-card-shine': {
          transform: 'translateX(160%) rotate(16deg)',
        },
      }}
    >
      <Box
        className="mini-card-image"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${project.cover}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.01)',
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.02) 0%,
              rgba(0,0,0,0.10) 24%,
              rgba(0,0,0,0.42) 62%,
              rgba(0,0,0,0.88) 100%
            )
          `,
        }}
      />

      <Box
        className="mini-card-shine"
        sx={{
          position: 'absolute',
          inset: '-20%',
          zIndex: 2,
          pointerEvents: 'none',
          background: `
            linear-gradient(
              115deg,
              transparent 22%,
              rgba(255,255,255,0.02) 32%,
              rgba(255,255,255,0.18) 42%,
              rgba(255,255,255,0.34) 49%,
              rgba(255,255,255,0.08) 56%,
              transparent 66%
            )
          `,
          transform: 'translateX(-160%) rotate(16deg)',
          transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '22px',
          background: active
            ? 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent 30%)'
            : 'none',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          zIndex: 3,
        }}
      >
        <Typography
          sx={{
            color: '#ffffff',
            fontWeight: 900,
            fontSize: { xs: '0.92rem', md: '1rem' },
            lineHeight: 1.05,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            mb: 0.35,
            textShadow: '0 4px 14px rgba(0,0,0,0.45)',
          }}
        >
          {project.shortTitle || project.title}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: '0.72rem',
            lineHeight: 1.2,
          }}
        >
          {project.category}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 3,
          minWidth: 26,
          height: 26,
          px: 0.8,
          borderRadius: '999px',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.72rem',
          backgroundColor: 'rgba(0,0,0,0.30)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </Box>
    </Box>
  )
}

export default ProjectMiniCard