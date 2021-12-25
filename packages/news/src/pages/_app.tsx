import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from '@news/src/components/Copyright';
import Link from '@news/src/components/Link';
import ProTip from '@news/src/components/ProTip';
import { type NextPage } from 'next';

const Home: NextPage = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        MUI v5 + Next.js with TypeScript example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
);

export default Home;
