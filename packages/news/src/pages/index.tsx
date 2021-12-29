import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import TLink from '@news/components/TLink';
import Copyright from '@news/components/Copyright';
import ProTip from '@news/components/ProTip';
import DefaultLayout from '@news/layout/default';

const Home = () => (
  <DefaultLayout>
    <Container maxWidth="lg">
      <Box my={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Techmely
        </Typography>
        <TLink href="/about">Go to the about page</TLink>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  </DefaultLayout>
);

Home.getLayout = page => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
