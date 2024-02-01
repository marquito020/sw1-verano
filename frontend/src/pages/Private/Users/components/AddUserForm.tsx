import { useState, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useAddUser } from "../../../../hooks/useUser.hook";
import { RegisterCustomForm } from "../../../../interfaces/auth.interface";

function AddUserForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addUser } = useAddUser();
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<RegisterCustomForm>) => {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const response = await addUser({ name, email, password });
      if (response?.email) {
        setMessageError("");
        setIsOpen(false);
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#1E1F25] py-3 px-8 rounded-lg shadow-md mb-4 mt-20">
      <div className=" inset-0 flex items-start justify-start mb-2 mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-green-500/10  text-green-500 px-4 py-2 text-sm font-medium  hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add User
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
                    Add user
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
                          className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                          placeholder="Name"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
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
                          className="w-full bg-[#131517] text-[#d1d5db] py-2 px-10 rounded-md outline-none"
                          placeholder="Email"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
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
                          className="w-full text-[#d1d5db] py-2 px-10 rounded-md outline-none bg-[#131517]"
                          placeholder="Password"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
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
                          className="w-full bg-blue-600 py-2 px-4 text-[#d1d5db] rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save
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
  );
}

export default AddUserForm;
