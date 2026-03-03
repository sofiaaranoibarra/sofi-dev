import express from "express";
import contactRoutes from "./routes/contact.routes.js";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static (public es la raíz)
app.use(express.static("public"));

// Ruta principal: index.html en la raíz del proyecto
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

// API routes
app.use("/contact", contactRoutes);

// Start
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
