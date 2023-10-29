import {Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {IPowerUser, LoginForm} from "@/types";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {Visibility, VisibilityOff} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {usePowerUserHook} from "@/hooks/poweruser/poweruser.hook";


export const UserItem: React.FC<{ powerUser: IPowerUser }> = ({powerUser}) => {

    const [showPassword, setShowPassword] = useState(false)

    const {updatePowerUsers, createOrUpdatePowerUser, deletePowerUsers} = usePowerUserHook()

    const {register, handleSubmit, reset, formState: {errors},} = useForm<LoginForm>({
        resolver: yupResolver(
            yup.object({
                username: yup.string().required().min(2),
            })
        )
    })

    const onSubmit = async data => {
        const userData = {...powerUser, ...data}
        if (data.password.trim() === "") {
            return await updatePowerUsers(userData)
        }
        await createOrUpdatePowerUser(userData, true)
        reset()
    }

    return (
        <Grid container columnSpacing={ 2 } pt={ 2 } component="form" onSubmit={ handleSubmit(onSubmit) }>
            <Grid item xs={ 4 }>
                <TextField
                    error={ !!errors.username }
                    { ...register("username") }
                    defaultValue={ powerUser ? powerUser.username : "" }
                    sx={ {width: "100%"} }
                    variant="standard"
                    placeholder={ !!errors.password ? "Username is required" : "Username" }
                />
            </Grid>
            <Grid item xs={ 4 }>
                <TextField
                    sx={ {width: "100%"} }
                    defaultValue={ "" }
                    { ...register("password") }
                    variant="standard"
                    placeholder={ "Password" }
                    type={ showPassword ? "text" : "password" }
                    InputProps={ {
                        endAdornment: <InputAdornment
                            sx={ {cursor: "pointer"} }
                            onClick={ () => setShowPassword(prev => !prev) }
                            position="start">{ showPassword ? <VisibilityOff/> : <Visibility/> }</InputAdornment>,
                    } }
                />
            </Grid>
            <Grid item xs={ 4 }>
                <IconButton type="submit">
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() => deletePowerUsers(powerUser.id)}>
                    <DeleteIcon/>
                </IconButton>

            </Grid>
        </Grid>
    )
}
