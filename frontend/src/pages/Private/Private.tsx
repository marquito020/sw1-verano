import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoutes } from "../../constants/routes";
import MainContent from "../../components/MainContent";

import {
  AdminAuthorization,
  OrganizerAuthorization,
  PhotographerAuthorization,
  ClientAuthorization,
  OrganizerAndPhotographerAuthorization,
} from "../../guards";

const Dasboard = lazy(() => import("./Dashboard/Dashboard"));
const Home = lazy(() => import("./Home/Home"));

const Users = lazy(() => import("./Users/Users"));
const UpdateUserForm = lazy(() => import("./Users/components/UpdateUserForm"));

const Photograpghers = lazy(() => import("./Photographers/Photographers"));
const UpdatePhotographerForm = lazy(
  () => import("./Photographers/components/UpdatePhotographerForm")
);

const Organizers = lazy(() => import("./Organizers/Organizers"));
const UpdateOrganizerForm = lazy(
  () => import("./Organizers/components/UpdateOrganizerForm")
);

const Clients = lazy(() => import("./Clients/Clients"));
const UpdateClientForm = lazy(
  () => import("./Clients/components/UpdateClientForm")
);

const Events = lazy(() => import("./Events/Events"));
const Add2Event = lazy(() => import("./Events/components/Add2EventForm"));
const UpdateEventForm = lazy(
  () => import("./Events/components/UpdateEventForm")
);
const ShowEvent = lazy(() => import("./Events/components/ShowEvent"));

const PhotosSale = lazy(() => import("./PhotosSale/PhotosSale"));

const Photos = lazy(() => import("./Photos/Photos"));

const Cart = lazy(() => import("./Cart/Cart"));

const MyPhotos = lazy(() => import("./PhotosSale/MyPhotos"));
const Factures = lazy(() => import("./PhotosSale/Factures"));

const Invitation = lazy(() => import("./Events/Invitation"));

function Private() {
  return (
    <Routes>
      <Route element={<MainContent />}>
        <Route
          path="/"
          element={
            <Navigate
              to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
              replace={true}
            />
          }
        />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dasboard />} />
        <Route path={PrivateRoutes.HOME} element={<Home />} />

        <Route
          path={`${PrivateRoutes.USERS}/:id`}
          element={<UpdateUserForm />}
        />

        <Route element={<AdminAuthorization />}>
          <Route path={PrivateRoutes.USERS} element={<Users />} />
          <Route path={PrivateRoutes.ORGANIZERS} element={<Organizers />} />
          <Route
            path={`${PrivateRoutes.ORGANIZERS}/:id`}
            element={<UpdateOrganizerForm />}
          />
        </Route>

        <Route element={<OrganizerAndPhotographerAuthorization />}>
          <Route
            path={PrivateRoutes.PHOTOGRAPHERS}
            element={<Photograpghers />}
          />
        </Route>

        <Route
          path={`${PrivateRoutes.PHOTOGRAPHERS}/:id`}
          element={<UpdatePhotographerForm />}
        />

        {/* Invitation */}
        <Route path={`${PrivateRoutes.INVITATION}/:id`} element={<Invitation />} />

        <Route element={<AdminAuthorization />}>
          <Route path={PrivateRoutes.CLIENTS} element={<Clients />} />
          <Route
            path={`${PrivateRoutes.CLIENTS}/:id`}
            element={<UpdateClientForm />}
          />
        </Route>

        <Route element={<OrganizerAuthorization />}>
          <Route path={PrivateRoutes.EVENTS} element={<Events />} />
          <Route path={`${PrivateRoutes.EVENTS}/add`} element={<Add2Event />} />
          <Route
            path={`${PrivateRoutes.EVENTS}/:id`}
            element={<UpdateEventForm />}
          />
          <Route
            path={`${PrivateRoutes.EVENTS}/show/:id`}
            element={<ShowEvent />}
          />
        </Route>

        <Route element={<PhotographerAuthorization />}>
          <Route path={PrivateRoutes.PHOTOS} element={<Photos />} />
        </Route>

        <Route element={<ClientAuthorization />}>
          <Route path={PrivateRoutes.PHOTOSSALE} element={<PhotosSale />} />
          <Route path={PrivateRoutes.CART} element={<Cart />} />
          <Route path={PrivateRoutes.MYPHOTOS} element={<MyPhotos />} />
          <Route path={PrivateRoutes.FACTURES} element={<Factures />} />
        </Route>
      </Route>
      <Route path="*" element={<div>PAGE NOT FOUNT</div>} />
    </Routes>
  );
}

export default Private;
