import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { type NextPage } from 'next';

import TLink from '@news/components/TLink';
import Copyright from '@news/components/Copyright';
import ProTip from '@news/components/ProTip';

const Home: NextPage = () => (
  <Container maxWidth="lg">
    <Box my={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h4" component="h1" gutterBottom>
        MUI v5 + Next.js with TypeScript example
      </Typography>
      <TLink href="/about">Go to the about page</TLink>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
);

export default Home;
