// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

interface Props {
  children?: React.ReactNode;
  sx?: object;
  [prop: string]: any;
}

export default function Scrollbar(props: Props) {
  const { children, sx, ...other } = props;
  const isMobile = false;
  // /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //   navigator.userAgent,
  // );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return <RootStyle sx={{ ...sx }}>{children}</RootStyle>;
}
