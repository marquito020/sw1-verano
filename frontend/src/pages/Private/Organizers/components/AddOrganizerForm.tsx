import { useState, Fragment, FormEvent, ChangeEvent, useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { RiLink, RiAddLine, RiImageAddLine } from "react-icons/ri";

import { useAddOrganizer } from "../../../../hooks/useOrganizer.hook";
import { OrganizerCustomForm } from "../../../../interfaces/organizer.interface";

function AddOrganizerForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const { addOrganizer } = useAddOrganizer();
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

  const handleSubmit = async (e: FormEvent<OrganizerCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const formData = new FormData();
    formData.append("name", elements.name.value);
    formData.append("email", elements.email.value);
    formData.append("password", elements.password.value);
    formData.append("webSite", elements.webSite.value);
    formData.append("image", image ? image : "");

    const toastId = toast.loading("Creando nuevo organizador...");
    try {
      const response = await addOrganizer(formData);
      if (response?.id) {
        setMessageError("");
        setIsOpen(false);
        toast.success("Organizador creado exitosamente", { id: toastId });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al crear al nuevo organizador", { id: toastId });
      } else {
        toast.error("Error al crear al nuevo organizador", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al crear al nuevo organizador", { id: toastId });
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white py-3 px-8 rounded-lg border border-gray-200 mb-4 mt-20 shadow-md">
        <div className=" inset-0 flex items-start justify-between mb-2 mt-2">
          <div>
            <h1 className="text-gray-900 text-base font-medium mt-1">
              Organizadores
            </h1>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 rounded-md bg-sky-500 ml-2 text-white font-base px-4 py-2 text-sm hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <RiAddLine className="text-white font-base text-lg" />
              Agregar
            </button>
          </div>
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
                      className="text-lg font-medium leading-6"
                    >
                      Agregar nuevo organizador
                    </Dialog.Title>

                    <Dialog.Description as="div" className="mt-3">
                      <p className="text-red-500 mb-3"> {messageError}</p>
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 "
                        encType="multipart/form-data"
                      >
                        <div className="relative ">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full  py-2 px-10 rounded-md outline-none bg-gray-200"
                            placeholder="Nombre"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </div>

                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                            placeholder="Email"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-700"
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
                            id="password"
                            name="password"
                            type="password"
                            className="w-full py-2 px-10 rounded-md outline-none bg-gray-200"
                            placeholder="Password"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </div>

                        <div className="relative ">
                          <input
                            id="webSite"
                            name="webSite"
                            type="text"
                            className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                            placeholder="Web site"
                          />
                          <RiLink className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-600" />
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
                          />
                          <RiImageAddLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-600" />
                        </div>

                        <div className="relative">
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

                        <div>
                          <button
                            type="submit"
                            className="w-full bg-sky-500 py-2 px-4 text-white font-medium rounded-md hover:bg-sky-600 transition-colors"
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

export default AddOrganizerForm;
