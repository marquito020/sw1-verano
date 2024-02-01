import { useState, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import {  RiEyeLine } from "react-icons/ri";
import { useGetPhotographer } from "../../../../hooks/usePhotographer.hook";

interface Props {
  photographerId: number;
}

function ShowPhotographer({ photographerId }: Props) {
  const { photographerFound } = useGetPhotographer(
    parseInt(`${photographerId}`)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  console.log(photographerFound);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-base rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
      >
        <RiEyeLine className="text-gray-700" />
      </button>

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
                    Perfil del usuario
                  </Dialog.Title>

                  <Dialog.Description as="div" className="mt-3">
                    <div className=" flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img
                        className="object-cover ml-2 w-full h-96 md:h-auto md:w-48 rounded-md"
                        src={photographerFound?.user.imageSecureUrl}
                        alt={photographerFound?.user.imagePublicId}
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {photographerFound?.user.name}
                        </h5>
                        <p className=" font-normal text-gray-700 dark:text-gray-400">
                          Especialidad:{" "}
                          <span>{photographerFound?.specialty}</span>
                        </p>
                        <p className=" font-normal text-gray-700 dark:text-gray-400">
                          Tarifa/Precio:{" "}
                          <span>$ {photographerFound?.rate}</span>
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          Experiencia:{" "}
                          <span>{photographerFound?.experince} años</span>
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          Portafolio:{" "}
                          <span>{photographerFound?.portfolio}</span>
                        </p>
                      </div>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ShowPhotographer;
