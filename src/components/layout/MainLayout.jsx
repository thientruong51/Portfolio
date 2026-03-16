import { Box, Toolbar } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <Navbar />
      <Toolbar sx={{ minHeight: { xs: 96, md: 80 } }} />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  )
}

export default MainLayout