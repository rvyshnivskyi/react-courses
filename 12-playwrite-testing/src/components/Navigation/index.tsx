import {NavLink} from "react-router-dom";
import React from "react";
import {Typography} from "@mui/material";
import {useStyles} from "./styles";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const menu = [
    {to: "/", label: "Home"},
    {to: "/waiters", label: "Waiters"}
]

export function Navigation() {
    const {classes, cx} = useStyles();
    const isActiveClass = ({isActive}: any) => isActive ? cx(classes.toolbarLink, classes.active) : classes.toolbarLink;

    const menuItems = menu.map(({to, label}) => (
        <NavLink to={to} className={isActiveClass} key={label}>
            <Typography variant="h6" component="div">{label}</Typography>
        </NavLink>
    ));

    return (
        <Stack
            component="nav"
            direction="row"
            divider={<Divider orientation="vertical" flexItem/>}
            spacing={2}
            useFlexGap
            justifyContent="center"
        >
            {menuItems}
        </Stack>
    )
}