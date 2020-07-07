import Knex  from 'knex';


export async function up(knex: Knex){

    // Foi necessário cooplocar o return a frente da criaçõ da tela, pois a tabela não estava sendo gerada 
return knex.schema.createTable('points', table =>{
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable();
});
}

export async function down(knex: Knex){
return knex.schema.dropTable('points');

}