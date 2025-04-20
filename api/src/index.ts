import cors from "cors";
import express from "express";
import { isAdmin } from "./middlewares/check-is-admin";
import { keycloakAuthMiddleware } from "./middlewares/ensureAuthentication";

const app = express();
app.use(cors());

app.get("/", keycloakAuthMiddleware, (req, res) => {
  res.send("Usuário Autenticado.");
});

app.get("/admin", isAdmin, (req, res) => {
  res.send("Usuário possui papel de adm.");
});

app.listen(3333, () => {
  console.log("http://localhost:3333");
});
