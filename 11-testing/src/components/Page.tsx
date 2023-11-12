import React from "react";
import {Alert} from "./Alert";
import {Loading} from "./Loading";

interface PropsI {
    title: string
    loading?: boolean
    error?: string
    children: React.ReactNode
}

export function Page({title, loading, error, children} : PropsI) : React.ReactElement {
    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>{title}</h1>
            {loading && <Loading/>}
            {error && <Alert message={error} />}
            {!loading && !error && children}
        </div>
    );
}