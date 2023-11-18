



const allControllers = require('../controllers/exercise.controller');

const routers = (app) => {
    app.get('/', allControllers.home);
    app.post('/api/users', allControllers.insertUserController);
    app.get('/api/users', allControllers.getAllUserController);
    app.post('/api/users/:_id/exercises', allControllers.insertUserExerciseController);
    app.get('/api/users/:_id/logs', allControllers.getAllExercise);

}



module.exports = routers;