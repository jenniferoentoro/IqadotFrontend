import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const RequireAuth = () => {
    const auth = localStorage.getItem("claims")

    if (auth == null){
        return <Navigate to={"/login"} replace={true} />
    }else{
        return <Outlet />
    }

}

export default RequireAuth;
