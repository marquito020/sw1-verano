import { useParams, useNavigate } from "react-router-dom";
import { useGetPhoto } from "../../../../hooks/usePhoto.hook";
import { PrivateRoutes } from "../../../../constants/routes";

function ShowPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { photoFound } = useGetPhoto(parseInt(`${id}`));

  console.log(photoFound);

  return (
    <div>
      ShowPhoto
      <button
        type="button"
        onClick={() =>
          navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.PHOTOS}`)
        }
      >
        Atras
      </button>
    </div>
  );
}

export default ShowPhoto;
