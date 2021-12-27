import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TLink from '@news/components/TLink';
import ProTip from '@news/components/ProTip';
import Copyright from '@news/components/Copyright';

const About: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          ABOUT PAGE
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={TLink} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default About;
