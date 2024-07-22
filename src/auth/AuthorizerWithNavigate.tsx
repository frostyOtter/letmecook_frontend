//auth0 provider with navigate
import React from "react";
// import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode;
}

const AuthorizerWithNavigate = ({children}:Props) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

    if (!domain || !clientId || !redirectUri) {
        throw new Error("Unable to init authorizer.");
    }
    // const onRedirectCallback = (appState?: AppState, user?: User) => {
    const onRedirectCallback = (user?: User) => {
        console.log("USER", user);
    }
    return (
        <Auth0Provider
        domain = {domain}
        clientId = {clientId}
        authorizationParams={{redirect_uri: redirectUri}}
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default AuthorizerWithNavigate;
