import { Redirect } from "react-router-dom";

export const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return window.location="/"
    }
        return children
};