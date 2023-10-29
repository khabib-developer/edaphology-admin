import React, {useState} from "react";
import {IPowerUser, LoginForm} from "@/types";
import {Box, Button, Paper, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import {usePowerUserHook} from "@/hooks/poweruser/poweruser.hook";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAppStore} from "@/store/index.store";

export const CreateUser = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {createOrUpdatePowerUser, updatePowerUsers, deletePowerUsers} = usePowerUserHook()
    const {setError} = useAppStore()

    const {register, handleSubmit, reset, formState: {errors},} = useForm<LoginForm>({
        resolver: yupResolver(
            yup.object({
                username: yup.string().required().min(2),
                password: yup.string().required().min(2),
            })
        )
    })

    const onSubmit = async (data) => {
        await createOrUpdatePowerUser(data)
        reset()
    }

    return (
        <Paper sx={ {width: "60%", mt: 2} } elevation={ 3 }>
            <Box component="form" onSubmit={ handleSubmit(onSubmit) } py={ 1 } px={ 3 } pt={ 2 }>
                <Box>
                    <TextField
                        error={!!errors.username}
                        { ...register("username") }
                        sx={ {width: "100%"} }
                        variant="standard"
                        placeholder={ !!errors.password ? "Username is required" : "Username" }
                    />
                </Box>
                <Box pt={ 2 }>
                    <TextField
                        error={!!errors.password}
                        sx={ {width: "100%"} }
                        { ...register("password") }
                        variant="standard"
                        placeholder={ !!errors.password?"Password is required":"Password" }
                        type={ showPassword ? "text" : "password" }
                        InputProps={ {
                            endAdornment: <InputAdornment sx={ {cursor: "pointer"} }
                                                          onClick={ () => setShowPassword(prev => !prev) }
                                                          position="start">{ showPassword ? <VisibilityOff/> :
                                <Visibility/> }</InputAdornment>,
                        } }
                    />
                </Box>
                <Box sx={ {display: "flex", justifyContent: "end", pt: 1} }>
                    <Button type="submit">
                        Yaratish
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}