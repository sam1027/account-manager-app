import {useNavigate, useLocation} from 'react-router-dom';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import { Collapse } from '@mui/material';
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
interface IHeader {
    drawerWidth: number;
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

function Header({drawerWidth, open, handleDrawerClose, handleDrawerOpen}:IHeader) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [openSetting, setOpenSetting] = React.useState(true);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        uri: string,
    ) => {
        navigate(uri);
    };

    const handleSettingMenuClick = () => {
        setOpenSetting(!openSetting);
    }

    return (
        <>
            <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    알로하 가계부
                </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton
                        selected={pathname === "/"}
                        onClick={(event) => handleListItemClick(event, "")}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'홈'} />
                    </ListItemButton>
                    <ListItemButton
                        selected={pathname === "/income"}
                        onClick={(event) => handleListItemClick(event, "income")}
                    >
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={'수입'} />
                    </ListItemButton>
                    <ListItemButton
                        selected={pathname === "/expenditure"}
                        onClick={(event) => handleListItemClick(event, "expenditure")}
                    >
                        <ListItemIcon>
                            <MoneyOffIcon />
                        </ListItemIcon>
                        <ListItemText primary={'지출'} />
                    </ListItemButton>
                    <ListItemButton onClick={handleSettingMenuClick}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'설정'} />
                        {openSetting ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSetting} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SentimentVerySatisfiedIcon />
                                </ListItemIcon>
                                <ListItemText primary="정기 수입" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SentimentNeutralIcon />
                                </ListItemIcon>
                                <ListItemText primary="정기 지출" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CreditCardIcon />
                                </ListItemIcon>
                                <ListItemText primary="카드" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="금융기관" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="항목 관리" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </>
    );
}

export default Header;