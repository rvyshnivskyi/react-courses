import {Provider} from "react-redux";
import {store} from "./store";
import {WaitersApp} from "./features/Waiters";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";

import React from "react";
import {Home} from "./features/Home";
import {NotFound} from "./features/NotFound";

export function App() {
    const isActiveClass = ({isActive}: any) => isActive ? "active" : "";

    return (
        <Provider store={store}>
            <BrowserRouter>
                <nav>
                    <NavLink to="/" end className={isActiveClass}>Home</NavLink>{' | '}
                    <NavLink to="/waiters" className={isActiveClass}>Waiters</NavLink>{' | '}
                </nav>
                <hr/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/waiters/*" element={<WaitersApp/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}