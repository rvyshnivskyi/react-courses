import {Waiter} from "../type";

export class WaitersApi {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    create = (waiter: Waiter) => fetch(this.baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(waiter)
    }).then(response => response.json());

    getList = () => fetch(this.baseUrl).then(response => response.json());
}