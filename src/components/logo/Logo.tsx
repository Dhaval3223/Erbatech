import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/LogoSoblue.jpg"
    //     sx={{ width: 200, height: 50, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
    <Box component="img" src="/logo/LogoSoblue.jpg" alt="logo" sx={{
      width: 150,
      height: 45,
      background: 'transparent',
      // display: 'inline-flex',
      cursor: 'pointer',
      ...sx
      // position:!disabledLink ?'absolute' : 'unset',
      // ml:!disabledLink ? '10px' : '0px',
      // mt: !disabledLink ? '10px' : '0px'
    }}/>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
