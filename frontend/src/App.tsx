import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import { store } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./constants/routes";

import { Authenticate } from "./guards";
import Loading from "./pages/Loading/Loading";

const Landing = lazy(() => import("./pages/Landing/Landing"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false }}>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Login />} />
              <Route path={PublicRoutes.LANDING} element={<Landing />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
              <Route element={<Authenticate />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route path="*" element={<>PAGE NOT FOUNT</>} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </SWRConfig>
  );
}

export default App;
