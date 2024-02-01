import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const PhotographersList = lazy(() => import("./components/PhotographersList"));
const AddPhotographerForm = lazy(
  () => import("./components/AddPhotographerForm")
);

function Photographers() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="gap-2"> 
      {user.rol.id == 1 && <AddPhotographerForm />}
      <div className={`${user.rol.id == 1 ? "" : "mt-20"}`}>
        <PhotographersList />
      </div>
    </div>
  );
}

export default Photographers;
