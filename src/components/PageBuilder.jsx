import React, { useEffect, useRef, useState } from 'react';
import Stack from "@mui/material/Stack";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import draggableButtons from "../utils/draggableButtons";

import './PageBuilder.css';
import { TextFields } from '@mui/icons-material';
import DetailsModal from './DetailsModal';
import SnackBarStrip from './Snackbar';
import Header from './Header';

const PageBuilder = () => {
    const [components, setComponents] = useState([]);
    const [controlDragged, setControlDragged] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [modalConfig, setModalConfig] = useState({ x: 0, y: 0, type: '', label: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [source, setSource] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState({
        "show": false,
        "message": "",
        "type": ""
    });

    const pageRef = useRef(null);

    const handleDragStart = (event, control) => {
        console.log(control?.type + " drag started");
        setIsNew(true);
        setControlDragged(control);
        setSource("sidebar");
    };

    const changePosition = (event, component, index) => {
        setControlDragged(component);
        setSource("page");
    }

    const handleElementClick = (_, comp) => {
        setSelectedComponent(comp);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        const rect = pageRef.current.getBoundingClientRect();
        const newPosition = { x: clientX - rect.left, y: clientY - rect.top };

        if (source === "sidebar") {

            setModalConfig({ ...modalConfig, ...newPosition, type: controlDragged?.type, id: controlDragged?.type + "_" + Math.random() });
            setIsModalOpen(true);
        }
        else if (source === "page") {
            let comps = [...components];
            console.log(comps);
            comps.forEach((each, i) => {
                if (each.id === controlDragged?.id) {
                    each.x = newPosition.x;
                    each.y = newPosition.y;
                }
            })
            console.log(comps);
            setComponents(comps);
            saveToLocalStorage(comps);
        }
        setSource(null);
    }

    const handleUpdateConfig = (comp) => {
        setIsModalOpen(true);
        setModalConfig(comp);
        setIsNew(false);
    }

    const handleDeleteElement = (comp) => {
        let comps = [...components];
        comps = comps.filter(c => c.id !== comp.id);
        setComponents(comps);
        saveToLocalStorage();
    }
    
    const handleKeyPresses = (e, comp, index) => {
        e.preventDefault(); 
        if (selectedComponent?.id === comp?.id) {
            if (e.key === "Enter") {
                handleUpdateConfig(comp);
            }
            else if (e.key === "Delete") {
                handleDeleteElement(comp);
            }
        }
    }

    const saveToLocalStorage = (data) => {
        if(!data) data = components
        localStorage.setItem('pageBuilderComponents', JSON.stringify(data));
    };

    function renderComponent(comp) {
        let element;

        if (comp?.type === "label") {
            element = <Typography sx={{ fontWeight: comp?.fontWeight ? comp?.fontWeight : "500", fontSize: comp?.size ? comp?.size + "px" : "16px" }}>{comp?.text ?? "Label"}</Typography>
        }
        else if (comp?.type === "input") {
            element = <TextField
                size='small'
                className='textfield'
                autoComplete='off'
                InputProps={{
                    readOnly: true,
                }}
            />
        }
        else if (comp?.type === "button") {
            element = <Button variant={comp?.variant} disabled={comp?.isDisabled}>{comp.label}</Button>
        }

        return element;
    }

    const handleModalSave = () => {
        if (isNew) {
            setComponents([...components, { ...modalConfig }]);
        }
        else {
            let comps = [...components];
            comps.forEach(each => {
                if (each.id === selectedComponent.id) {
                    Object.keys(each).forEach(e => {
                        each[e] = modalConfig[e];
                    })
                    Object.keys(modalConfig).forEach(e => {
                        each[e] = modalConfig[e];
                    })
                }
            });
            setComponents(comps);
        }
        setIsModalOpen(false);
        setModalConfig({});
        saveToLocalStorage();
    };

    useEffect(() => {
        const savedComponents = JSON.parse(localStorage.getItem('pageBuilderComponents')) || [];
        setComponents(savedComponents);
        const onClickPage = () => setSelectedComponent(null);
        pageRef?.current?.addEventListener("click", onClickPage);
        () => pageRef?.current?.removeEventListener("click", onClickPage);
    }, []);

    return (
        <>
        <Header setSnackbarMsg={setSnackbarMsg} snackbarMsg={snackbarMsg} />
        <Stack className='PageBuilder' direction="row-reverse" >
            <Stack className='sidebar'>
                {
                    draggableButtons?.map((control, index) => {
                        return (
                            <Stack
                                key={index}
                                draggable
                                className='draggable-component'
                                direction="row"
                                alignItems="center"
                                onDragStart={e => handleDragStart(e, control)}
                            >
                                <DragIndicatorIcon />
                                {control.label}
                            </Stack>
                        )
                    })
                }
            </Stack>
            <Stack
                className='page'
                ref={pageRef}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
            >
                {
                    components?.map((comp, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={e => changePosition(e, comp, index)}
                            className={`page-element ${selectedComponent?.id === comp?.id ? 'selected' : ''}`}
                            role="button"


                            onKeyDown={e => handleKeyPresses(e, comp, index) }
                            tabIndex={index}

                            onClick={(e) => handleElementClick(e, comp, index)}
                            style={{ top: comp.y, left: comp.x, position: 'absolute', display: "inline-block" }}
                        >
                            { renderComponent(comp) }
                        </div>
                    ))
                }
            </Stack>
            {
                isModalOpen && <DetailsModal
                    open={isModalOpen}
                    style={{ top: "50%", left: "40%" }}
                    handleClose={() => setIsModalOpen(false)}
                    control={controlDragged}
                    handleModalSave={handleModalSave}
                    modalConfig={modalConfig}
                    setModalConfig={setModalConfig}
                    snackbarMsg={snackbarMsg}
                    setSnackbarMsg={setSnackbarMsg}
                />
            }
            <SnackBarStrip snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg} />
        </Stack>
        </>
    )
}

export default PageBuilder;
