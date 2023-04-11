import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  async index({ view }: HttpContextContract) {
    const products = await Product.all()

    return view.render('product/index', { products: products })
  }
}
