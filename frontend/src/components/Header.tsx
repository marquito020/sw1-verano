import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition } from "@headlessui/react";
import {
  RiSearchLine,
  RiChat1Line,
  RiNotification2Line,
  RiArrowDropDownLine,
  RiCheckboxBlankCircleFill,
  RiThumbUpLine,
  RiUserLine,
  RiLogoutCircleLine,
  RiSettings3Line,
  RiShoppingCartLine,
  RiShoppingCartFill,
  RiShoppingBagLine,
} from "react-icons/ri";

import { PublicRoutes } from "../constants/routes";
import { resetUser } from "./../redux/states/user.state";
import { RootState } from "../redux/store";
import { resetCart } from "../redux/states/cart.state";

function Header() {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(resetUser());
    dispatch(resetCart())
  };

  return (
    <header className="z-10 fixed flex-col md:flex-row gap-4 shadow-md bg-white text-gray-800 text-sm border-b border-gray-300 w-full xl:w-[calc(100%-256px)] xl:ml-64 flex items-center justify-between p-1.5">
      <form className="order-1 md:order-none">
        {/* <div className="relative">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            className="bg-[#1E1F25] outline-none py-1 pl-10 pr-4 rounded-full"
            type="text"
            placeholder="Search"
          />
        </div> */}
      </form>
      <nav className="flex items-center gap-2 text-sm">
        {/* <Menu as="div" >
          <Menu.Button className="bg-gray-200 p-2 rounded-lg transition-colors relative">
            < RiShoppingCartLine />
            {cart.length > 0 ? (
              <RiCheckboxBlankCircleFill className="absolute top-1 right-1.5 text-[10px] text-red-500" />
              // <span className="absolute -top-3 right-1">
              //   <span className="relative flex h-2.5 w-2.5 ml-2 mt-4 ">
              //     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              //     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              //   </span>
              // </span>
            ) : (
              <></>
            )}
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="section"
              className="absolute -left-10  md:right-0 top-6 bg-white border  w-64 rounded-lg shadow-lg p-4"
            >
              <div>
                <h1 className="font-medium text-center mb-4">
                  Carrito de compras
                </h1>
                <hr className="my-2" />
                <Menu.Item>
                  <Link
                    to={"/private/cart"}
                    className="flex items-center gap-4 hover:bg-gray-200 transition-colors p-2 rounded-lg"
                  >
                    <RiShoppingBagLine className="bg-gray-200 text-black py-2 px-3 box-content rounded-full text-xl" />
                    <div>
                      <h5 className="text-sm">
                        Hay <span className="text-red-500">{cart.length}</span>{" "}
                        productos en tu carrito de compras
                      </h5>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to={"/private/cart"}
                    className="flex justify-center text-center transition-colors p-2 rounded-lg"
                  >
                    <div>
                      <h5 className="text-sm text-sky-500">
                        Ver mi carrito de compras
                      </h5>
                    </div>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}
        {/* <Menu as="div">
          <Menu.Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors relative">
            <RiNotification2Line />
            <RiCheckboxBlankCircleFill className="absolute top-1 right-2 text-[10px] text-red-500" />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="section"
              className="absolute -left-20 md:right-0  top-6 bg-white border  w-72 rounded-lg shadow-lg p-4"
            >
              <div>      
                <h1 className="font-medium text-center mb-4">Nofificaciones</h1>
                <hr className="my-2" />
                <Menu.Item>
                  <Link
                    to={"/home"}
                    className="flex items-center gap-4 hover:bg-gray-200 transition-colors p-2 rounded-lg"
                  >
                    <RiThumbUpLine className="bg-gray-200 text-blue-900 p-2 box-content rounded-full" />
                    <div>
                      <h5 className="text-sm">
                        {"A Juan Peres Peres le gusta tu "}
                        <span className="font-bold">foto</span>
                      </h5>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to={"/home"}
                    className="flex items-center gap-4 hover:bg-gray-200 transition-colors p-2 rounded-lg"
                  >
                    <RiChat1Line className="bg-gray-200 text-purple-900 py-2 px-3 box-content rounded-full text-2xl" />
                    <div>
                      <h5 className="text-sm">
                        {"Juan Peres ha comentato en tu "}
                        <span className="font-bold">publicacion</span>
                      </h5>
                    </div>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}
        <Menu as="div">
          <Menu.Button className="flex items-center gap-4 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
            <img
              src={user.imageSecureUrl}
              alt={user.name}
              className="w-8 h-8 object-cover rounded-full"
            />
            <span>{user.name}</span>
            <RiArrowDropDownLine />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="section"
              className="absolute right-0 top-4 bg-white border w-64 rounded-lg shadow-lg p-4"
            >
              <div>
                <Menu.Item>
                  <Link
                    to={"/home"}
                    className="flex items-center gap-4 hover:bg-gray-200  transition-colors p-2 rounded-lg"
                  >
                    <img
                      src={user.imageSecureUrl}
                      alt={user.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div>
                      <h5 className="">{user.name}</h5>
                      <p className="text-gray-600 text-xs">{user.rol.name}</p>
                      {/* <p className="text-gray-600 text-xs">{user.email}</p> */}
                    </div>
                  </Link>
                </Menu.Item>
                <hr className="my-2" />
                <Menu.Item>
                  <Link
                    to={"/profile"}
                    className="flex items-center gap-4 hover:bg-gray-200 transition-colors p-2 rounded-lg"
                  >
                    <RiUserLine /> Perfil
                  </Link>
                </Menu.Item>
                {/* <Menu.Item>
                  <Link
                    to={"private/home"}
                    className="flex items-center gap-4 hover:bg-gray-200  transition-colors p-2 rounded-lg"
                  >
                    <RiSettings3Line /> Configuración
                  </Link>
                </Menu.Item> */}
                <Menu.Item>
                  <Link
                    onClick={logoutClick}
                    to={PublicRoutes.LOGIN}
                    replace={true}
                    className="flex items-center gap-4 hover:bg-gray-200  transition-colors p-2 rounded-lg"
                  >
                    <RiLogoutCircleLine /> Cerrar sesión
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
