import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'post_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('RESTRICT')
      table.integer('parent_id').nullable()
      table.string('title').nullable()
      table.text('content').nullable()
      table.boolean("is_active").defaultTo(0)
      table.timestamp('published_at', { useTz: true })

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
