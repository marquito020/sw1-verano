import { toast, Toaster } from "react-hot-toast";

import { useGetEventsClient } from "../../../hooks/useEventClient.hook";
import { RiCameraLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addToCart, removePhoto } from "../../../redux/states/cart.state";

function PhotosSale() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const { eventsClient, isLoading, error } = useGetEventsClient(
    user.client ? user.client.id : 0
  );

  console.log(eventsClient);

  if (isLoading) return <div>Loading photos...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  if (eventsClient?.length == 0)
    return <div>No participo en ningun evento</div>;

  return (
    <>
      <Toaster />
      <div className="bg-white mt-20 shadow-lg">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Tienda   
        </h2> */}

        {eventsClient?.map((element) => (
          <div
            key={element.id}
            className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 "
          >
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {element.event.title}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-8">
              {element.event.photos?.map((photo, index) => (
                <div key={photo.id}>
                  <label
                    htmlFor={`my-modal-${index}`}
                    className=" hover:cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`my-modal-${index}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative ">
                        <label
                          htmlFor={`my-modal-${index}`}
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        {/* <h3 className="text-lg font-bold">
                          Congratulations random Internet user!
                        </h3> */}
                        <br />
                        {/* Imagen del modal */}
                        <div className="z-0 relative min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none ">
                          <img
                            draggable={false}
                            src={photo.imageUrlCopy}
                            alt={photo.imageUrlCopy}
                            className="h-full w-full  object-cover object-center lg:h-full lg:w-full z-10"
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              padding: "8px",
                              backgroundColor: "rgba(0, 0, 0, 0.0)",
                              color: "white",
                              fontSize: "300px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              zIndex: 2,
                            }}
                          >
                            <RiCameraLine className="text-transparent" />
                          </span>

                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              padding: "8px",
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                              color: "white",
                              fontSize: "80px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              zIndex: 2,
                            }}
                          >
                            <RiCameraLine />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Imagen */}
                    <div className="z-0 relative min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                      <img
                        draggable={false}
                        src={photo.imageUrlCopy}
                        alt={photo.imageUrlCopy}
                        className="h-full w-full  object-cover object-center lg:h-full lg:w-full z-10"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          padding: "8px",
                          backgroundColor: "rgba(0, 0, 0, 0.0)",
                          color: "white",
                          fontSize: "300px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          zIndex: 2,
                        }}
                      >
                        <RiCameraLine className="text-transparent" />
                      </span>

                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          padding: "8px",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          fontSize: "80px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          zIndex: 2,
                        }}
                      >
                        <RiCameraLine />
                      </span>
                    </div>
                  </label>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <p className="break-words">
                          {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                          {/* {photo.event.title} */}
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {photo.isPublic ? "public" : "private"}
                          </span>
                        </p>
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {photo.isPublic ? "public" : "private"}
                      </span>
                    </p> */}
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${photo.price}
                    </p>
                  </div>
                  <div className="">
                    {cart.find((element) => element.photoId == photo.id) ? (
                      <button
                        onClick={() => {
                          dispatch(
                            removePhoto({
                              clientId: user.client ? user.client.id : 0,
                              photoId: photo.id,
                              photoPrice: photo.price,
                              photoImageSecureUrl: `${photo.imageUrl}`,
                              eventTitle: element.event.title,
                            })
                          );
                          toast.error("Foto removida del carrito");
                        }}
                        className="text-red-500 font-medium  rounded-md px-4 py-1 w-full"
                      >
                        Remover
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(
                            addToCart({
                              clientId: user.client ? user.client.id : 0,
                              photoId: photo.id,
                              photoPrice: photo.price,
                              photoImageSecureUrl: `${photo.imageUrl}`,
                              eventTitle: element.event.title,
                            })
                          );
                          toast.success("Foto agragada al carrito");
                        }}
                        className=" text-sky-500 font-medium  rounded-md px-4 py-1 w-full"
                      >
                        + Agregar al carrito
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PhotosSale;
