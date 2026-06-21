export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/conta/pedidos/:path*",
    "/conta/enderecos/:path*",
    "/admin/:path*",
  ],
};
