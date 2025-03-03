const ProductoService = require('../services/producto.service');

class ProductoController {

    async getAllProductos(req, res) {
        try {
            const productos = await ProductoService.getAllProductos();
            res.json(productos);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async crearProducto(req, res) {
        try {
            const producto = await ProductoService.crearProducto(req.body);
            res.json(producto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProductoById(req, res) {
        try {
            const productoId = req.params.id;
            if (!productoId || productoId.trim() === '') {
                throw new Error('El Id del producto es requerido');
            }

            const producto = await ProductoService.getProductoById(productoId);
            res.json(producto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProductoByNumSerie(req, res) {
        try {
            const productoNumSerie = req.params.numSerie;
            if (!productoNumSerie || productoNumSerie.trim() === '') {
                throw new Error('El número de serie del producto es requerido');
            }

            const producto = await ProductoService.getProductoByNumSerie(productoNumSerie);
            res.json(producto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProducto(req, res) {
        try {
            const producto = await ProductoService.updateProducto(req.params.id, req.body);
            res.json(producto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProducto(req, res) {
        try {
            const { id } = req.params;
            const productoId = await ProductoService.deleteProducto(id);

            if (!productoId) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.json({ message: 'Producto eliminado con éxito', productoId: productoId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ProductoController();
