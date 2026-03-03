import { Router } from "express";

const router = Router();

// POST /contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son obligatorios."
    });
  }

  // Validación simple de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "El email no es válido."
    });
  }

  // Simulación de envío (más adelante podés integrar nodemailer)
  console.log("Nuevo mensaje recibido:");
  console.log({
    name,
    email,
    message
  });

  return res.status(200).json({
    success: true,
    message: "Mensaje enviado correctamente 🚀"
  });
});

export default router;