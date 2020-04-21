import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ActivationAlert = (props) => {

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={props.open}
                autoHideDuration={12000}
                onClose={props.onClose}
            >
            <Alert severity="info">{props.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default ActivationAlert;