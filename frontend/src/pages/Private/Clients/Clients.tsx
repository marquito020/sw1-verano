import { lazy } from "react";

const ClientsList = lazy(() => import("./components/ClientsList"));
const AddClientForm = lazy(() => import("./components/AddClientForm"));

function Clients() {
  return (
    <div className="gap-2">
      <AddClientForm />
      <ClientsList />
    </div>
  );
}

export default Clients;
