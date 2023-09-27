import React from "react";
import {ToDoAction} from "./ToDoAction"

export const ToDoList = ({toDoList}) => (
    <table>
        <thead>
        <tr>
            <th>Action</th>
            <th>Completed status</th>
        </tr>
        </thead>
        <tbody>
        {toDoList.map((toDoAction) => <ToDoAction key={toDoAction.id} action={toDoAction}/>)}
        </tbody>
    </table>
)