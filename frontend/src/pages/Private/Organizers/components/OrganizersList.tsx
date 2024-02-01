import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

import {
  useAllOrganizers,
  useDeleteOrganizer,
} from "../../../../hooks/useOrganizer.hook";
import { PrivateRoutes } from "../../../../constants/routes";

function OrganizersList() {
  const navigate = useNavigate();
  const { organizers, isLoading, error } = useAllOrganizers();
  const { deleteOrganizer } = useDeleteOrganizer();

  if (isLoading) return <div>Loading users...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg ">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-gray-900 text-base font-medium">Organizadores</h1>
          <p className="text-gray-500">
            Hay {organizers?.length} organizadores
          </p>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 px-3 py-4 border-b border-gray-200 text-gray-900">
        <h5>ID</h5>
        <h5>Foto</h5>
        <h5>Nombre</h5>
        <h5>Correo electronico</h5>
        {/* <h5>Sitio web</h5> */}
        <h5>Acciones</h5>
      </div>
      {organizers?.map((organizer) => (
        <div
          key={organizer.id}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 rounded-lg border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4  text-sm"
        >
          <div>
            <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
            <p>{organizer.id}</p>
          </div>
          <div>
            <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
            <img
              draggable={false}
              src={organizer.user.imageSecureUrl}
              alt={organizer.user.name}
              className="h-full w-full rounded-md  object-cover object-center lg:h-20 lg:w-20"
            />
          </div>
          <div>
            <h5 className="md:hidden font-bold mb-2">Nombre</h5>
            <p className="mt-2">{organizer.user.name}</p>
          </div>
          <div>
            <h5 className="md:hidden font-bold mb-2">Correo electronico</h5>
            <p className="break-words">{organizer.user.email}</p>
          </div>
          {/* <div>
            <h5 className="md:hidden font-bold mb-2">Sitio web</h5>
            <p>{organizer.webSite ? organizer.webSite : "----------------"}</p>
          </div> */}

          <div className="md:flex md:justify-center gap-3 md:p-2 xl:mb-0 sm:mb-2 mr-2">
            <h5 className="md:hidden font-bold mb-2">Acciones</h5>
            <button
              onClick={() => console.log("click show")}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <RiEyeLine className="text-gray-700" />
            </button>
            <button
              onClick={() => {
                navigate(
                  `${PrivateRoutes.PRIVATE}${PrivateRoutes.ORGANIZERS}/${organizer.id}`
                );
              }}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <RiEditLine className="text-gray-700" />
            </button>
            <button
              onClick={() => {
                toast((t) => (
                  <div>
                    <h3>Esta seguro de eliminar al usuario?</h3>
                    <br />
                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => {
                          deleteOrganizer(organizer.id ? organizer.id : 0);
                          toast.success("Usuario eliminado", {
                            id: t.id,
                            duration: 3000,
                          });
                        }}
                        className="rounded-lg bg-red-500 text-white px-3 py-2 hover:bg-red-600"
                      >
                        Si, eliminar
                      </button>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="rounded-lg bg-gray-200 text-gray-800 px-3 py-2 hover:bg-gray-300"
                      >
                        No, Cancelar
                      </button>
                    </div>
                  </div>
                ));
              }}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <RiDeleteBin6Line className="text-gray-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrganizersList;
