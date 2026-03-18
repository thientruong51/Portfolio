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
        py: { xs: 2.2, sm: 2.5 },
        borderTop: '1px solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.18),
        background: (theme) =>
          `linear-gradient(
            180deg,
            ${alpha(theme.palette.background.paper, 0.5)} 0%,
            ${alpha(theme.palette.background.default, 0.9)} 100%
          )`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          alignItems={{ xs: 'center', md: 'center' }}
          justifyContent="space-between"
          spacing={{ xs: 1, sm: 1.2, md: 2 }}
          sx={{
            minHeight: { xs: 'auto', md: 24 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Left side */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.9rem' },
              lineHeight: 1.7,
            }}
          >
            {translation.footer.madeWith}{' '}
            <FavoriteRoundedIcon
              sx={{
                mx: 0.35,
                fontSize: { xs: 14, sm: 15 },
                color: 'primary.main',
                verticalAlign: 'text-bottom',
              }}
            />
            {translation.footer.by}{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
              }}
            >
              Diep Nguyen Thien Truong 🐺
            </Box>
          </Typography>

          {/* Right side */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', sm: '0.86rem', md: '0.9rem' },
              lineHeight: 1.6,
              textAlign: { xs: 'center', md: 'right' },
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