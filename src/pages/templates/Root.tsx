import * as React from 'react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Outlet} from 'react-router';
import {Avatar, createTheme, Menu, MenuItem, ThemeProvider, Tooltip} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from "../../components/template/Sidebar.tsx";
import {sidebarActions} from "../../features/components/sidebarSlice.ts";
import {RootState} from "../../store";
import IqadotLogo from '../../images/iqadot_logo_white 1.png'
import SuccessSnackbar from "../../components/snackbars/SuccessSnackbar.tsx";
import ErrorSnackbar from "../../components/snackbars/ErrorSnackbar.tsx";
import CustomBackdrop from "../../components/backdrop/CustomBackdrop.tsx";
import {useNavigate} from "react-router-dom";
import authSlice, {clearCredentials} from "../../features/auth/authSlice.tsx";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function HomePage() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#009688"
            }
        }
    })

    const settings = ['Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (
        event: any
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();
    const handleUserMenu = (action: string) => {
        if (action === "Logout"){
            dispatch(clearCredentials());
            navigate("/login");
        }
    }

    const data = useSelector((state: RootState) => state.sidebar);
    const dispatch = useDispatch();
    const toggleDrawer = () => {
        dispatch(sidebarActions.toggleOpened());
    };
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={data.opened}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(data.opened && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Box
                            component="img"
                            sx={{
                                height: 40,
                                display: { xs: 'none', md: 'flex' },
                                mr: 1
                            }}
                            alt={"Iqadot Logo"}
                            src={IqadotLogo}
                        />
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                        </Typography>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={user?.user} src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => {
                                        handleUserMenu(setting)
                                    }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={data.opened}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <Sidebar/>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Outlet/>
                    </Container>
                </Box>
            </Box>
            <SuccessSnackbar />
            <ErrorSnackbar />
            <CustomBackdrop />
        </ThemeProvider>
    );
}