import { Request, Response, Router } from 'express';
// import ContenedorProducto from '../utilitario/Producto';
// const Contenedor = require('../utilitario/fileSystem.ts');
import { productosDao as productosApi } from '../daos/index';

const router = Router();
// const objProducts = new ContenedorProducto('db');
// const administrador: boolean;

router.get('/:id?', async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    console.log('Usuario no esta autenticado')
    res.json({
      message: "Usuario no esta autenticado.",
      data: [],
      status: 'Validación'
    });
    return;
  }
  const id: number | string = req.params.id === undefined ? -1 : req.params.id;
  if (id === -1) {
    const response = await productosApi.getAll();
    res.json({
      message: "OK",
      data: response,
      status: 'OK'
    });

  } else {
    const response = await productosApi.getById(id);
   
    res.json({
      message: "Ok",
      data: response,
      status: 'OK'
    });
  }
});

router.post('/', async (req:Request, res: Response) => {
  // console.log('req.body', req.body);
  console.log(`req.query`, req.query)
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;

  if (isAdmin) {
    const response = await productosApi.save(req.body);

    res.json({
      message: "OK",
      data: response,
      status: 'OK'
    });
    
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta / método "POST" no autorizada'
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  // console.log(`req.query`, req.query)
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;

  if (isAdmin) {
    const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
    const body = req.body;
    const response = await productosApi.updateById(body, id);
  
    res.json({
      message: 'put => Acceso administrador',
      data: response,
      status: 'OK'
    });
   
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta /:id método "PUT" no autorizada'
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;
  
  if (isAdmin) {
    const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
    const response = await productosApi.deleteById(id);
  
    res.json({
      message: "Delete Product OK",
      data: response,
      status: 'OK'
    });
   
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta /:id método "DELETE" no autorizada.'
    });
  }
});

export default router;
