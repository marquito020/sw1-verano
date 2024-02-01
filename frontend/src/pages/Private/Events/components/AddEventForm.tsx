import { useState, Fragment, FormEvent, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { RiCalendar2Line, RiMapPin2Line, RiArticleLine } from "react-icons/ri";

import { useAddEvent } from "../../../../hooks/useEvent.hook";
import { EventCustomForm } from "../../../../interfaces/event.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAllPhotographers } from "../../../../hooks/usePhotographer.hook";

// const colourOptions = [
//   { value: "ocean", label: "Ocean" },
//   { value: "blue", label: "Blue" },
//   { value: "purple", label: "Purple" },
//   { value: "red", label: "Red" },
//   { value: "orange", label: "Orange" },
//   { value: "yellow", label: "Yellow" },
// ];

// type OptionsType = {
//   value: string;
//   label: string;
// };

function AddEventForm() {
  // const [selected, setSelected] = useState([]);
  // const [options, setOptions] = useState<OptionsType[]>([]);

  const { photographers } = useAllPhotographers();
  const user = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addEvent } = useAddEvent();
  const [messageError, setMessageError] = useState("");

  // useEffect(() => {
  //   const optionsValue: OptionsType[] = [];
  //   if (photographers) {
  //     photographers.forEach((photographer) => {
  //       optionsValue.push({
  //         value: `${photographer.id}`,
  //         label: `${photographer.user.name}`,
  //       });
  //     });
  //     setOptions(optionsValue);
  //   }
  // }, []);

  const handleSubmit = async (e: FormEvent<EventCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const title = elements.title.value;
    const description = elements.description.value;
    const location = elements.location.value;
    const dateTime = new Date(elements.dateTime.value);
    const photographersSelect = parseInt(elements.photographers.value);
    // console.log("seleccionados", selected);
    try {
      const toastId = toast.loading("Creando el evento...");
      const response = await addEvent({
        title,
        description,
        location,
        dateTime,
        organizerId: user.organizer ? user.organizer.id : 0,
        photographers: [{ photographerId: photographersSelect }],
        invitations: [],
      });
      if (response?.id) {
        setMessageError("");
        setIsOpen(false);
        toast.success("Evento creado", { id: toastId });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
        toast.error("Error al crear el evento", { id: toastId });
      } else {
        toast.error("Error al crear el evento", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white py-3 px-8 rounded-lg border border-gray-200 mb-4 mt-20 shadow-md">
        <div className=" inset-0 flex items-start justify-start mb-2 mt-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-md bg-sky-500  text-white font-semibold  px-4 py-2 text-sm hover:bg-sky-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Add Event
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
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#1E1F25]  p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-[#d1d5db]"
                    >
                      Add Event
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
                            id="title"
                            name="title"
                            type="text"
                            className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                            placeholder="Title"
                          />
                          <RiArticleLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                        </div>
                        <div className="relative">
                          <textarea
                            name="description"
                            id="description"
                            cols={10}
                            rows={5}
                            className="w-full bg-[#131517] text-[#d1d5db] py-2 px-4 rounded-md outline-none"
                            placeholder="Description"
                          ></textarea>
                        </div>

                        <div className="relative ">
                          <input
                            id="location"
                            name="location"
                            type="location"
                            className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                            placeholder="Location"
                          />
                          <RiMapPin2Line className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                        </div>
                        {/* <div className="relative">
                          <MultiSelect
                            options={colourOptions}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                          />
                        </div> */}

                        <div className="relative">
                          <input
                            id="dateTime"
                            name="dateTime"
                            type="datetime-local"
                            className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                          />
                          <RiCalendar2Line className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                        </div>
                        <div className="relative">
                          <select
                            name="photographers"
                            id="photographers"
                            className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                          >
                            {photographers?.map((photographer) => (
                              <option
                                value={photographer.id}
                                key={photographer.id}
                              >
                                {photographer.user.name}
                              </option>
                            ))}
                          </select>
                          <RiCalendar2Line className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 py-2 px-4 text-[#d1d5db] rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Register
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

export default AddEventForm;
