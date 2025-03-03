const AsignacionProducto = require('../models/asignacionProducto.model')

class AsignacionProductoRepository {
    async getAllAsignacionesActivas() {
        return await AsignacionProducto.find({ estado: 'Activo' }).populate('persona').populate('producto');
    }

    async getAllAsignacionesProductosByPersona(personaId) {
        return await AsignacionProducto.find({ persona: personaId }).populate('producto');
    }

    async createAsignacionProducto(personaId, productoId) {
        const fechaAsignacion = new Date();
        fechaAsignacion.setHours(0, 0, 0, 0);
        return await AsignacionProducto.create({ persona: personaId, producto: productoId, fechaAsignacion: fechaAsignacion, estado: 'Activo' });
    }

    async updateAsigancion(personaId, productoId) {
        // new: true -> devuelve el producto actualizado

    }

    async getAsignacionByNotId(id) {
        return await AsignacionProducto.findOne({ _id: { $ne: id } });
    }

    async deleteAsugnacion(id) {
        return await AsignacionProducto.findByIdAndDelete(id);
    }

    // async contarProductosByYear(year) {
    //     const fechaInicio = new Date(`${year}-01-01T00:00:00.00Z`);
    //     const fechaFin = new Date(`${year}-12-31T23:59:59.999Z`);

    //     return await Producto.countDocuments({
    //         fechaAdquisicion: {
    //             $gte: fechaInicio,
    //             $lte: fechaFin
    //         }
    //     })
    // }
}

module.exports = new AsignacionProductoRepository();
