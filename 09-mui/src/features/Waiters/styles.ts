import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => {
    return {
        end: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px',
        }
    };
});