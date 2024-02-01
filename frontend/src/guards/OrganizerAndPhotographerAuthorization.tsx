import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { PrivateRoutes } from "../constants/routes";

function OrganizerAndPhotographerAuthorization() {
  const user = useSelector((state: RootState) => state.user);

  if (user.rol.id == 1 || user.rol.id == 2 || user.rol.id == 3) {
    return <Outlet />;
  }

  return <Navigate to={PrivateRoutes.PRIVATE} replace={true} />;
}

export default OrganizerAndPhotographerAuthorization;
