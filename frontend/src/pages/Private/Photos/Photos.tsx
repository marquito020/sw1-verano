import { lazy } from "react";

const PhotosList = lazy(() => import("./components/PhotosList"));
const AddPhotoForm = lazy(() => import("./components/AddPhotoForm"));

function Photos() {
  return (
    <div className="gap-2">
      <AddPhotoForm />
      <PhotosList />
    </div>
  );
}

export default Photos;
