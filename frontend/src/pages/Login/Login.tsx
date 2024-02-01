import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import reactLogo from "../../assets/react.svg";

import { createUser } from "../../redux/states/user.state";
import { PrivateRoutes, PublicRoutes } from "../../constants/routes";
import { useLogin } from "../../hooks/useAuth.hook";
import { LoginCustomForm } from "../../interfaces/auth.interface";

function Login() {
  const dispatch = useDispatch();
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<LoginCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const email = elements.email.value;
    const password = elements.password.value;
    
    try {
      const response = await loginUser({ email, password });
      if (response?.email) {
        dispatch(createUser(response));
        navigate(PrivateRoutes.PRIVATE, { replace: true });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#100e17] text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg ">
        <div className="flex justify-center mb-8">
          <img src={reactLogo} alt="react logo" width={100} height={120} />
        </div>
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl font-semibold">Login</h1>
            <p className="text-gray-700 text-sm">
              Ingresa tu correo electronico y contranseña
            </p>
            <p className="text-red-500">{messageError}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                id="email"
                type="email"
                className="bg-gray-200 w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Correo electronico"
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
                id="password"
                type="password"
                className="bg-gray-200 w-full  border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Contraseña"
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
            <div>
              <button
                type="submit"
                className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition-colors"
              >
                {"Inicar sesión"}
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-[#d1d5db]">
          <Link className="text-blue-500" to={PublicRoutes.REGISTER}>
            Crear una nueva cuenta
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
