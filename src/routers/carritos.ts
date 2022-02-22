import { Request, Response, Router } from 'express';
// import ContenedorCarrito from '../utilitario/Carrito';
import { carritosDao as carritosApi } from '../daos/index';
const router = Router();
// const objCarrito = new ContenedorCarrito('db');
// email
import { createTransport } from 'nodemailer'

// email
const TEST_EMAIL = 'jacquelyn.hermiston98@ethereal.email';
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_EMAIL,
    pass: 'GzJVHaBKHmJpTvpE2q'
  }
});
// email

router.get('/', async (req: Request, res: Response) => {
  const response = await carritosApi.getAll();
  res.json({
    message: "All Carrito OK",
    data: response,
    status: 'OK'
  });
});

router.get('/:id/productos', async (req: Request, res: Response) => {
  const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
  // const response = await carritosApi.getProductosPorCarrito(id);
  const response = await carritosApi.getById(id);

  res.json({
    message: "getProductosPorCarrito OK",
    data: response,
    status: 'OK'
  });
});

router.post('/', async (req: Request, res: Response) => {
  const newCarrito = req.body;
  // const response = await carritosApi.saveCarrito();
  const response = await carritosApi.save(newCarrito);

  res.json({
    message: "Carrito guradado",
    data: {
      idCarrito: response._id
    },
    status: 'OK'
  });

});

router.post('/:id/comprar', async (req: any, res: Response) => {
  const id = req.params.id === undefined ? -1 : req.params.id;
  const name = req.user.name;
  const carrito = await carritosApi.getById(id);
  const productos = carrito.productos.map((producto: any) => {
    return `<div>      
    <span style="color: green;">Name:</span>
    <p>${producto.name}</p>    
    </div>`
  });

  const product = carrito.productos.map((producto: any) => {
    return `${producto.name}`;
  });
  let mensaje = `Nuevo pedido de ${name}: \n`;
  product.forEach((producto: any) => {
    mensaje = mensaje + `${producto} \n`;
  });

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: mensaje,
      to: 'whatsapp:+51944954119'
    })
    .then((message: any) => console.log(message.sid));

  let htmlMensaje = `<div>
    <h1>Nuevo pedido de ${name}</h1>`
  let body = "";

  productos.forEach((producto: any) => {
    body = body + producto;
  });
  htmlMensaje = htmlMensaje + body + '</div>';

  try {
    const mailOptions = {
      from: 'Servidor Node.js',
      to: TEST_EMAIL,
      subject: 'Mail de prueba desde Node.js',
      html: htmlMensaje
    }
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
    console.log(`Email enviado a ${TEST_EMAIL}`);
  } catch (error) {
    console.log(error);
  }

  res.json({
    message: "Se realizó la compra correctamente. Se envío el email y whastapp.",
    data: "",
    status: 'OK'
  });

});

router.post('/:id/productos', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const response = await carritosApi.updateCarrito(req.body, idCarrito);

  res.json({
    message: "update carrito ok",
    data: response,
    status: 'OK'
  });

});

router.delete('/:id', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : req.params.id;

  const response = await carritosApi.deleteById(idCarrito);

  res.json({
    message: "delete ok",
    data: [],
    status: 'OK'
  });

});

router.delete('/:id/productos/:id_prod', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const idProducto = req.params.id_prod === undefined ? -1 : parseInt(req.params.id_prod);
  // const response = await carritosApi.deleteProductoDelCarrito(idCarrito, idProducto);
  const response = await carritosApi.deleteByIdByIdProduct(idCarrito, idProducto);  
  res.json({
    message: "delete product de carrito ok",
    data: response,
    status: 'OK'
  });
});

export default router;
