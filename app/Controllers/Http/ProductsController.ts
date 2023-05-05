import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  async index({ view, request }: HttpContextContract) {
    const { keyword } = request.qs()
    const page = request.input('page', 1)
    const products = await Product.query()
      .whereILike('product_name', `%${keyword}%`)
      .paginate(page, 20)
    products.baseUrl('/product')

    return view.render('product/index', { products })
  }

  async create({ request, response }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        product_img: schema.file(),
        product_name: schema.string(),
      }),
      messages: {
        required: 'The {{ field }} was required!',
      },
    })

    await body.product_img.move(Application.tmpPath('uploads'))

    const product = await Product.create({
      product_name: body.product_name,
      product_img: body.product_img.fileName,
    })

    try {
      await product.save()
    } catch (error) {}

    return response.redirect().toRoute('products.index')
  }

  async createView({ view }: HttpContextContract) {
    return view.render('product/create-product')
  }

  async getProducts() {
    return Product.all()
  }
}
