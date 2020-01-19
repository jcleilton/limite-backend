
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuariossss', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('senha').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuariossss')
};
