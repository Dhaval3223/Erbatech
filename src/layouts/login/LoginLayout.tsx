// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        {/* <Typography variant="h3" sx={{ mb: 10, textAlign: 'center' }}>
          {title || 'Soblue Sensor Monitoring System'}
        </Typography> */}

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            illustration ||
            '/assets/illustrations/SOBLUE Sitebranding Büro München Übersichtsphoto 500x350mm Druck Beschnitt ohne Marken-4.svg'
          }
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
