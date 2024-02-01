import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiEditLine, RiEyeLine } from "react-icons/ri";

import { useAllUser, useDeleteUser } from "../../../../hooks/useUser.hook";
import { PrivateRoutes } from "../../../../constants/routes";

function UsersList() {
  const navigate = useNavigate();
  const { users, isLoading, error } = useAllUser();
  const { deleteUser } = useDeleteUser();

  if (isLoading) return <div>Loading users...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  // console.log("re-render");

  return (
    <>
      <div className="bg-white  p-8 rounded-xl shadow-md mt-20">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-gray-900 text-base font-medium">Usuarios</h1>
          <p className="text-gray-500">Hay {users?.length} usuarios</p>
        </div>

      </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 px-3 border-b border-gray-200 text-gray-900">
          <h5>ID</h5>
          <h5>Nombre</h5>
          <h5>Correo electronico</h5>
          <h5>Acciones</h5>
        </div>
        {users?.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 items-center border-b border-gray-200 transition-colors mb-4 rounded-lg text-sm"
          >
            <div>
              <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
              <p>{user.id}</p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Name</h5>
              <p>{user.name}</p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Email address</h5>
              <p className="break-words">{user.email}</p>
            </div>

            <div className="md:flex md:justify-center gap-3 md:p-2 xl:mb-0 sm:mb-2 mr-2">
              <h5 className="md:hidden font-bold mb-2">Acctions</h5>
              <button
                onClick={() => console.log("click show")}
                className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiEyeLine className="text-gray-700" />
              </button>
              <button
                onClick={() => {
                  navigate(
                    `${PrivateRoutes.PRIVATE}${PrivateRoutes.USERS}/${user.id}`
                  );
                }}
                className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiEditLine className="text-gray-700" />
              </button>
              <button
                onClick={() => deleteUser(user.id ? user.id : 0)}
                className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiDeleteBin6Line className="text-gray-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UsersList;
