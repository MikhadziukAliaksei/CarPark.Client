import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCars";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DCarForm from "./form/DCarForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import CarAddModal from "./CarAddModal";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DCars = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCars()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCarForm {...({ currentId, setCurrentId })} />
                </Grid>

                <Grid >
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Mark</TableCell>
                                    <TableCell>Model</TableCell>
                                    <TableCell>Manufacturer Country</TableCell>
                                    <TableCell>YearOfIssue</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Color</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCarList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.mark}</TableCell>
                                            <TableCell>{record.model}</TableCell>
                                            <TableCell>{record.manufacturerCountryId}</TableCell>
                                            <TableCell>{record.yearOfIssue}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCarList: state.dCar.list
})

const mapActionToProps = {
    fetchAllDCars: actions.fetchAll,
    deleteDCar: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCars));