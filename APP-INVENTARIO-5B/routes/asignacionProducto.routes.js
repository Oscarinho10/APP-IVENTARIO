const express = require('express');

const AsignacionProductoController = require('../controllers/asignacionProducto.controller');
const router = express.Router();

//Obtener todas las asignaciones
router.get('/', AsignacionProductoController.getAllAsignacionesActivas);
// router.get('/idPersona/:id', AsignacionProductoController.getAllAsignacionesProductosByPersona);
router.post('/', AsignacionProductoController.createAsignacionProducto);
router.post('/asignacionProductos', AsignacionProductoController.createAsignacionProductos);


module.exports = router;