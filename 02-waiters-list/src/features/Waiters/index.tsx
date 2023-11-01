import {FormEdit} from "./FormEdit";
import {WaitersList} from "./WaitersList";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../NotFound";

export function WaitersApp() {

    return (
        <Routes>
            <Route path="/" element={<WaitersList/>}/>
            <Route path="/create" element={<FormEdit/>}/>
            <Route path="/:id/edit" element={<FormEdit/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}