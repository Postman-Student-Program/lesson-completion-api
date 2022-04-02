import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('test_registrations', function (table) {
    table.string('publishedCourseId').notNullable()
    table.string('lessonId').notNullable()
    table.string('postmanTestCollectionJsonUrl').notNullable()
    table.string('name').notNullable()
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('createdAt').defaultTo(knex.fn.now())

    // composite key of lesson_id and
    table.primary(['publishedCourseId', 'lessonId'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('test_registrations')
}
