import { DataSource } from 'typeorm'
import config from '../config'
import VerseEntity from './base/entities/verse.entity'
import PicturesEntity from './common/entities/pictures.entity'
import CityEntity from './posts/entities/city.entity'

export const dataSource = new DataSource({
  type: config.DOMAIN_MYSQL_TYPE,
  host: config.DOMAIN_MYSQL_HOST,
  port: config.DOMAIN_MYSQL_PORT,
  database: config.DOMAIN_MYSQL_DB,
  username: config.DOMAIN_MYSQL_USER,
  password: config.DOMAIN_MYSQL_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [VerseEntity, PicturesEntity, CityEntity]
})
