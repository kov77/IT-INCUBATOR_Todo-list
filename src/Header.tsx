import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";

const Header = () => {
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
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
}

export default Header;
