import React from 'react'
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from "react-redux"
import { setRoute } from "../../features/routes/routesSlice"

export const Navbar = () => {
    const route = useSelector((state:RootState) => state.route.currentRoute);
    const dispatch = useDispatch();
    console.log("Current route:", route);
    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-center gap-6 py-4 bg-violet-200 *:hover:underline *:hover:cursor-pointer *:leading-8">
            <button onClick={() => dispatch(setRoute('drafts'))}>Drafts</button>
            <button onClick={() => dispatch(setRoute('/'))}>Log Form</button>
            <button onClick={() => dispatch(setRoute('log-table'))}>Log table</button>
        </nav>
    )
}