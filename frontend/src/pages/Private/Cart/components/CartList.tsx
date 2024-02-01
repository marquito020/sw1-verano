import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

import { RootState } from "../../../../redux/store";
import { removePhoto } from "../../../../redux/states/cart.state";

function CartList() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <Toaster />
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg w-full">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-gray-900 text-base font-medium">Carrito de compras</h1>
          <p className="text-gray-500">Hay {cart?.length} fotos en el carrito</p>
        </div>
      </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 px-3 py-4  ">
          <h5 className="col-span-1">#</h5>
          <h5 className="col-span-1">Foto</h5>
          <h5 className="col-span-1">Evento</h5>
          <h5 className="col-span-1">Precio</h5>
          <h5 className="col-span-1">Remover</h5>
        </div>
        {cart?.map((element, index) => (
          <div
            key={element.photoId}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 rounded-lg border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4  text-sm"
          >
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2 mt-2">#</h5>
              <p>{index + 1}</p>
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Foto</h5>
              <img
                draggable={false}
                src={element.photoImageSecureUrl}
                alt={element.eventTitle}
                className="h-full w-full rounded-md  object-cover object-center lg:h-20 lg:w-20"
              />
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Evento</h5>
              <p className="break-words">{element.eventTitle}</p>
            </div>
            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Precio</h5>
              <p>$ {element.photoPrice}</p>
            </div>

            <div className="col-span-1">
              <h5 className="md:hidden font-bold mb-2">Acciones</h5>
              <button
                onClick={() => {
                  dispatch(removePhoto(element));
                  toast.success("Foto removida del carrito");
                }}
                className="text-sm text-red-500 hover:bg-red-100 rounded px-3 py-2"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartList;
