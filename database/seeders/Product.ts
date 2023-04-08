import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([{ product_name: 'Flash Disk' }])
    // Write your database queries inside the run method
  }
}
