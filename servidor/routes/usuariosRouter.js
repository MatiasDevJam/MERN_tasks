const { Router } = require('express')
const router = Router();
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator')

// crea un usuario
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres como mínimo').isLength({ min:6 }),
    ],
    usuarioController.crearUsuario
);

module.exports = router;