import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  RiMenuFill,
  RiCloseLine,
  RiLogoutCircleLine,
  RiDashboard3Line,
  RiFunctionLine,
  RiHome4Line,
  RiUserLine,
  RiCameraLine,
  RiGroupLine,
  RiCalendarEventLine,
  RiImageLine,
  RiShoppingCartLine,
  RiDraftLine,
} from "react-icons/ri";

import { resetUser } from "../redux/states/user.state";
import { PrivateRoutes, PublicRoutes } from "../constants/routes";
import { RootState } from "../redux/store";
import { resetCart } from "../redux/states/cart.state";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Sidebar bg-gradient-to-b from-[#100e17] to-[#191827] */}
      <div
        className={`fixed top-0 w-3/4 xl:left-0 md:w-64 h-full shadow-lg bg-[#100e17] text-gray-100 text-sm border-r border-gray-300 p-8 flex flex-col justify-between z-50 transition-all 
        ${showMenu ? "left-0" : "-left-full"}`}
      >
        {/* Navegacion  */}
        <div>
          <h1 className="text-2xl text-center text-white uppercase font-bold mb-10">
            <Link to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}>
            🌀EventParty
            </Link>
          </h1>
          <ul>
            <li>
              <NavLink
                to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                    : "flex items-center mb-1 gap-4 hover:bg-[#191827] transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiFunctionLine />
                Dashboard
              </NavLink>
              {/* <NavLink
                to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.HOME}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-200 text-gray-900"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiHome4Line />
                Home
              </NavLink> */}
              {user.rol.id == 1 && (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.USERS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827] "
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiUserLine />
                  Usuarios
                </NavLink>
              )}
              {user.rol.id == 1 ? (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.ORGANIZERS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827] "
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiGroupLine />
                  Organizadores
                </NavLink>
              ) : undefined}
              {user.rol.id == 1 || user.rol.id == 2 || user.rol.id == 3 ? (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.PHOTOGRAPHERS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827] "
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827]   transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiCameraLine />
                  Fotografos
                </NavLink>
              ) : undefined}

              {user.rol.id == 1 ? (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.CLIENTS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiGroupLine />
                  Clientes
                </NavLink>
              ) : undefined}

              {user.rol.id == 1 || user.rol.id == 2 ? (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.EVENTS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827] transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiCalendarEventLine />
                  Eventos
                </NavLink>
              ) : undefined}

              {user.rol.id == 1 || user.rol.id == 3 ? (
                <NavLink
                  to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.PHOTOS}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827] "
                      : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  <RiImageLine />
                  Fotos de eventos
                </NavLink>
              ) : undefined}
              {user.rol.id == 1 || user.rol.id == 4 ? (
                <>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.PHOTOSSALE}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                        : "flex items-center mb-1 gap-4 hover:bg-[#191827] transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <RiImageLine />
                    Venta de fotos
                  </NavLink>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.CART}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                        : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <div className="">
                      <RiShoppingCartLine />
                    </div>
                    Mi carrito
                  </NavLink>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.MYPHOTOS}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                        : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <div className="">
                      <RiImageLine />
                    </div>
                    Mis fotos
                  </NavLink>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.FACTURES}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#191827]"
                        : "flex items-center mb-1 gap-4 hover:bg-[#191827]  transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <div className="">
                      <RiDraftLine />
                    </div>
                    Mis facturas
                  </NavLink>
                </>
              ) : undefined}
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            dispatch(resetUser());
            dispatch(resetCart());
            navigate(PublicRoutes.LOGIN, { replace: true });
          }}
          className="flex items-center gap-2 hover:bg-[#191827] transition-colors py-2 px-4 rounded-lg"
        >
          <RiLogoutCircleLine />
          <div>
            <h5 className="font-medium">Cerrar sesión</h5>
          </div>
        </button>
      </div>

      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="xl:hidden fixed bottom-6 right-6 bg-white ring-1 ring-gray-500  p-4 rounded-full"
      >
        {showMenu ? <RiCloseLine /> : <RiMenuFill />}
      </button>
    </>
  );
}

export default Sidebar;
