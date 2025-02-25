const ProductoRepository = require('../repositories/producto.repository');
const Validaciones = require('../utils/validation');

class ProductoService {
    async getAllProductos() {
        return await ProductoRepository.getAllProductos();
    }

    async crearProducto(producto) {
        //Validar que todos los campos obligatorios vengan
        //Validar que todos los campos obligatorios vengan
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el numero de serie no exista
        const productoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);
        if (productoByNumSerie) {
            throw new Error('El número de serie ya existe');
        }

        //Validar  que el el precio no sea negativo
        if (producto.precio < 1) {
            throw new Error('El precio debe ser mayor a 0');
        }

        //Validar  que la fecha de adquisicion sea válida
        if(!Validaciones.esFechaValida(producto.fechaAdquisicion)){

        }
        //Generar número de inventario
        //año-consecutivo 20225-001
        //Obtener el año de adquisición
        const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];

        let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);


        //Incrementar en 1 el contador
        countYear++;

        producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, '0')}`;

        return await ProductoRepository.crearProducto(producto);
    }
    
    async getProductoById(id) {
        const producto = await ProductoRepository.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        return producto;
    }

    async getProductoByNumSerie(numSerie) {
        const producto = await ProductoRepository.getProductoByNumSerie(numSerie);
        if (!producto) {
            throw new Error('Producto no encontrada');
        }

        return producto;
    }
}

module.exports = new ProductoService();