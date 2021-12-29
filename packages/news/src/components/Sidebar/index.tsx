import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTheme, Drawer as MuiDrawer } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavSection from '../NavSection';
import Logo from '../Logo';
import Scrollbar from '../Scrollbar';
import sidebarConfig from './SidebarConfig';

export const drawerWidth = 240;

interface Props {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
  onOpenSidebar: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  background: 'white',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader: React.FC = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5.3)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7.3)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function PersistentDrawerLeft({
  isOpenSidebar,
  onCloseSidebar,
  onOpenSidebar,
}: Props) {
  const theme = useTheme();
  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        padding: '10px 0px',
        background: theme.palette.primary.main,
      }}
    >
      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  const onClickToggle = (): void => {
    isOpenSidebar ? onCloseSidebar() : onOpenSidebar();
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1, width: '100vw' }}
        open={isOpenSidebar}
      >
        <Toolbar sx={{ display: 'flex', color: 'black' }}>
          <IconButton color="primary" aria-label="open drawer" onClick={onClickToggle} edge="start">
            <MenuIcon />
          </IconButton>
          <Logo />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={isOpenSidebar}>
          <DrawerHeader>
            <Typography variant="h5">Lập trình không khó</Typography>;
          </DrawerHeader>
          {renderContent}
        </Drawer>
      </Box>
    </Box>
  );
}
