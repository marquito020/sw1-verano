import { lazy } from "react";
import { Link } from "react-router-dom";

import { RiAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const EventsList = lazy(() => import("./components/EventsList"));
const OrganizerEventList = lazy(
  () => import("./components/OrganizerEventList")
);
const AddEventForm = lazy(() => import("./components/AddEventForm"));

function Events() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="gap-2">
      <div className="bg-white py-3 px-8 rounded-lg border border-gray-200 mb-4 mt-20 shadow-md">
        <div className=" inset-0 flex items-start justify-between mb-2 mt-2">
          <div>
            <h1 className="text-gray-900 text-base font-medium mt-1">
              Eventos
            </h1>
          </div>
          <div>
            <Link to="add">
              <button
                type="button"
                className="flex items-center gap-1  rounded-md bg-sky-500  text-white font-semibold  px-4 py-2 text-sm hover:bg-sky-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <RiAddLine className="text-white font-base text-lg" />
                Agregar
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <AddEventForm /> */}
      {user.rol.id == 1 ? <EventsList /> : <OrganizerEventList />}
    </div>
  );
}

export default Events;
