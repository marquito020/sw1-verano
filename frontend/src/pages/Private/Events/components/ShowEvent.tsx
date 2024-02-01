import { FormEvent } from "react";
import moment from "moment-timezone";
import { useParams, useNavigate } from "react-router-dom";

import { saveAs } from "file-saver";

import { PrivateRoutes } from "../../../../constants/routes";
import { useGetEvent } from "../../../../hooks/useEvent.hook";
import { EventCustomForm } from "../../../../interfaces/event.interface";

function ShowEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventFound } = useGetEvent(parseInt(`${id}`));

  const handleSubmit = async (e: FormEvent<EventCustomForm>) => {
    e.preventDefault();
    console.log("hola");
  };

  return (
    <>
      <div className="bg-white p-10 mt-16 xl:ml-5 rounded-lg shadow-lg w-full">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Evento : {eventFound?.title}
          </h3>
          <img src={eventFound?.qr} alt="QR del evento" />
          <button
            onClick={() => {
              //url, FileName
              saveAs(`${eventFound?.qr}`, eventFound?.title);
            }}
            type="button"
            className="mt-1 text-sm text-gray-500"
          >
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Click aqui para descargar
            </span>
          </button>
          {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p> */}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Title
              </dt>
              <input
                disabled={true}
                defaultValue={eventFound?.title}
                id="title"
                name="title"
                type="text"
                className="mt-1 py-1 px-2 outline-none bg-gray-200 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <textarea
                disabled={true}
                defaultValue={eventFound?.description}
                name="description"
                id="description"
                cols={10}
                rows={5}
                className="mt-1 w-full py-1 px-2 outline-none bg-gray-200 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              ></textarea>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Location
              </dt>
              <input
                disabled={true}
                defaultValue={eventFound?.location}
                id="location"
                name="location"
                type="text"
                className="mt-1 py-1 px-2 outline-none bg-gray-200 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date Time
              </dt>
              <input
                disabled={true}
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
                className="mt-1 py-1 px-2 outline-none bg-gray-200 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              />
            </div>

            <div className="gap-2 text-white">
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

export default ShowEvent;
