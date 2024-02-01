import {
  useAllPhotosPhotographer,
  useDeletePhoto,
} from "../../../../hooks/usePhoto.hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

function PhotosList() {
  const user = useSelector((state: RootState) => state.user);
  const { photos, isLoading, error } = useAllPhotosPhotographer(
    user.photographer ? user.photographer.id : 0
  );
  const { deletePhoto } = useDeletePhoto();

  // console.log(photos);

  if (isLoading) return <div>Loading photos...</div>;
  else if (error) return <div>Error {`${error}`}</div>;

  return (
    <>
      <div className="bg-white shadow-lg">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Fotos de eventos
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {photos?.map((photo) => (
              <div key={photo.id}>
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                    draggable={false}
                    src={photo.imageUrlCopy}
                    alt={photo.imageUrlCopy}
                    className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p className="break-words">
                        {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                        {photo.event.title}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {photo.isPublic ? "public" : "private"}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${photo.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotosList;
