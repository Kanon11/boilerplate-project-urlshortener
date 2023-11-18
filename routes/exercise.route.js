



const allControllers = require('../controllers/exercise.controller');

const routers = (app) => {
    app.get('/', allControllers.home);
    app.post('/api/users', allControllers.insertUserController);

}



module.exports = routers;