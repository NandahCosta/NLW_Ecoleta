import {Request, Response} from 'express';
import knex from '../database/connection';


class PointsController{
     // Usamos Query Parms, para filtros, paginbação 
    async index (request:Request, response:Response){
        const {city, uf, items} = request.query
       
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        
        const serializedPoints= points.map(point => {
            return{ 
                ...point,
                image_url:`http://192.168.1.7:3333/uploads/${point.image}` ,
            };
        });


        return response.json(serializedPoints); 
    }

    async show (request:Request, response:Response){
        const { id } = request.params;       
        
        const point = await knex('points').where('id', id).first();

        //Se não encontrar o Ponto
        if (!point) {
            return response.status(400).json({message: 'Point not found.'});
        }

        
        // select * fom items JOIN point_items ON itmes.id = point_items.item_id WHERE point_items.pint_id ={id]} 
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');  // Mostra apenas o nomes dos itens que o ponto coleta 
        // Se encontrar o Ponto

        const serializedPoint=  {          
                ...point,
                image_url:`http://192.168.1.7:3333/uploads/${point.image}` ,
            };
        



        return response.json({point:serializedPoint, items});
    }
    
    // Request Body usamos para criação e edicão
    async create (request:Request, response:Response){
     const{ 
         name,
         email, 
         whatsapp, 
         latitude, 
         longitude, 
         city, 
         uf, 
         items
     } = request.body;  // DESESTRUTURAÇÃO, isso evite que eu faça "const nome = request.body.nome" 
    
     const trx = await knex.transaction();
    
     const point = {
        image: request.file.filename, 
        name,
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city, 
        uf
    }; // Um Objeto com todos os dados de um point

     const insertedIds = await trx('points').insert(point);  //  Short Sintax evita que façamos name: name

       // Relacionamento entra a tabela points e itens 
     const point_id=insertedIds[0];

     const pointItems = items
        .split(',')
        .map((item: string)  => Number(item.trim()))
        .map((item_id: number) => {
        return{
            item_id,
            point_id,
        };
     }) // array de numero 

     await trx('point_items').insert(pointItems);

     await trx.commit();

     return response.json({ 
         id: point_id,
        ...point,//spreadOperator -- ele pega todos os dados do meu objeto 
      });
    }
}

export default PointsController;