import { lazy } from "react";

const OrganizersList = lazy(() => import("./components/OrganizersList"));
const AddOrganizerForm = lazy(() => import("./components/AddOrganizerForm"));

function Organizers() {
  return (
    <div className="gap-2">
      <AddOrganizerForm />
      <OrganizersList />
    </div>
  );
}

export default Organizers;
