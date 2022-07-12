import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)
    if (isLoading)
    {
        return <Loader/>
    }
    return (
            isAuth
            ? <Routes>
                {
                    privateRoutes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}>
                    </Route>
                    )
                }
            </Routes>
            :
                <Routes>{
                    publicRoutes.map((route, index) =>
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                                exact={route.exact}>
                            </Route>
                        )
                    }
                </Routes>
    );
};

export default AppRouter;