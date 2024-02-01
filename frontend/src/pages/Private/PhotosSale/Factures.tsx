import { useSelector } from "react-redux";
import {  RiEyeLine } from "react-icons/ri";
import { RootState } from "../../../redux/store";
import { useAllClientPhotoSales } from "../../../hooks/usePhotoSale.hook";

function Factures() {
  const user = useSelector((state: RootState) => state.user);
  const { clientPhotoSales, isLoading, error } = useAllClientPhotoSales(
    user.client ? user.client.id : 0
  );

  if (isLoading) return <div>Loading photos...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  return (
    <>
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg mt-16">
        <div className="flex justify-between mb-2">
          <div>
            <h1 className="text-gray-900 text-base font-medium">Facturas</h1>
            <p className="text-gray-500">
              Hay {clientPhotoSales?.length} facturas
            </p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 px-3 py-4 border-b border-gray-200">
          <h5>Metodo de pago</h5>
          <h5>Fecha</h5>
          <h5>Estado</h5>
          <h5>Tipo de compra</h5>
          <h5>Total</h5>
          {/* <h5>Acciones</h5> */}
        </div>
        {clientPhotoSales?.map((element) => (
          <div
            key={element.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4 rounded-lg text-sm"
          >
            <div>
              <h5 className="md:hidden font-bold mb-2">Metodo de pago</h5>
              <p>{element.methodOfPayment}</p>
            </div>

            <div>
              <h5 className="md:hidden font-bold mb-2">Fecha</h5>
              <p>
                {new Date(element.dateTime).toLocaleDateString("en-us", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Estado</h5>
              <p className="text-green-500">
                {element.state == "paid" ? "pagado" : "no pagado"}
              </p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2 mt-2">Tipo de compra</h5>
              <p>{element.type}</p>
            </div>
            <div>
              <h5 className="md:hidden font-bold mb-2">Total</h5>
              <p>$ {element.total}</p>
            </div>

            {/* <div className="md:flex md:justify-center gap-3 md:p-2 xl:mb-0 sm:mb-2 mr-2">
              <h5 className="md:hidden font-bold mb-2">Acciones</h5>
              <button
                onClick={() => console.log("click show")}
                className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
              >
                <RiEyeLine className="text-gray-700" />
              </button>

            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Factures;
