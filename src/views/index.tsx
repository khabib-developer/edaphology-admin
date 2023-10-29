import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import {Login} from "@/views/authentication/login";
import {AdminLayout} from "@/views/admin";
import {useAppStore} from "@/store/index.store";
import {useAuthHook} from "@/hooks/authorization/auth.hook";


const Pages = () => {

    const {user} = useAppStore()

    const {isAdmin} = useAuthHook()

    return (
        <BrowserRouter>
            <Switch>
                {
                    user && <>
                       <Route path="/admin" children={ <AdminLayout/> }/>
                       <Route exact path="*">
                          <Redirect to={ !isAdmin() ? "/admin/database":"/admin/model" }/>
                       </Route>
                    </>
                }

                {
                    !user && <>
                       <Route path="/auth/login" children={ <Login/> }/>
                    </>
                }

                <Route exact path="*">
                    <div>404</div>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Pages;