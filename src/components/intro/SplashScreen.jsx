import { Box, Typography } from '@mui/material'

function SplashScreen({ isLeaving = false }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',

        background: `
          radial-gradient(circle at 50% 35%, rgba(255,70,70,0.18), transparent 25%),
          radial-gradient(circle at 50% 60%, rgba(180,0,0,0.12), transparent 35%),
          linear-gradient(180deg, #070000 0%, #140307 45%, #090000 100%)
        `,

        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* glow background */}
      <Box
        sx={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,60,60,0.25) 0%, rgba(255,60,60,0) 65%)',
          filter: 'blur(20px)',
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}
      />

      {/* content */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          px: 3,
          animation: 'fadeInUp 1.2s ease',
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Hatton', serif`,
            fontSize: { xs: '4rem', md: '7rem' },
            lineHeight: 0.9,
            color: '#fff1f1',
            letterSpacing: '-0.04em',

            textShadow: `
              0 0 18px rgba(255,70,70,0.35),
              0 10px 40px rgba(180,0,0,0.25)
            `,

            mb: 2,
          }}
        >
          Welcome
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,220,220,0.75)',
            fontSize: { xs: '1rem', md: '1.1rem' },
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Entering my portfolio
        </Typography>
      </Box>
    </Box>
  )
}

export default SplashScreen