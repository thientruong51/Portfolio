import { Box, Container } from '@mui/material'

function SectionContainer({ id, children, sx = {} }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        ...sx,
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  )
}

export default SectionContainer