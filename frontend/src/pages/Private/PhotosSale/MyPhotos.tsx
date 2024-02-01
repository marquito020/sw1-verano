import { useSelector } from "react-redux";
import { saveAs } from "file-saver";

import { RootState } from "../../../redux/store";
import { useAllClientPhotoSales } from "../../../hooks/usePhotoSale.hook";

function MyPhotos() {
  const user = useSelector((state: RootState) => state.user);
  const { clientPhotoSales, isLoading, error } = useAllClientPhotoSales(
    user.client ? user.client.id : 0
  );

  if (isLoading) return <div>Loading photos...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  return (
    <>
      <div className="bg-white shadow-lg mt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Mis Fotos
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {clientPhotoSales?.map((element, index) => (
              <div key={element.id}>
                <label
                  htmlFor={`my-modal-${index}`}
                  className=" hover:cursor-pointer "
                >
                  <input
                    type="checkbox"
                    id={`my-modal-${index}`}
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative ">
                      <label
                        htmlFor={`my-modal-${index}`}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>

                      <br />
                      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                        <img
                          draggable={false}
                          src={element.photo.imageUrl}
                          alt={element.photo.imageUrl}
                          className="h-full w-full  object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <img
                      draggable={false}
                      src={element.photo.imageUrl}
                      alt={element.photo.imageUrl}
                      className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </label>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p className="break-words">
                        {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                        {/* {photo.event.title} */}
                      </p>
                    </h3>
                    <button
                      onClick={() => {
                        //url, FileName
                        saveAs(
                          `${element.photo.imageUrl}`,
                          `image${element.photo.id}`
                        );
                      }}
                      type="button"
                      className="mt-1 text-sm text-gray-500"
                    >
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Click aqui para descargar
                      </span>
                    </button>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900">
                    ${element.photo.price}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPhotos;
