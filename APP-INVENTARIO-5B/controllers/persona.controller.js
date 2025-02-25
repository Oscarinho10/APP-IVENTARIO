const PersonaService = require("../services/persona.service");

class PersonaController {
    async getAllPersonas(req, res) {
        try {
            const personas = await PersonaService.getAllPersonas();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(personas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPersonaById(req, res) {
        try {
            //Validar que el Id venga en la petición
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El Id de la persona es requerido');
            }
            const persona = await PersonaService.getPersonaById(personaId);
            res.json(persona);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createPersona(req, res) {
        try {
            const persona = await PersonaService.createPersona(req.body);
            res.json(persona);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePersona(req, res) {
        try {
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El Id de la persona es requerido');
            }

            const persona = await PersonaService.updatePersona(personaId, req.body);
            res.json(persona);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletePersona(req, res) {
        try {
            const { id } = req.params; 
            const personaId = await PersonaService.deletePersona(id);
            
            if (!personaId) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
            
            res.json({ message: 'Persona eliminada con éxito', personaId: personaId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PersonaController();