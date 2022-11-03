const fs = require("fs").promises;
const path = require("path");


class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(producto) {
    try {
      const productos = await this.getAll();
      if (productos.length === 0) {
        producto.id = 1;
      } else {
        producto.id = productos[productos.length - 1].id + 1;
      }
      productos.push(producto);
      await fs.writeFile(
        path.resolve("./", this.nombreArchivo),
        JSON.stringify(productos, null, 2)
      );
      return producto.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const productos = await this.getAll();
      const producto = productos.find((producto) => producto.id === id);
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.readFile(
        path.resolve("./", this.nombreArchivo),
        "utf-8"
      );
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const productos = await this.getAll();
      const producto = productos.find((producto) => producto.id === id);
      if (producto) {
        const index = productos.indexOf(producto);
        productos.splice(index, 1);
        await fs.writeFile(
          path.resolve("./", this.nombreArchivo),
          JSON.stringify(productos, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(
        path.resolve("./", this.nombreArchivo),
        JSON.stringify([], null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

const contenedor = new Contenedor("productos.txt");

const main = async () => {
  await contenedor.save({
    title: "Pancho",
    price: 200,
    thumbnail:
      "url",
  });
  await contenedor.save({
    title: "Lomito",
    price: 700,
    thumbnail:
      "url",
  });
  await contenedor.save({
    title: "Hamburguesa",
    price: 800,
    thumbnail:
      "url",
  });
  const producto = await contenedor.getById(2);
  console.log(producto);
  const productos = await contenedor.getAll();
  console.log(productos);
  await contenedor.deleteById(1);
  await contenedor.deleteAll();
  const productos2 = await contenedor.getAll();
  console.log(productos2);
};

main();