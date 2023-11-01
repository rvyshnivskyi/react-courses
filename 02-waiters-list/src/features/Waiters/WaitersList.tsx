import {WaiterI} from "./type";
import {WaitersListItem} from "./WaitersListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getWaitersList} from "./store/thunk";
import {Page} from "../../components/Page";
import {queriedWaitersListSelector} from "./store/selectors";
import {Link} from "react-router-dom";
import {Query} from "./Querie";
import {setNameQueryAction, setPhoneQueryAction} from "./store/reducer";

export function WaitersList() {
    const waiters = useSelector(queriedWaitersListSelector);
    const isLoading = useSelector((state: any) => state.waiters.isWaitersListLoading);
    const loadingError = useSelector((state: any) => state.waiters.loadingWaitersListError);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(getWaitersList())
    }, [getWaitersList]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (loadingError) {
        return <div style={{color: 'red'}}>Error: {loadingError.message}</div>
    }

    return (
        <Page
            title={'Waiters'}
            loading={isLoading}
            error={loadingError}
        >
            <div>
                <Link to={'/waiters/create'}><button>Create waiter</button></Link>
            </div>

            <Query title={'Name query'} queryName={'name'} queryChangingAction={setNameQueryAction}/>
            <Query title={'Phone query'} queryName={'phone'} queryChangingAction={setPhoneQueryAction}/>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {waiters.map((waiter: WaiterI) => <WaitersListItem key={waiter.id} waiter={waiter}/>)}
                </tbody>
            </table>
        </Page>

    );
}