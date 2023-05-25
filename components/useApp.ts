import { useEffect, useState } from "react";
import {getApp}  from "realm-web"
import { App } from "realm-web";

export function useApp(){
    const [app, setApp] = useState<App>( )
    useEffect (() => {
        if (process.env.NEXT_PUBLIC_APP_ID )
        setApp(getApp(process.env.NEXT_PUBLIC_APP_ID))
        else console.error("APP ID is undefined in .env.local")
    }, [])
    return app
}