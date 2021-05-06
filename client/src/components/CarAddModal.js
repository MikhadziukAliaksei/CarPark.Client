import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import DCarForm from './form/DCarForm';
import Fade from '@material-ui/core/Fade';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CarAddModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentId, setCurrentId] = useState(0)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
             <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                    onClick = {handleOpen}
                >
                    ADD NEW CAR
                </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className = {classes.paper}>
                        <h2 id= "transition-modal-title">ADD NEW CAR</h2>
                        <DCarForm {...({ currentId, setCurrentId })} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}