import { useLocation, Navigate, Outlet, NavigationType } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = ({ allowedRoles }) => {
    // narazie bedziemy tu sprawdziali czy user jest zalogowany czy nie
    const { auth } = useAuth();
    const location = useLocation();


    return(
        // sprawdzenie czy tablica ze wzroconymi rolami posiada potrzebne role
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/unauthorized"  state= {{ from: location}} replace />
            // endpoint, na ktory zostanie przekierowany user po próbie wejscia na niedostepny rout
            : <Navigate to ="/login" state= {{ from: location}} replace />
    );
}

export default RequireAuth;