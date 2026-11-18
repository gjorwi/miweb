import "./globals.css";

export const metadata = {
  title: "Jorwi Garcia | Ingeniero de Sistemas Full Stack",
  description:
    "Portafolio de Jorwi Garcia, Ingeniero de Sistemas Full Stack. Desarrollo web, APIs y soluciones digitales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
