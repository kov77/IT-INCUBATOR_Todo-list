import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {logoutTC} from "./state/auth-reducer";



const Header = () => {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        // @ts-ignore
        dispatch(logoutTC())
    }

    return <AppBar position="static">
        <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                TODO LIST
            </Typography>
            {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
        </Toolbar>
    </AppBar>
}

export default Header;
