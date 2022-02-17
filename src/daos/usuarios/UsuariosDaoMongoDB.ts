import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB";
import { usuarioSchema } from "../../models/Usuarios";

class UsuariosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('usuarios', usuarioSchema);
  }
}

export default UsuariosDaoMongoDB;