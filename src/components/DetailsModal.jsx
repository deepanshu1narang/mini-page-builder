import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

import SnackBarStrip from './Snackbar';
import "./PageBuilder.css";

const DetailsModal = (props) => {

    function renderModalComponent(control) {

        let element = "";
        if (control.type === "input") {
            element = <></>
        }
        else if (control.type === "label") {
            element = <>
                <Stack>
                    <Typography>Text</Typography>
                    <TextField className='textfield' value={props?.modalConfig?.text ?? ""} multiline sx={{ padding: "0.1rem" }} onChange={e => handleModalConfigs(e, "text", "value")} />
                </Stack>
                <Stack>
                    <Typography>Font Size</Typography>
                    <TextField
                        className='textfield'
                        value={props?.modalConfig?.size ?? ""}
                        onChange={e => handleModalConfigs(e, "size", "value", true)}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}
                    />
                </Stack>
                <Stack>
                    <Typography>Font Weight</Typography>
                    <TextField className='textfield' value={props?.modalConfig?.fontWeight ?? ""} onChange={e => handleModalConfigs(e, "fontWeight", "value", true)} />
                </Stack>

            </>
        }
        else if (control.type === "button") {
            element = <>
                <Stack>
                    <Typography>Label</Typography>
                    <TextField className='textfield' value={props?.modalConfig?.label} onChange={e => handleModalConfigs(e, "label", "value")} />
                </Stack>
                <Stack>
                    <Typography>Variant</Typography>
                    {/* <TextField className='textfield' /> */}
                    <Select
                        sx={{ height: "2rem", width: "10rem" }}
                        value={props?.modalConfig?.variant}
                        onChange={e => handleModalConfigs(e, "variant", "value")}
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="contained">Contained</MenuItem>
                        <MenuItem value="outlined">Outlined</MenuItem>
                    </Select>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Checkbox checked={props?.modalConfig?.isDisabled} onChange={e => handleModalConfigs(e, "isDisabled", "checked")} />
                    <Typography>Disabled</Typography>
                </Stack>
            </>
        }
        return element;
    }

    const handleModalConfigs = (e, property, type, toValidate) => {
        if(!toValidate) toValidate = false;
        function isPositiveNumber(value) {
            const pattern = /^(?!0\d)\d*\.?\d*$/;
            return pattern.test(String(value));
        }
        let configs = { ...props?.modalConfig };
        if (toValidate) {
            if (!isPositiveNumber(e.target.value)) {
                props.setSnackbarMsg({
                    "show": true,
                    "message": `Cannot put value for ${property} other than positive numbers`,
                    "type": "error"
                })
                return;
            }
        }
        if(!e?.target[type]) e.target[type] = ""
        configs[property] = e.target[type];
        props.setModalConfig(configs);
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            style={props?.style}
        >
            <Stack justifyContent="space-between" className='modal'>
                <h3 style={{ margin: 0 }}>{props?.control?.label}</h3>
                <Stack gap={1} sx={{ height: "15rem", overflowY: "auto", margin: "0.7rem 0" }} >
                    {
                        renderModalComponent(props.control)
                    }
                    <Stack>
                        <Typography>X</Typography>
                        <TextField className='textfield' value={props?.modalConfig?.x} onChange={e => handleModalConfigs(e, "x", "value", true)} />
                    </Stack>
                    <Stack>
                        <Typography>Y</Typography>
                        <TextField className='textfield' value={props?.modalConfig?.y} onChange={e => handleModalConfigs(e, "y", "value", true)} />
                    </Stack>
                </Stack>
                <Stack direction="row" sx={{ marginTop: "0.5rem" }} >
                    <Button onClick={props.handleClose} size="small" variant='outlined' sx={{ textTransform: "none", width: "6.5rem", fontSize: "0.875rem", margin: "0 0.1rem" }} >Cancel</Button>
                    <Button onClick={props.handleModalSave} size="small" variant="contained" sx={{ textTransform: "none", width: "6.5rem", fontSize: "0.875rem", margin: "0 0.1rem" }} >Save</Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

export default DetailsModal;
