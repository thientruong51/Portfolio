import { Typography, Button, Stack } from '@mui/material'
import SectionContainer from '../../components/common/SectionContainer'
import SectionTitle from '../../components/common/SectionTitle'
import contactContent from '../../content/en/contact'

function ContactSection() {
  return (
    <SectionContainer id="contact">
      <SectionTitle>{contactContent.title}</SectionTitle>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {contactContent.description}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" href={`mailto:${contactContent.email}`}>
          Email Me
        </Button>
      </Stack>
    </SectionContainer>
  )
}

export default ContactSection