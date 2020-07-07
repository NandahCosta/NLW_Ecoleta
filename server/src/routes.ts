import express, { request, response } from 'express';

import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();// Instanciar a Classe PointsController
const itemsController = new ItemsController();// Instanciar a Classe ItemsController


//******** Rotas*******//
//index, show, create, updatem delete

routes.get('/items',itemsController.index); // exibindo uma listagem
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Criando pontos de coleta (POST)
routes.post(
    '/points', 
     upload.single('image'),
     celebrate({//Celebrate vai validar os campos
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
     },{
        abortEarly:false // aqui fará ele validar todos os campos submetidos.
     }),   
      
     pointsController.create
);// Aciona o metodo para criação do Point
export default routes;