import express from "express";
import contactRoutes from "./routes/contact.routes.js";
import path from "path";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static("public"));

// Rutas
app.use("/contact", contactRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});