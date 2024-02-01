import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

import { PrivateRoutes } from "../../../../constants/routes";
import { useAllEvents, useDeleteEvent } from "../../../../hooks/useEvent.hook";
import { eventsUrl } from "../../../../services/event.service";

function EventsList() {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { events, isLoading, error } = useAllEvents();
  const { deleteEvent } = useDeleteEvent();

  if (isLoading) return <div>Loading users...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  return (
    <>
      <Toaster />
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <div className="flex justify-between mb-2">
          <div>
            <h1 className="text-gray-900 text-base font-medium">Eventos</h1>
            <p className="text-gray-500">Hay {events?.length} eventos</p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 px-3 py-4 border-b border-gray-200">
          <h5>ID</h5>
          <h5>Título</h5>
          <h5>QR</h5>
          <h5>Fecha</h5>
          {/* <h5>Location</h5> */}
          <h5>Acciones</h5>
        </div>
        {events?.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4 rounded-lg text-sm"
          >
            <div>
              <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
              <p>{event.id}</p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Título</h5>
              <p>{event.title}</p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">QR</h5>
              {/* <p className="break-words">{event.description}</p> */}

              <img
                src={event.qr}
                alt={event.title}
                className="h-full w-full rounded-md  object-cover object-center lg:h-20 lg:w-20"
              />
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Fecha</h5>
              <p>
                {new Date(event.dateTime).toLocaleDateString("en-us", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {/* <div>
      <h5 className="md:hidden font-bold mb-2">Location</h5>
      <p>{event.location}</p>
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
                    `${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}/${event.id}`
                  );
                }}
                className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiEditLine className="text-gray-700" />
              </button>
              <button
                onClick={() => {
                  // deleteEvent(event.id ? event.id : 0)
                  toast((t) => (
                    <div>
                      <h3>Esta seguro de eliminar el vento?</h3>
                      <br />
                      <div className="flex justify-between gap-2">
                        <button
                          onClick={async () => {
                            deleteEvent(event.id ? event.id : 0);
                            await mutate(eventsUrl);
                            toast.success("Evento eliminado", {
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
    </>
  );
}

export default EventsList;
