



const allControllers = require('../controllers/exercise.controller');

const routers = (app) => {
    app.get('/', allControllers.home);
    
}



module.exports = routers;