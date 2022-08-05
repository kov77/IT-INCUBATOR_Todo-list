import React, {useEffect} from 'react';
import './App.css';
import Header from "./Header";
import {Container} from "@mui/material";
import {Navigate, Route, Routes } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "./state/store";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./utils/Login";
import {TodolistContainer} from "./TodolistContainer";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./state/app-reducer";

function AppWithRedux() {

    const status = useAppSelector((state) => state.app.status )
    const dispatch = useDispatch()
    useEffect( () => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <Header/>
            {status === "loading" && <LinearProgress style={{"width": "100%"}} color="secondary"/>}

            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistContainer/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to="/404"/>} />
                </Routes>
            </Container>
            <ErrorSnackbar />
        </div>

    );
}

export default AppWithRedux;
