import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../hooks";
import {Input, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";

interface PropsI {
    title: string
    queryName: string
    queryChangingAction: any
}

export function QueriedHeader({title, queryName, queryChangingAction}: PropsI): React.ReactElement {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get(queryName) || '';
    const setQueryValue = (value: string) => {
        searchParams.set(queryName, value);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (queryValue === '') {
            searchParams.delete(queryName)
            setSearchParams(searchParams);
        }
        dispatch(queryChangingAction(queryValue));
    }, [queryValue]);


    function onQueryValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQueryValue(event.target.value);
    }

    return (
        <Stack>
            <Typography component="header">{title}</Typography>
            <Input value={queryValue} onChange={onQueryValueChange}/>
        </Stack>
    );
}