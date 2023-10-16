import {Provider} from "react-redux";
import {store} from "./store";
import {WaitersApp} from "./features/Waiters";

export function App() {
    return (
        <Provider store={store}>
            <WaitersApp/>
        </Provider>
    );
}