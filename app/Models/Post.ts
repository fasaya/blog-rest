import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number;

  @column()
  public parent_id: number;

  @column()
  public slug: string;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public is_active: number;

  @column()
  public meta_title: string;

  @column()
  public meta_description: string;

  @column()
  public published_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
