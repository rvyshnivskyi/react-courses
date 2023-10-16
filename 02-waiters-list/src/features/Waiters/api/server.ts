import {WaiterI} from "../type";
import {FetchClient} from "../../../api/FetchClient";

const URL = 'http://localhost:4000/waiters';

export const WaitersApi = new FetchClient<WaiterI>(URL);