import mongoose from 'mongoose';
import { config } from '../config';

mongoose.connect(config.mongodb.cnxStrAtlas, config.mongodb.options);

mongoose.connection.on('open', () => {
  console.log('Base de datos conectada con exito');
});

mongoose.connection.on('error', () => {
  console.log('Error al conectarse!');
})

class ContenedorMongoDB {

  private _collection;

  constructor(nameCollection: string, schema: any) {
    this._collection = mongoose.model(nameCollection, schema);
  }

  async getById(id: number | string) {
    try {
      console.log("ContenedorMongoDB => getById  => id", id);
      const documents = await this._collection.find({ _id: id.toString() });
      console.log("ContenedorMongoDB => getById  => documents", documents);

      if (documents.length === 0) {
        throw new Error('Error al listar por id: no encontrado')
      } else {
        return documents[0];
      }
    } catch (error) {
      console.log('error', error)
      throw new Error(`Error al listar por id: ${error}`)
    }
  }

  async getAll() {
    try {
      let documents = await this._collection.find();
      return documents;
    } catch (error) {
      console.log('error', error);
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async save(obj: any) {
    try {
      console.log("ContenedorMongoDB => save", obj);
      let document = await this._collection.create(obj);
      return document;
    } catch (error) {
      console.log('save => error', error)
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async update(objUpdate: any, id: number) {
    try {
      let { n, nModified } = await this._collection.replaceOne({ '_id': id }, objUpdate);
      if (n == 0 || nModified == 0) {
        throw new Error('Error al actualizar: no encontrado')
      } else {
        return objUpdate;
      }
    } catch (error) {
      console.log('')
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async updateCarrito(objUpdate: any, id: number) {
    try {
      await this._collection.updateOne({ '_id': id }, { $push: { productos: objUpdate }});
      // if (n == 0 || nModified == 0) {
      //   throw new Error('Error al actualizar: no encontrado')
      // } else {
        return objUpdate;
      // }
    } catch (error) {
      console.log('')
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async deleteById(id: number | string) {
    try {
      const documentDelete = await this._collection.findOneAndDelete({ _id: id });
      return documentDelete;

    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteByIdByIdProduct(id: number, id_product: number) {
    try {
      // https://es.stackoverflow.com/questions/373017/como-eliminar-un-objeto-de-una-colecci%C3%B3n-por-su-id-en-mongodb
      const documentDelete = await this._collection.updateOne({ _id: id }, { $pull: { productos: { _id: id_product } } });
      return documentDelete;

    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this._collection.deleteMany({});

    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}

export default ContenedorMongoDB;