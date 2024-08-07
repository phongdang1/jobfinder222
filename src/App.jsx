import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import DefaultLayout from "./components/layout/defaultLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
