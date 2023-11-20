import { Router } from 'express';
import 'dotenv/config';
import UserManager from '../../dao/UserManager.js';

const router = Router();

router.post('/sessions/register', async (req, res) => {
    // console.log('entra');
    const { body } = req;
    const newUser = await UserManager.create(body);
    console.log('newUser', newUser);
    res.redirect('/login');
});


router.post('/sessions/login', async (req, res) => {
    const { body } = req
    const { email, password } = body;

    const userAdmin = {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
        rol: process.env.ADMIN_ROL
    };
    // const { body: { email, password } } = req;
    try {
        if (email === userAdmin.username && password === userAdmin.password) {
            req.session.user = { first_name: "Admin", last_name: "Coderhouse", email: userAdmin.username, rol: userAdmin.rol };
            return res.redirect('/products');
        }

        const user = await UserManager.getByMail(email)
        // console.log("user", user)
        if (!user) {
            return res.status(401).send('Correo o contraseña invalidos 😨.');
        }
        const isPassValid = user.password === password;
        if (!isPassValid) {
            return res.status(401).send('Correo o contraseña invalidos 😨.');
        }
        // console.log(user);
        const { first_name, last_name, rol } = user;
        req.session.user = { first_name, last_name, email, rol };
        res.redirect('/products');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/sessions/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/login');
    });
});

export default router;