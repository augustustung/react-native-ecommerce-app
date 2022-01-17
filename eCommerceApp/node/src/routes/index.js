import userRoute from './user.route';
import productRoute from './product.route';
import appRoute from './app.route';
import checkAuth from '../controllers/auth';
import usersController from '../controllers/user.controller';
import _onRefreshToken from '../controllers/refreshToken';

let router = (app) => {
    app.get('/', (req, res) => res.send('Helllo, World!'));
    app.post('/signIn', usersController._onSignIn);
    app.post('/signUp', usersController._onSignUp);
    app.delete('/signOut', usersController._onLogOut);
    app.post('/refreshToken', _onRefreshToken);
    app.use('/users', checkAuth, userRoute);
    app.use('/app', appRoute)
    app.use('/products', productRoute);
}

export default router;