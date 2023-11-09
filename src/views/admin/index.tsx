import AppBar from "@/views/admin/components/appBar";
import React, {useEffect, useState} from "react";
import Sidebar from "@/views/admin/components/sidebar";
import {Box} from "@mui/material";
import {Redirect, Route, useLocation} from "react-router-dom";
import Model from "@/views/admin/components/model";
import {Module} from "@/views/admin/components/module";
import {Database} from "@/views/admin/components/database";
import {useAppStore} from "@/store/index.store";
import {useAuthHook} from "@/hooks/authorization/auth.hook";
import Loader from "@/components/loading";
import Users from "@/views/admin/components/users";
import {DatabaseTable} from "@/views/admin/components/database/table";

export const AdminLayout = () => {
    const [open, setOpen] = useState<boolean>(false)

    const location = useLocation()

    const [permission, setPermission] = useState(false)

    const {check, isAdmin, isPower} = useAuthHook()

    useEffect(() => {
        (async function () {
            setPermission(await check(true))
        }())
    }, [])

    useEffect(() => {
        localStorage.setItem('location', location.pathname)
    }, [location])

    if (permission)
        return (
            <Box sx={ {display: "flex", minHeight: "100vh"} }>
                <AppBar open={ open } setOpen={ setOpen }/>
                <Sidebar open={ open } setOpen={ setOpen }/>
                <Box sx={ {mt: '64px', p: 3, width:"100%",height:"calc(100vh-112px) !important",} }>
                    {

                        <>
                           <Route path={ '/admin/model' }>
                              <Model />
                           </Route>
                           <Route path={ '/admin/module' }>
                              <Module/>
                           </Route>
                           <Route path={ '/admin/users' }>
                              <Users />
                           </Route>
                        </>
                    }
                    {
                        (isPower() || isAdmin )&&
                        <>
                           <Route path={ '/admin/database' }>
                              <Database/>
                           </Route>
                           <Route path={ '/admin/table/:path' }>
                              <DatabaseTable/>
                           </Route>
                        </>

                    }

                </Box>

            </Box>
        )

    return <Loader />
}

// [7608167.238671773, 4908957.917046178]  [7669859.814263282, 4958395.798040829]