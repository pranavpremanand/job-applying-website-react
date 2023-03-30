import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BackgroundImg from "./Components/BackgroundImg";
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";
import SuccessPage from "./Pages/SuccessPage";
import { SpinnerContext } from "./Contexts/SpinnerContext";
import { PageTwoProtectRoute } from "./ProtectRoutes/PageTwoProtect";
import { SuccessPageProtectRoute } from "./ProtectRoutes/SuccessPageProtect";
import store from "./Redux/store";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Spinner";

function App() {
  const [spinner, setSpinner] = useState(false);
  const spinnerStatus = () => {
    setSpinner((prev) => !prev);
  };
  return (
    <>
      <Provider store={store}>
        <SpinnerContext.Provider
          value={{ spinner: spinnerStatus, setSpinner: spinnerStatus }}
        >
          <Toaster position="top-center" reverseOrder={false} />
          {spinner && <Spinner />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BackgroundImg />}>
                <Route path="/" element={<PageOne />} />
                <Route
                  path="/job-title"
                  element={
                    <PageTwoProtectRoute>
                      <PageTwo />
                    </PageTwoProtectRoute>
                  }
                />
              </Route>
              <Route
                path="/success"
                element={
                  <SuccessPageProtectRoute>
                    <SuccessPage />
                  </SuccessPageProtectRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </SpinnerContext.Provider>
      </Provider>
    </>
  );
}

export default App;
