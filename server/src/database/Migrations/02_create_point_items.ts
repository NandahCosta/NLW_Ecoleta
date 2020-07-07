import Knex  from 'knex';


export async function up(knex: Knex){
    // Foi necessário cooplocar o return a frente da criaçõ da tela, pois a tabela não estava sendo gerada 
return knex.schema.createTable('point_items', table =>{
    table.increments('id').primary();
    table.string('point_id')
    .notNullable()
    .references('id')
    .inTable('points');

    table.string('item_id')
    .notNullable()
    .references('id')
    .inTable('items');
  });
}

export async function down(knex: Knex){
return knex.schema.dropTable('point_items');

}