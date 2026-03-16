import { Box, Container, Stack, Typography } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { alpha } from '@mui/material/styles'
import useLocalizedContent from '../../hooks/useLocalizedContent'

function Footer() {
  const { translation } = useLocalizedContent()

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        borderTop: '1px solid',
        borderColor: theme => alpha(theme.palette.primary.main, 0.18),
        background: theme =>
          `linear-gradient(180deg,
            ${alpha(theme.palette.background.paper, 0.5)} 0%,
            ${alpha(theme.palette.background.default, 0.9)} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minHeight: 16 }}
        >
          {/* Left side */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
            }}
          >
            {translation.footer.madeWith}{' '}
            <FavoriteRoundedIcon
              sx={{
                mx: 0.3,
                fontSize: 15,
                color: 'primary.main',
                verticalAlign: 'text-bottom',
              }}
            />
            {translation.footer.by}{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Diep Nguyen Thien Truong 🐺
            </Box>
          </Typography>

          {/* Right side */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
            }}
          >
            {translation.footer.copyright}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer