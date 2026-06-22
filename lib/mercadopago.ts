import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

function getClient() {
  if (!_client) {
    _client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN ?? "",
    });
  }
  return _client;
}

export interface MPItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

export interface MPPayer {
  name: string;
  email: string;
  phone?: { number: string };
}

export async function createPreference(params: {
  orderId: string;
  items: MPItem[];
  payer: MPPayer;
  appUrl: string;
}) {
  const preference = new Preference(getClient());
  const response = await preference.create({
    body: {
      external_reference: params.orderId,
      items: params.items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: item.currency_id ?? "BRL",
      })),
      payer: {
        name: params.payer.name,
        email: params.payer.email,
        phone: params.payer.phone ? { number: params.payer.phone.number } : undefined,
      },
      back_urls: {
        success: `${params.appUrl}/pedido/${params.orderId}?status=aprovado`,
        failure: `${params.appUrl}/pedido/${params.orderId}?status=falhou`,
        pending: `${params.appUrl}/pedido/${params.orderId}?status=pendente`,
      },
      auto_return: "approved",
      notification_url: `${params.appUrl}/api/orders/webhook`,
    },
  });
  return response;
}

export async function getPayment(paymentId: string) {
  const payment = new Payment(getClient());
  return payment.get({ id: paymentId });
}
