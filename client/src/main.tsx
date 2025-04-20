import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./hooks/auth";
import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthProvider>
);
