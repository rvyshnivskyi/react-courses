import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";

interface PropsI {
    title: string
    queryName: string
    queryChangingAction: any
}

export function Query({title, queryName, queryChangingAction}: PropsI): React.ReactElement {
    const dispatch = useDispatch();
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
        <div style={{ marginBottom: '10px', marginTop: '10px'}}>
            <span>{title}: </span>
            <input type={'text'} value={queryValue} onChange={onQueryValueChange}/>
        </div>
    );
}