import { Box } from '@mui/material'

function PolygonBottomLine() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'visible',
          filter: 'drop-shadow(0 0 8px rgba(255, 92, 122, 0.32))',
        }}
      >
        <path
          d="M0 82 L240 82 L290 100 L710 100 L760 82 L1000 82"
          fill="none"
          stroke="rgba(255,92,122,0.18)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M0 82 L240 82 L290 100 L710 100 L760 82 L1000 82"
          fill="none"
          stroke="#ff5c7a"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        
      </Box>
    </Box>
  )
}

export default PolygonBottomLine