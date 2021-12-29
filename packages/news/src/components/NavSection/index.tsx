import { useState, useEffect, useMemo } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { HMSidebarMenu } from 'types';

const ListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    color: '#F2EDFF',
  }),
) as any;

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ListItemTextStyle = styled(ListItemText)({
  fontSize: '1rem',
});

interface Props {
  item: HMSidebarMenu;
  active: (path?: string) => boolean;
}

function NavItem(props: Props) {
  const { item, active } = props;
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, children } = item;
  const [open, setOpen] = useState<boolean>(isActiveRoot);

  const hasActiveChildPath = useMemo(
    () => !!children?.some(child => active(child.path)),
    [children, active],
  );

  useEffect(() => {
    setOpen(hasActiveChildPath);
  }, [hasActiveChildPath]);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: theme.palette.common.white,
    '&.MuiListItemButton-root:hover': {
      background: 'white',
    },
  };

  const activeSubStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: theme.palette.common.white,
    '&.MuiListItemButton-root:hover': {
      background: 'white',
    },
  };

  const defaultSubStyle = {
    color: '#F2EDFF',
    padding: '0px 20px',
    height: 34,
    bgcolor: theme.palette.primary.dark,
    margin: '0 20px 8px',
    borderRadius: '5px',
    '&.MuiListItemButton-root:hover': {
      background: theme.palette.primary.darker,
    },
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(children.some(child => active(child.path)) && activeRootStyle),
          }}
        >
          {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
          <ListItemTextStyle disableTypography primary={'tieu de'} />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {children.map(child => {
              const isActiveSub = active(child.path);

              return (
                <ListItemStyle
                  key={child.title}
                  // component={RouterLink}
                  to={child.path}
                  sx={{
                    ...defaultSubStyle,
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemTextStyle disableTypography primary="tieu de" />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      // component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={'tieu de'} />
    </ListItemStyle>
  );
}

interface NavSectionProps {
  navConfig: HMSidebarMenu[];
  [prop: string]: any;
}

export default function NavSection(props: NavSectionProps) {
  const { navConfig, ...other } = props;

  const match = (path?: string) => true;
  // (path ? !!matchPath({ path, end: true }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map(item => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
