import { Typography } from '@mui/material'

function SectionTitle({ children }) {
  return (
    <Typography
      variant="h2"
      sx={{
        mb: 4,
        fontSize: { xs: '2.8rem', md: '4.2rem' },
      }}
    >
      {children}
    </Typography>
  )
}

export default SectionTitle