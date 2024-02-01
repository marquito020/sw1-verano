import { lazy } from "react";

const AddUserForm = lazy(() => import("./components/AddUserForm"));
const UsersList = lazy(() => import("./components/UsersList"));

function Users() {
  return (
    <div className="gap-2">
      {/* <AddUserForm /> */}
      <UsersList />
    </div>
  );
}

export default Users;
