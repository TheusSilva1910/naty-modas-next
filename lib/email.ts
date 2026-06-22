import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "Naty Modas <noreply@natymodas.com.br>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://natymodas.com.br";

export async function sendOrderConfirmation(params: {
  to: string;
  customerName: string;
  orderId: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  const itemsHtml = params.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #f0e8e8">${item.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:center">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:right">
            R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}
          </td>
        </tr>`
    )
    .join("");

  const total = `R$ ${params.total.toFixed(2).replace(".", ",")}`;
  const orderUrl = `${APP_URL}/pedido/${params.orderId}`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Pedido confirmado · Naty Modas #${params.orderId.slice(-8).toUpperCase()}`,
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf6f6;font-family:Georgia,serif;color:#3a2a2a">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;max-width:560px">
        <tr><td style="background:#3a2a2a;padding:28px 40px;text-align:center">
          <span style="font-size:22px;color:#c9a87c;letter-spacing:0.15em">NATY MODAS</span>
        </td></tr>
        <tr><td style="padding:36px 40px">
          <p style="font-size:22px;margin:0 0 8px">Olá, ${params.customerName}!</p>
          <p style="color:#7a6060;margin:0 0 24px">Seu pedido foi confirmado com sucesso.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px">
            <thead>
              <tr style="border-bottom:2px solid #f0e8e8">
                <th style="text-align:left;padding-bottom:8px">Produto</th>
                <th style="text-align:center;padding-bottom:8px">Qtd</th>
                <th style="text-align:right;padding-bottom:8px">Valor</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="text-align:right;font-size:18px;margin-top:16px">
            Total: <strong style="color:#b05070">${total}</strong>
          </p>
          <div style="text-align:center;margin-top:32px">
            <a href="${orderUrl}" style="background:#3a2a2a;color:#fff;padding:14px 36px;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase">
              Ver meu pedido
            </a>
          </div>
        </td></tr>
        <tr><td style="background:#faf6f6;padding:20px 40px;text-align:center;font-size:11px;color:#9e8080">
          Naty Modas · Boutique Feminina
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  if (error) console.error("[email] Erro ao enviar:", error);
}
