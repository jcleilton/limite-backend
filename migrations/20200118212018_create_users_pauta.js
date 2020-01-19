
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pautas', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.string('detalhes').notNull().unique()
        table.integer('status')
        table.integer('userId').references('id').inTable('usuarios').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pautas')
};
