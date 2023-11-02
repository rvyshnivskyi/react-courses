import {WaiterI} from "./type";
import {WaitersListItem} from "./WaitersListItem";
import {useEffect} from "react";
import {Page} from "../../components/Page";
import {queriedWaitersListSelector} from "./store/selectors";
import {Link} from "react-router-dom";
import {Query} from "./Querie";
import {setNameQueryAction, setPhoneQueryAction, startWaitersListLoadingAction} from "./store/reducer";
import {useAppDispatch, useAppSelector} from "../../hooks";

export function WaitersList() {
    const waiters = useAppSelector(queriedWaitersListSelector);
    const isLoading = useAppSelector((state) => state.waiters.isWaitersListLoading);
    const loadingError = useAppSelector((state) => state.waiters.loadingWaitersListError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startWaitersListLoadingAction())
    }, [dispatch, startWaitersListLoadingAction]);

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