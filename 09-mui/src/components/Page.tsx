import React from "react";
import {Alert} from "./Alert";
import {Loading} from "./Loading";
import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";

interface PropsI {
    title: string
    loading?: boolean
    error?: string
    children: React.ReactNode
}

export function Page({title, loading, error, children}: PropsI): React.ReactElement {
    return <Stack spacing={2}>
        <Typography variant="h4" component="h1">
            {title}
        </Typography>
        {loading && <Loading/>}
        {error && <Alert message={error}/>}
        {!loading && !error && children}
    </Stack>
}