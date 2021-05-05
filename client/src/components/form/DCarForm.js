import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/dCars";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    mark: '',
    model: '',
    color: '',
    price: '',
    quantity: '',
    manufacturerCountryId: '',
    yearOfIssue: '',
    carSpecificationId: '',
    isDeleted: ''
}

const DCarForm = ({classes, ...props}) => {
    const {addToast} = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('mark' in fieldValues)
            temp.mark = fieldValues.mark ? "" : "This field is required."
        if ('model' in fieldValues)
            temp.model = fieldValues.model ? "" : "This field is required."
        if ('color' in fieldValues)
            temp.color = fieldValues.color ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        if ('yearOfIssue' in fieldValues)
            temp.yearOfIssue = fieldValues.yearOfIssue ? "" :"This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "") 
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.SetCurrentId)

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", {appearance: 'success'})
            }
            if (props.currentId == 0)
                props.createDCar(values, onSuccess)
            else
                props.updateDCar(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dCarList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className = {classes.root} onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs = {6}>
                    <TextField
                        name = "mark"
                        variant = "outlined"
                        label = "Mark"
                        value = {values.mark}
                        onChange = {handleInputChange}
                        {...(errors.mark && {error: true, helperText: errors.mark})} 
                    />
                    <TextField
                        name = "model"
                        variant = "outlined"
                        label = "Model"
                        value = {values.model}
                        onChange = {handleInputChange}
                        {...(errors.model && {error: true, helperText: errors.model})} 
                    />
                    <FormControl variant = "outlined" className = {classes.formControl} {...(errors.manufacturerCountryId && {error: true})}>
                        <InputLabel ref = {inputLabel}>ManufacturerCountry</InputLabel>
                        <Select
                         name = 'manufacturerCountryId'
                         value = {values.manufacturerCountryId}
                         onChange = {handleInputChange}
                         labelWidth = {labelWidth}
                        >
                        <MenuItem value="">Select Manufacturer Country</MenuItem>
                        <MenuItem value="Russia">Russia</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                        </Select>
                        {errors.manufacturerCountryId && <FormHelperText>{errors.manufacturerCountryId}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item  xs = {6}>
                    <TextField
                        name = 'color'
                        variant = "outlined"
                        label = "Color"
                        value = {values.color}
                        onChange = {handleInputChange}
                        {...(errors.color && {error: true, helperText: errors.color})}
                    />
                    <TextField
                        name = 'price'
                        variant = "outlined"
                        label = "Price"
                        value = {values.price}
                        onChange = {handleInputChange}
                        {...(errors.color && {error: true, helperText: errors.color})}
                    />
                    <TextField
                        name = 'yearOfIssue'
                        variant = "outlined"
                        label = "YearOfIssue"
                        value = {values.yearOfIssue}
                        onChange = {handleInputChange}
                        {...(errors.color && {error: true, helperText: errors.color})}
                    />
                    <div>
                        <Button
                            variant = "contained"
                            color = "primary"
                            type = "submit"
                            className = {classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant = "contained"
                            className = {classes.smMargin}
                            onClick = {resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    dCarList: state.dCar.list
})

const mapActionToProps = {
    createDCar: actions.create,
    updateDCar: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCarForm));