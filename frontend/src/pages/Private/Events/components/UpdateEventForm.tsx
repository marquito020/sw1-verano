import { FormEvent, useState } from "react";
import moment from "moment-timezone";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { PrivateRoutes } from "../../../../constants/routes";
import { useGetEvent, useUpdateEvent } from "../../../../hooks/useEvent.hook";
import { EventCustomForm } from "../../../../interfaces/event.interface";

function UpdateEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventFound } = useGetEvent(parseInt(`${id}`));
  const { updateEvent } = useUpdateEvent(parseInt(`${id}`));
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<EventCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const title = elements.title.value;
    const description = elements.description.value;
    const location = elements.location.value;
    const dateTime = new Date(elements.dateTime.value);

    try {
      const toastId = toast.loading("Cargando...");
      const response = await updateEvent({
        title,
        description,
        location,
        dateTime,
      });
      if (response?.id) {
        setMessageError("");
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}`);
        toast.success("Datos actualizados correctamente", { id: toastId });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al actualizar los datos", { id: toastId });
      } else {
        toast.remove(toastId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white p-10 mt-16 xl:ml-5 rounded-lg shadow-lg w-full">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Update data
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
                Title
              </dt>
              <input
                defaultValue={eventFound?.title}
                id="title"
                name="title"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <textarea
                defaultValue={eventFound?.description}
                name="description"
                id="description"
                cols={10}
                rows={5}
                className="mt-1 w-full py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              ></textarea>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Location
              </dt>
              <input
                defaultValue={eventFound?.location}
                id="location"
                name="location"
                type="text"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date Time
              </dt>
              <input
                defaultValue={
                  eventFound?.dateTime
                    ? moment
                        .utc(eventFound?.dateTime)
                        .tz("America/La_Paz")
                        .format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                className="mt-1 py-1 px-2 outline-none border border-gray-500 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
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
                  navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}`, {
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

export default UpdateEventForm;
