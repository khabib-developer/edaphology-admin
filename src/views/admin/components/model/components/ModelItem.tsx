import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import React, {cloneElement, useMemo, useState} from "react";
import {IModel} from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";
import {useModelHook} from "@/hooks/models/model.hook";
import {Modal} from "@/views/admin/components/model/components/dialog";

interface IComponent {
    model: IModel;
    setActive: any,
    loading: boolean,
    setLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ModelItem: React.FC<IComponent> = ({
      model,
      setActive,
      loading,
      setLoading
  }) => {
    const handleClick = () => {
        setActive(true);
    };
    const [open, setOpen] = React.useState(false);

    const [modal, setModal] = useState<IModel | null>(null);

    const {deleteModel} = useModelHook();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        handleClose();
        await deleteModel(model.id);
    };

    const active = useMemo(() => model.order === 0, [model]);

    return (
        <Paper elevation={ 3 }>
            <Box sx={ {
                background: model.order === 0 ? loading ? "#ccc" : "#caf1ca" : "",
                p: 2,
                transition: "all 0.4s ease"
            } }>
                <Grid container>
                    <Grid item xs={ 12 } lg={ 10 }>
                        <Typography variant="h6">
                            { model.name } -{ " " }
                            { date.format(new Date(model.created_at), "YYYY-MM-DD") }
                        </Typography>
                        <Typography>{ model.description }</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={ 10 }
                        lg={ 2 }
                        sx={ {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            gap: {xs: 0, lg: 2},
                        } }
                    >
                        <Typography variant="h4">
                            { model.is_dl ? (
                                <Chip color="primary" label="DL"/>
                            ) : (
                                <Chip color="warning" label="ML"/>
                            ) }
                        </Typography>
                        <IconButton onClick={ handleClickOpen }>
                            <DeleteIcon color="error"/>
                        </IconButton>
                        <IconButton onClick={ () => setModal(model) }>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onMouseDown={ handleClick } sx={ {cursor: "grab"} }>
                            <MenuIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Dialog open={ open } onClose={ handleClose } fullWidth={ true }>
                    <DialogTitle>
                        { active ? "You cannot delete active model" : "Are you sure?" }
                    </DialogTitle>

                    <DialogActions>
                        { !active ? (
                            <>
                                <Button onClick={ handleSubmit }>Yes</Button>
                                <Button onClick={ handleClose } autoFocus>
                                    No
                                </Button>
                            </>
                        ) : (
                            <Button onClick={ handleClose } autoFocus>
                                Ok
                            </Button>
                        ) }
                    </DialogActions>
                </Dialog>

                { cloneElement(
                    <Modal
                        model={ modal ? modal : false }
                        handleClose={ () => setModal(null) }
                        setLoading={ setLoading }
                    />
                ) }
            </Box>
        </Paper>
    );
};
