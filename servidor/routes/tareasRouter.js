const { Router } = require('express')
const router = Router();
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post('/', 
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

router.get('/',
    auth,
    tareaController.obtenerTareas
)

router.put('/:id', 
    auth,
    tareaController.actualizarTarea
)

router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
)

module.exports = router