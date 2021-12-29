import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import DashboardSidebar, { DrawerHeader } from '@news/components/Sidebar';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflow: 'hidden',
  background: '#E5E5E5',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DefaultLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <RootStyle>
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        onOpenSidebar={() => setOpen(true)}
      />
      <Main open={open}>
        <div>hello</div>
        <DrawerHeader />
        {children}
      </Main>
    </RootStyle>
  );
};

export default DefaultLayout;
