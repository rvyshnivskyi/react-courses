import React from "react";
import {Box, CircularProgress} from "@mui/material";

export function Loading(): React.ReactElement {
    return <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress/>
    </Box>;
}