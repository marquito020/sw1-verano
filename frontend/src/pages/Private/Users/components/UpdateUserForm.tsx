import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUpdateUser, useGetUser } from "../../../../hooks/useUser.hook";
import { UserCustomForm } from "../../../../interfaces/user.interface";
import { PrivateRoutes } from "../../../../constants/routes";

function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userFound } = useGetUser(parseInt(`${id}`));
  const { updateUser } = useUpdateUser(parseInt(`${id}`));
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<UserCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const name = elements.name.value;
    const email = elements.email.value;
    const phone = elements.phone.value;
    const address = elements.address.value;
    try {
      const response = await updateUser({
        name,
        email,
        phone,
        address,
      });
      if (response?.email) {
        setMessageError("");
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.USERS}`);
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-10 mt-16 xl:ml-5 rounded-lg shadow-lg w-full">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Updated data
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
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
              defaultValue={userFound?.name}
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
              defaultValue={userFound?.email}
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
              defaultValue={userFound?.phone}
              id="phone"
              name="phone"
              type="text"
              className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Direccion
            </dt>
            <input
              defaultValue={userFound?.phone}
              id="address"
              name="address"
              type="text"
              className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            />
          </div>

          <div className="gap-2 text-white">
            <button
              onClick={() =>
                navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.USERS}`, {
                  replace: true,
                })
              }
              className="bg-sky-500 px-4 py-2 rounded mr-2 "
            >
              Atras
            </button>
            <button type="submit" className="bg-green-500 px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </dl>
      </form>
    </div>
  );
}

export default UpdateUserForm;
