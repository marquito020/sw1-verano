import { useState, Fragment, FormEvent, ChangeEvent, useEffect } from "react";
import { useSWRConfig } from "swr";

import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { RiLink } from "react-icons/ri";

import { useAddPhoto } from "../../../../hooks/usePhoto.hook";
import { PhotoCustomForm } from "../../../../interfaces/photo.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useGetEvents } from "../../../../hooks/useEventPhotographer.hook";
import { photosUrl } from "../../../../services/photo.service";

function AddPhotoForm() {
  const user = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addPhoto } = useAddPhoto();
  const { photographerEvent } = useGetEvents(
    user.photographer ? user.photographer.id : 0
  );
  const { mutate } = useSWRConfig();
  const [messageError, setMessageError] = useState("");

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);

      // Se Libera la URL cuando el componente se desmonte o cuando cambie la imagen
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [image]);

  const handleSubmit = async (e: FormEvent<PhotoCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const price = elements.price.value;
    const eventId = elements.eventId.value;
    const isPublic = elements.isPublic.value; //the value is a string
    const image2 = elements.image.files as unknown as File[];

    const formData = new FormData();
    formData.append("price", price);
    formData.append("eventId", eventId);
    formData.append("isPublic", isPublic);
    formData.append(
      "photographerId",
      user.photographer ? `${user.photographer.id}` : "0"
    );
    formData.append("image", image2 ? image2[0] : "");

    console.log(price, eventId, isPublic);
    console.log("nuevo", image2);

    const toastId = toast.loading("Cargando...");
    try {
      const response = await addPhoto(formData);
      if (response?.id) {
        setMessageError("");
        setIsOpen(false);
        toast.success("Foto subida exitosamente", { id: toastId });
        await mutate(
          `${photosUrl}/photographer/${
            user.photographer ? user.photographer.id : 0
          }`
        );
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al subir la foto", { id: toastId });
      } else {
        toast.error("Error al subir la foto", { id: toastId });
      }
    } catch (err) {
      toast.error("Error al subir la foto", { id: toastId });
      console.log(err);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white rounded-lg py-2 px-8  mb-4 mt-20 shadow-md">
        <div className=" inset-0 flex items-start justify-start mb-2 mt-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-md bg-sky-500 text-white font-medium px-4 py-2 text-sm hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            + Agregar
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 "
                    >
                      Agregar foto de evento
                    </Dialog.Title>

                    <Dialog.Description as="div" className="mt-3">
                      <p className="text-red-500 mb-3"> {messageError}</p>
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full "
                        encType="multipart/form-data"
                      >
                        <div className="relative">
                          <input
                            required={true}
                            id="price"
                            name="price"
                            type="number"
                            min={0}
                            className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                            placeholder="Precio ($)"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                        </div>

                        <div className="relative ">
                          <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setImage(
                                e.target.files
                                  ? (e.target.files[0] as File)
                                  : null
                              )
                            }
                            id="image"
                            name="image"
                            type="file"
                            className="w-full py-2 px-10 rounded-md outline-none bg-gray-200"
                            placeholder="Imagen"
                          />
                          <RiLink className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-900" />
                        </div>

                        <div className="relative">
                          {image && (
                            <div className="flex justify-center">
                              <img
                                className="h-28 max-w-full rounded-lg"
                                src={URL.createObjectURL(image)}
                                alt="Foto de perfil"
                              />
                            </div>
                          )}
                        </div>

                        <div className="relative ">
                          <select
                            name="eventId"
                            id="eventId"
                            className="w-full py-2 px-10 rounded-md outline-none bg-gray-200"
                          >
                            {photographerEvent?.map((element) => (
                              <option
                                key={element.eventId}
                                value={element.eventId}
                              >
                                {element.event.title}
                              </option>
                            ))}
                          </select>

                          <RiLink className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-900" />
                        </div>

                        <div className="relative">
                          <label
                            htmlFor="isPublic"
                            className="w-full py-2 px-8 rounded-md outline-none bg-gray-200"
                          >
                            Público:
                          </label>
                          <label htmlFor="isPublic" className="px4 ml-4">
                            si
                          </label>
                          <input
                            defaultChecked={true}
                            id="isPublic"
                            name="isPublic"
                            type="radio"
                            value={"true"}
                            className="bg-gray-200 ml-4 px-4 "
                          />
                          <label htmlFor="noPublic" className="px4 ml-4">
                            no
                          </label>
                          <input
                            id="noPublic"
                            name="isPublic"
                            type="radio"
                            value={"false"}
                            className="bg-gray-200 ml-4 px-4 "
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full bg-sky-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-sky-600 transition-colors"
                          >
                            Registrar
                          </button>
                        </div>
                      </form>
                    </Dialog.Description>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default AddPhotoForm;

{
  /* <>
    <div className="flex justify-start px-4 py-4 mt-16">
      <button className="bg-sky-500 text-white font-medium hover:bg-sky-600 rounded-md px-4 py-1">
        + Add Photo
      </button>
    </div>
    </> */
}
