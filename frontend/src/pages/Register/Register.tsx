import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { RiLink, RiImageAddLine } from "react-icons/ri";

import { PublicRoutes } from "../../constants/routes";
import { useRegister } from "../../hooks/useAuth.hook";
import { RegisterCustomForm } from "../../interfaces/auth.interface";
import { useAddClient } from "../../hooks/useClient.hook";
import { useAddOrganizer } from "../../hooks/useOrganizer.hook";
import { useAddPhotographer } from "../../hooks/usePhotographer.hook";

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useRegister();

  const { addClient } = useAddClient();
  const { addOrganizer } = useAddOrganizer();
  const { addPhotographer } = useAddPhotographer();

  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [typeUser, setTypeUser] = useState("client");
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

  const handleSubmit = async (e: FormEvent<RegisterCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const formData = new FormData();
    formData.append("name", elements.name.value);
    formData.append("email", elements.email.value);
    formData.append("password", elements.password.value);
    formData.append("image", image ? image : "");

    setIsLoading(true);
    try {
      if (typeUser == "client") {
        const response = await addClient(formData);
        if (response?.id) {
          setMessageError("");
          navigate(PublicRoutes.LOGIN, { replace: true });
        } else if (response && "message" in response) {
          setMessageError(response.message as string);
        }
      } else if (typeUser == "organizer") {
        formData.append("webSite", elements.webSite.value); //organizador
        const response = await addOrganizer(formData);
        if (response?.id) {
          setMessageError("");
          navigate(PublicRoutes.LOGIN, { replace: true });
        } else if (response && "message" in response) {
          setMessageError(response.message as string);
        }
      } else {
        formData.append("rate", elements.rate.value); //fotografo
        formData.append("type", elements.type.value); //fotografo
        const response = await addPhotographer(formData);
        if (response?.id) {
          setMessageError("");
          navigate(PublicRoutes.LOGIN, { replace: true });
        } else if (response && "message" in response) {
          setMessageError(response.message as string);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const response = await registerUser({ name, email, password });
    //   if (response?.email) {
    //     setMessageError("");
    //     navigate(PublicRoutes.LOGIN, { replace: true });
    //   } else if (response && "message" in response) {
    //     setMessageError(response.message as string);
    //   }
    // console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="min-h-screen bg-[#100e17] text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg ">
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl font-semibold">Registro de usuario</h1>
            <p className="text-gray-400 text-sm">
              Ingresa los datos solicitados
            </p>
            <p className="text-red-500">{messageError}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-200 w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Nombre completo"
                required={true}
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
                type="email"
                id="email"
                name="email"
                className="bg-gray-200 w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Correo electronico"
                required={true}
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
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-200  w-full border border-gray-300  py-2 px-10 rounded-md outline-none"
                placeholder="Contranseña"
                required={true}
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
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? (e.target.files[0] as File) : null)
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
                    className="h-28 max-w-full rounded-lg"
                    src={URL.createObjectURL(image)}
                    alt="Foto de perfil"
                  />
                </div>
              )}
            </div>

            {/* Aqui dependera de que tipo de usuario se va a registrar */}
            <label htmlFor="">Tipo de cuenta</label>
            <div className="relative ">
              <select
                className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setTypeUser(e.target.value)
                }
              >
                <option value="client">invitado</option>
                <option value="organizer">organizador</option>
                <option value="photographer">fotografo</option>
              </select>
            </div>

            {/* Si es un usario tipo fotografo */}
            {typeUser == "photographer" && (
              <>
                <div className="relative ">
                  <input
                    required={true}
                    defaultValue={0.0}
                    id="rate"
                    name="rate"
                    type="number"
                    className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                    placeholder="Tarifa/Precio"
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
                  <select
                    required={true}
                    name="type"
                    id="type"
                    className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                  >
                    <option value="person">person</option>
                    <option value="studio">studio</option>
                  </select>
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
              </>
            )}

            {/* Si el usuario es de tipo organizador */}
            {typeUser == "organizer" && (
              <>
                <div className="relative ">
                  <input
                    defaultValue={""}
                    id="webSite"
                    name="webSite"
                    type="text"
                    className="w-full bg-gray-200 py-2 px-10 rounded-md outline-none"
                    placeholder="Web site"
                  />
                  <RiLink className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-600" />
                </div>
              </>
            )}

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className=" disabled: w-full bg-sky-500 text-white  py-2 px-4 rounded-md hover:bg-sky-600  transition-colors"
              >
                {isLoading ? "Cargando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-[#d1d5db]">
          <Link className="text-blue-500" to={PublicRoutes.LOGIN}>
            Iniciar sesión
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
