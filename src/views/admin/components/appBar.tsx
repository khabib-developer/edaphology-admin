import React from 'react';
import {AppBarProps, IconButton, Toolbar} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import styled from "@emotion/styled";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthHook} from "@/hooks/authorization/auth.hook";
export const drawerWidth: number = 240;

const AppBarStyled = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})<AppBarProps>(({ theme, open }) => ({
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

export interface IAppBar {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppBar: React.FC<IAppBar> = ({open, setOpen}) => {

    const { logout } = useAuthHook()

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const {isAdmin} = useAuthHook()
    return (
        <AppBarStyled position="absolute" open={open}>
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
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {isAdmin()?"Admin":"Power" } User
                </Typography>
                <IconButton color="inherit" onClick={() => logout()}>
                    <Badge color="secondary">
                        <LogoutIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBarStyled>
    );
};

export default AppBar;