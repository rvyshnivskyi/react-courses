import {Provider} from "react-redux";
import {store} from "./store";
import {WaitersApp} from "./features/Waiters";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import React from "react";
import {Home} from "./features/Home";
import {NotFound} from "./features/NotFound";
import {AppBar, Container, Toolbar} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Navigation} from "./components/Navigation";

export function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Stack spacing={2}>
                        <AppBar position="static">
                            <Toolbar>
                                <Navigation/>
                            </Toolbar>
                        </AppBar>
                        <hr/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/waiters/*" element={<WaitersApp/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Stack>
                </Container>
            </BrowserRouter>
        </Provider>
    );
}