import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useEffect } from "react";
import { Buffer } from "buffer";
import uuid from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthProvider";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: "818849270528-1eak9ragm35e0dt2e9fte3i2mg36nkjo.apps.googleusercontent.com",
    });
    const { refresh } = useAuth();

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            if (!id_token) {
                alert("An error occurred!, no id_token")
                return
            }
            const jwt = id_token.split(".").map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString())
            const user = JSON.parse(jwt[1]);
            const data = {
                id: uuid.v4(),
                name: user.name,
                email: user.email,
                isAdmin: true
            }
            AsyncStorage.setItem("user", JSON.stringify(data)).then(() => refresh()).catch(console.log)
        }
    }, [response]);

    return { request, response, signInWithGoogle: promptAsync };
}

export function useFacebookSignIn() {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        expoClientId: "904956083494377",
    });
    const { refresh } = useAuth();

    useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
            if (authentication?.accessToken){
                fetch(`https://graph.facebook.com/me?access_token=${authentication.accessToken}&fields=id,name,email`)
                    .then(res => res.json())
                    .then(data => {
                        const user = {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            isAdmin: true
                        }
                        AsyncStorage.setItem("user", JSON.stringify(user)).then(() => refresh()).catch(console.log)
                    }).catch(console.log)
            } else alert("Sorry, failed to authenticate")
        }
    }, [response]);

    return { request, response, signInWithFacebook: promptAsync };
}
