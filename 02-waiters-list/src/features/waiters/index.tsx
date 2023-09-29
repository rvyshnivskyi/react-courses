import {FormEdit} from "./FormEdit";
import {Waiter} from "./type";
import {WaitersList} from "./WaitersList";
import {useEffect, useState} from "react";
import {WaitersApi} from "./api/WaitersApi";

interface WaitersAppParams {
    waitersApi: WaitersApi;
}

export function WaitersApp({waitersApi}: WaitersAppParams) {

    const [waiters, setWaiters] = useState<Waiter[]>([]);

    useEffect(() => {
        waitersApi.getList().then(waiters => setWaiters(waiters))
    }, []);

    // create waters api class
    const onWaiterSubmit = (waiter: Waiter) => {
        waitersApi.create(waiter)
            .then(waiter => setWaiters([...waiters, waiter]));
    }

    return (
        <div>
            <FormEdit onWaiterSubmit={onWaiterSubmit}/>
            <br/>
            <WaitersList waiters={waiters}/>
        </div>
    )
}