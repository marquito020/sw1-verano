import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import stripeLogo from "../assets/stripe-logo.png";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Toaster, toast } from "react-hot-toast";

import { RootState } from "../redux/store";
import { useCreatePhotoSale } from "../hooks/usePhotoSale.hook";
import { resetCart } from "../redux/states/cart.state";

function BuyPhotos() {
  const stripe = useStripe();
  const elements = useElements();

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const { createPhotoSale } = useCreatePhotoSale();

  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const dataPhotoSaleArray = cart.map(
    //   ({ photoId, clientId, photoPrice, photoImageSecureUrl }) => ({
    //     photoId,
    //     clientId,
    //     photoPrice,
    //     photoImageSecureUrl,
    //   })
    // );

    if (!stripe || !elements) return;
    const element = elements.getElement(CardElement);
    if (element === null) return;

    setIsLoading(true);

    // comprobando la tarjeta
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: element,
    });

    if (error) {
      // mensajes de error de la validacion del Input (CardElement) de stripe
      const { message } = error;
      setMessageError(`${message}`);
      console.log("ocurrio un error con stripe: ", error);
      setIsLoading(false);
      return;
    }

    const { id } = paymentMethod; //id para el pago

    try {
      const response = await createPhotoSale({
        dataPhotoSale: cart,
        idPayStripe: id,
      });
      if (response?.count) {
        setMessageError("");
        dispatch(resetCart()); // limpiar el carrito
        // console.log("Compra existosa: ", response);
        toast.success("La compra se realizo exitosamente");
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
      }
    } catch (err) {
      console.log("error del servidor: ", err);
    }

    element.clear(); //limpia el input de la tarjeta
    setIsLoading(false);
  };

  return (
    <>
      <Toaster />
      <div className="bg-white p-8 rounded-xl shadow-lg mb- mr-4 w-full h-96">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <img src={stripeLogo} alt="react logo" width={100} height={100} />
          </div>
          <h1 className="text-gray-900 text-lg font-medium mb-4">
            Resumen del pedido
          </h1>
          <h3 className=" text-base mb-2">
            Subtotal: $
            {cart.reduce(
              (accumulator, item) => accumulator + item.photoPrice,
              0
            )}{" "}
          </h3>
          <h3 className=" text-base mb-2">
            Impuestos: $
            {cart.reduce(
              (accumulator, item) => accumulator + item.photoPrice * 0.1,
              0
            )}
          </h3>
          <h3 className="text-base mb-2">
            Total: $
            {cart.reduce(
              (accumulator, item) =>
                accumulator + item.photoPrice + item.photoPrice * 0.1,
              0
            )}
          </h3>
  
          <p className="text-red-500 mb-2 mt-2">{messageError}</p>
          <p className="text-green-500 mb-4">Información de la tarjeta</p>
          <CardElement
            id="pago"
            className=" bg-gray-200 rounded-md py-2 mb-6 px-4"
          />
          <button
            disabled={!stripe || isLoading}
            className="bg-sky-500 w-full rounded-md px-4 py-2 text-base text-white hover:bg-sky-600 disabled:bg-gray-500"
          >
            {isLoading ? "Cargando..." : "Pagar"}
          </button>
        </form>
      </div>
    </>
  );
}

export default BuyPhotos;
