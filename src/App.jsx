import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import DefaultLayout from "./components/layout/defaultLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
