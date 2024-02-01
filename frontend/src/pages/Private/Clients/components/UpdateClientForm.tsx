import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { RiImageAddLine } from "react-icons/ri";

import { PrivateRoutes } from "../../../../constants/routes";
import {
  useGetClient,
  useUpdateClient,
} from "../../../../hooks/useClient.hook";
import { UserCustomForm } from "../../../../interfaces/user.interface";

function UpdateClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientFound } = useGetClient(parseInt(`${id}`));
  const { updateClient } = useUpdateClient(parseInt(`${id}`));

  const [image, setImage] = useState<File | null>(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);

      // Se Libera la URL cuando el componente se desmonte o cuando cambie la imagen
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [image]);

  const handleSubmit = async (e: FormEvent<UserCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const formData = new FormData();
    formData.append("name", elements.name.value);
    formData.append("email", elements.email.value);
    formData.append("phone", elements.phone.value);
    formData.append("address", elements.address.value);
    formData.append("image", image ? image : "");

    const toastId = toast.loading("Cargando...");
    try {
      const response = await updateClient(formData);
      if (response?.id) {
        setMessageError("");
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.CLIENTS}`);
        toast.success("Datos actualizados correctamente", { id: toastId });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al actualizar los datos", { id: toastId });
      } else {
        toast.error("Error al actualizar los datos", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar los datos", { id: toastId });
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white p-10 mt-16 xl:ml-5 rounded-lg shadow-lg w-full">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Actualización de datos
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Datos personales
          </p>
          <img
            className="h-64 rounded-md"
            src={clientFound?.user.imageSecureUrl}
            alt={clientFound?.user.name}
          />
          <p className="mt-1 max-w-2xl text-sm leading-6 text-red-500">
            {messageError}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nombre completo
              </dt>
              <input
                required={true}
                defaultValue={clientFound?.user.name}
                id="name"
                name="name"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Correo electronico
              </dt>
              <input
                required={true}
                defaultValue={clientFound?.user.email}
                id="email"
                name="email"
                type="email"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefono
              </dt>
              <input
                required={true}
                defaultValue={clientFound?.user.phone}
                id="phone"
                name="phone"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Dirección
              </dt>
              <input
                defaultValue={clientFound?.user.address}
                id="address"
                name="address"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Foto
              </dt>

              <div className="relative  ">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setImage(
                      e.target.files ? (e.target.files[0] as File) : null
                    )
                  }
                  id="image"
                  name="image"
                  type="file"
                  className="w-full py-2 px-10 rounded-md outline-none border border-gray-300"
                />
                <RiImageAddLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-600" />
              </div>
              <br />
              <div className="relative ml-56 mt-1 py-1 px-2 outline-none  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {image && (
                  <div className="flex justify-center">
                    <img
                      className="h-40 max-w-full rounded-lg"
                      src={URL.createObjectURL(image)}
                      alt="Foto de perfil"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="gap-2 text-white">
              <button
                type="submit"
                className="bg-sky-500 hover:sky-600 px-4 py-2 mr-2 rounded"
              >
                Guardar
              </button>
              <button
                onClick={() =>
                  navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.CLIENTS}`, {
                    replace: true,
                  })
                }
                className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white  px-4 py-2 rounded"
              >
                Atras
              </button>
            </div>
          </dl>
        </form>
      </div>
    </>
  );
}

export default UpdateClientForm;
