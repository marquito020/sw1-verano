import { FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";

import CreatableSelect from "react-select/creatable";
import { ActionMeta } from "react-select";

import { RootState } from "../../../../redux/store";
import { PrivateRoutes } from "../../../../constants/routes";
import { EventCustomForm } from "../../../../interfaces/event.interface";
import { useAllPhotographers } from "../../../../hooks/usePhotographer.hook";
import { useAddEvent } from "../../../../hooks/useEvent.hook";
import { useAllUser } from "../../../../hooks/useUser.hook";
import { isValidEmail } from "../../../../utils/validEmail";

// const colourOptions = [
//   { value: "ocean", label: "Ocean" },
//   { value: "blue", label: "Blue" },
// ];

type OptionsType = {
  value: string;
  label: string;
};

// Option para el react-select  (ver: https://react-select.com/typescript)

function Add2EventForm() {
  // react-multi-select-component
  const [selected, setSelected] = useState<OptionsType[]>([]);
  const [photographersOptions, setPhotographersOptions] = useState<
    OptionsType[]
  >([]);

  //react-select
  const [selectedUsers, setSelectedUsers] = useState<OptionsType[]>([]);
  const [usersOptions, setUsersOptions] = useState<OptionsType[]>([]);

  const { addEvent } = useAddEvent();
  const { photographers } = useAllPhotographers();
  const { users } = useAllUser();

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    const photographersOptionValue: OptionsType[] = [];
    if (photographers) {
      photographers.forEach((photographer) => {
        photographersOptionValue.push({
          value: `${photographer.id}`,
          label: `${photographer.user.name}`,
        });
      });
      setPhotographersOptions(photographersOptionValue);
    }
  }, [photographers]);

  useEffect(() => {
    const usersOptionValue: OptionsType[] = [];
    if (users) {
      users.forEach((user) => {
        usersOptionValue.push({
          value: `${user.id}`,
          label: `${user.email}`,
        });
      });
      setUsersOptions(usersOptionValue);
    }
  }, [users]);

  const handleSubmit = async (e: FormEvent<EventCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const title = elements.title.value;
    const description = elements.description.value;
    const location = elements.location.value;
    const dateTime = new Date(elements.dateTime.value);
    // const photographersSelect = parseInt(elements.photographers.value);
    console.log("fotografos seleccionados", selected);
    console.log("usuarios seleccionados", selectedUsers);

    const dataPhotographers = [];
    const dataUsers = [];
    for (const element of selected) {
      dataPhotographers.push({ photographerId: parseInt(element.value) });
    }

    for (const element of selectedUsers) {
      if (!isValidEmail(element.label)) {
        setMessageError(`El email: ${element.label} no es un email valido`);
        return;
      }
      dataUsers.push({ email: `${element.label}`.trim() });
    }

    // console.log(dataPhotographers);
    // console.log(dataUsers);
    const toastId = toast.loading("Creando el evento...");
    try {
      const response = await addEvent({
        title,
        description,
        location,
        dateTime,
        qr: "",
        organizerId: user.organizer ? user.organizer.id : 0,
        photographers: dataPhotographers,
        invitations: dataUsers,
      });
      console.log("Response: ", response);
      if (response?.id) {
        setMessageError("");
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}`, {
          replace: true,
        });
        toast.success("Evento creado", { id: toastId });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al crear el evento", { id: toastId });
      } else {
        toast.error("Error al crear el evento", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al crear el evento", { id: toastId });
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white p-10 mt-14 xl:ml-5 rounded-lg shadow-lg w-full ">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Crear nuevo evento
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Ingrese los datos solicitados.
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-red-500">
            {messageError}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Titulo
              </dt>
              <input
                id="title"
                name="title"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Descripción
              </dt>
              <textarea
                name="description"
                id="description"
                cols={10}
                rows={5}
                className="mt-1 w-full py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              ></textarea>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Fotografos
              </dt>
              <MultiSelect
                options={photographersOptions}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                className="w-full sm:col-span-2 sm:mt-0 leading-6"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Invitaciones
              </dt>
              <CreatableSelect
                isMulti
                // options={usersOptions}
                placeholder="Ingrese los emails de sus invitados"
                defaultValue={selectedUsers}
                onChange={(
                  option: readonly OptionsType[],
                  actionMeta: ActionMeta<OptionsType>
                ) => {
                  // console.log(actionMeta);
                  // console.log(option);
                  // copio los elementos de "option" por que es readonly
                  const optionsChange = option.map((element) => ({
                    ...element,
                  }));
                  setSelectedUsers(optionsChange);
                }}
                className="w-full sm:col-span-2 sm:mt-0 leading-6"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ubicación
              </dt>
              <input
                id="location"
                name="location"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Fecha y hora
              </dt>
              <input
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="gap-2 text-white">
              <button
                type="submit"
                className="bg-sky-500 px-4 py-2 rounded-md hover:bg-sky-600 mr-2"
              >
                Agregar
              </button>
              <button
                onClick={() =>
                  navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}`, {
                    replace: true,
                  })
                }
                className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-md "
              >
                Cancelar
              </button>
            </div>
          </dl>
        </form>
      </div>
    </>
  );
}

export default Add2EventForm;
