import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  async index({ view }: HttpContextContract) {
    return view.render('product/index', { products: await Product.all() })
  }

  async create({ request, response }: HttpContextContract) {
    console.log(request.all())
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

    await Product.create({
      product_name: body.product_name,
      product_img: body.product_img.fileName,
    })

    return response.redirect().toRoute('products.index')
  }
}
