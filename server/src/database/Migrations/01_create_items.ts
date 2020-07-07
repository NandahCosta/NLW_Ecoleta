import Knex  from 'knex';

export async function up(knex: Knex){
    // Foi necessário cooplocar o return a frente da criaçõ da tela, pois a tabela não estava sendo gerada 
return knex.schema.createTable('items', table =>{
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  
});
}

export async function down(knex: Knex){
return knex.schema.dropTable('items');

}