import User from 'App/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
    })
    await user
      .related('products')
      .createMany([
        { product_name: 'Flash Disk' },
        { product_name: 'Hard Disk' },
        { product_name: 'VGA Card' },
        { product_name: 'Processor' },
      ])
    // Write your database queries inside the run method
  }
}
