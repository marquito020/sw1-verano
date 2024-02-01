import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiEditLine, RiEyeLine } from "react-icons/ri";

import { PrivateRoutes } from "../../../../constants/routes";
import {
  useAllPhotographers,
  useDeletePhotographer,
} from "../../../../hooks/usePhotographer.hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import ShowPhotographer from "./ShowPhotographer";

function PhotographersList() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { photographers } = useAllPhotographers();
  const { deletePhotograpger } = useDeletePhotographer();

  console.log(photographers);

  return (
    <>
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <div className="flex justify-between mb-2">
          <div>
            <h1 className="text-gray-900 text-base font-medium">Fotografos</h1>
            <p className="text-gray-500">
              Hay {photographers?.length} fotografos
            </p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 px-3 py-4 border-b border-gray-200 text-gray-900">
          <h5>ID</h5>
          <h5>Foto</h5>
          <h5>Nombre</h5>
          <h5>Correo electronico</h5>
          {/* <h5>Tipo</h5> */}
          {/* <h5>Experiencia</h5>
    <h5>Tarifa</h5> */}
          <h5 className="text-center">Actions</h5>
        </div>
        {photographers?.map((photographer) => (
          <div
            key={photographer.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4 rounded-lg text-sm"
          >
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
              <p>{photographer.id}</p>
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2 mt-2">Foto</h5>
              <img
                draggable={false}
                src={photographer.user.imageSecureUrl}
                alt={photographer.user.name}
                className="h-full w-full rounded-md  object-cover object-center lg:h-20 lg:w-20"
              />
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Nombre</h5>
              <p className="break-words">{photographer.user.name}</p>
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Correo electronico</h5>
              <p className="break-words">{photographer.user.email}</p>
            </div>
            {/* <div className="col-span-1">
        <h5 className="md:hidden font-bold mb-2">Tipo</h5>
        <p>{photographer.type}</p>
      </div> */}
            {/* <div>
        <h5 className="md:hidden font-bold mb-2">Experince</h5>
        <p>
          {photographer.experince == 1
            ? `${photographer.experince} year`
            : photographer.experince
            ? `${photographer.experince} years`
            : "---------"}
        </p>
      </div> */}
            {/* <div>
        <h5 className="md:hidden font-bold mb-2">Tarifa</h5>
        <p>{photographer.rate} $</p>
      </div> */}

            <div className="md:flex md:justify-center gap-3 md:p-2 xl:mb-0 sm:mb-2 mr-2">
              <h5 className="md:hidden font-bold mb-2">Acciones</h5>
              {/* <button
                onClick={() => console.log("click show")}
                className="text-base rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiEyeLine className="text-gray-700" />
              </button> */}
              <ShowPhotographer  
                photographerId={photographer.id ? photographer.id : 0}
              />

              {user.rol.id == 1 && (
                <>
                  <button
                    onClick={() => {
                      navigate(
                        `${PrivateRoutes.PRIVATE}${PrivateRoutes.PHOTOGRAPHERS}/${photographer.id}`
                      );
                    }}
                    className="text-base rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
                  >
                    <RiEditLine className="text-gray-700" />
                  </button>
                  <button
                    onClick={() =>
                      deletePhotograpger(photographer.id ? photographer.id : 0)
                    }
                    className="text-base rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
                  >
                    <RiDeleteBin6Line className="text-gray-700" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PhotographersList;
