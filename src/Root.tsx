import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useCodeGrpStore, useCodeStore } from './store/commonStore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
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

function Root() {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Store CodeStore Hook and fetch codeList on useEffect() to fetch initial data. 
    const codeGrpStore = useCodeGrpStore();
    const codeStore = useCodeStore();
    React.useEffect(() => {
        const fetchData = async () => {
            if(codeGrpStore.codeGrpList.length === 0) await codeGrpStore.fetch.storeCodeGrpList();
            if(codeStore.codeList.length === 0) await codeStore.fetch.storeCodeList();
    
        };
        
        fetchData();

        console.log('codeGrpStore', codeGrpStore.codeGrpList);
        console.log('codeStore', codeStore.codeList);
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header 
                drawerWidth={drawerWidth}
                open={open}
                handleDrawerClose={handleDrawerClose} 
                handleDrawerOpen={handleDrawerOpen} 
            />
            <Main open={open}>
                <DrawerHeader />
                <Outlet/>
            </Main>
        </Box>
    );
}

export default Root;