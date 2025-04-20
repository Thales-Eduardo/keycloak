import { Route, Routes } from "react-router-dom";
import { Admin } from "../pages/Admin";
import { Home } from "../pages/home";
import { Public } from "../pages/public/";
import { ProtectedRoute } from "../ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route Component={Public} path="/public" />;
    </Routes>
  );
}
