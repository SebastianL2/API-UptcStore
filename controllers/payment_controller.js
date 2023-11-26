import mercadopage from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";
import { FRONT_URL } from "../utils/constants.js";

export const createOrder = async (req, res) => {
  console.log('body')
  console.log(req.body)
  if (!req.body.items) {
    return res.status(400).json({ message: "Items are required" });
  }
  const itemsToOrder = req.body.items
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopage.preferences.create({
      items: itemsToOrder,
      notification_url: "https://bb67-190-90-15-17.ngrok.io/webhook",
      back_urls: {
        success: `${FRONT_URL}/success`,
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        failure: `${FRONT_URL}/failure`,
      },
    });

    // console.log(result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    // console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      if (data && data.body && data.body.items) {
        // 'data.body.items' contiene la lista de items del pago
        const items = data.body.items;

        // // Ahora puedes acceder a cada item y su cantidad
        // items.forEach((item, index) => {
        //   console.log(`Item ${index + 1}:`);
        //   console.log(`Nombre: ${item.title}`);
        //   console.log(`Cantidad: ${item.quantity}`);
        //   console.log('-------------');
        // });
      }
      //guardar en base de datos el pago
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const success = async (req, res) => {
  //console.log('success')
  //console.log(req.query)
  res.json({ message: "success" });
}
