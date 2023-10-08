import {WaiterI} from "../type";
import {useCallback, useEffect, useState} from "react";
import {WaitersApi} from "../api/server";

const DEFAULT_WAITER: WaiterI = {
    firstName: '',
    phone: ''
}

export function useWaiter(waiter: WaiterI = DEFAULT_WAITER) {
    const [editingWaiter, setEditingWaiter] = useState<WaiterI>(waiter);
    const [waiters, setWaiters] = useState<WaiterI[]>([]);

    const getWaiters = useCallback(() => {
        WaitersApi.getList().then(setWaiters)
    }, [])

    useEffect(() => {
        getWaiters()
    }, [getWaiters])

    const onWaiterSubmit = (waiter: WaiterI) => {
        if (waiter.id) {
            WaitersApi.update(waiter.id, waiter).then(getWaiters)
        } else {
            WaitersApi.create(waiter).then(getWaiters)
        }
        setEditingWaiter(DEFAULT_WAITER)
    }

    const editWaiter = (waiter: WaiterI) => {
        setEditingWaiter(waiter)
    }

    const deleteWaiter = (id: number) => {
        WaitersApi.delete(id).then(getWaiters)
    }

    return {
        editingWaiter,
        onWaiterSubmit,
        waiters,
        editWaiter,
        deleteWaiter
    }
}