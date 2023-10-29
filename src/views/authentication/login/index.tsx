import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {LoginForm} from "@/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAuthHook} from "@/hooks/authorization/auth.hook";
import Loader from "@/components/loading";

export const Login = () => {

    const {login, check} = useAuthHook()

    const [permission, setPermission] = useState(false)

    useEffect(() => {
        (async function () {
            setPermission(!(await check(false)))
        }())
    }, [])

    const {register, handleSubmit, formState: {errors},} = useForm<LoginForm>({
        resolver: yupResolver(
            yup.object({
                username: yup.string().required().min(2),
                password: yup.string().required().min(2),
            })
        )
    })

    const onSubmit = async (data) => await login(data);

    if (permission)
        return (
            <Box sx={ {height: "98vh", m: 0, display: "flex", alignItems: "center", justifyContent: "center"} }>
                <Box sx={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } }>
                    <Avatar sx={ {m: 1, bgcolor: 'secondary.main'} }>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Kirish
                    </Typography>
                    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={ {mt: 1} }>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            error={ !!errors.username }
                            { ...register("username") }
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={ !!errors.password }
                            { ...register("password") }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={ {mt: 3, mb: 2} }
                        >
                            Kirish
                        </Button>

                    </Box>
                </Box>
            </Box>
        )

    return <Loader />
}