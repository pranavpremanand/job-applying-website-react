import { Navigate } from "react-router-dom";

export const PageTwoProtectRoute = (props)=>{
    if(localStorage.getItem('user')){
        return props.children
    }else{
        return <Navigate to={'/'}/>
    }
}