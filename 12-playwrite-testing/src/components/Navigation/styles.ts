import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => {
    return {
        active: {
            color: 'red',
        },
        navigation: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
        },
        toolbarLink: {
            textDecoration: 'none',
            color: 'white',
        }
    };
});