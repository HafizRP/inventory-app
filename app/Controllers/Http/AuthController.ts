import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  async index({ view }: HttpContextContract) {
    return view.render('auth/signin')
  }

  async store({ request }: HttpContextContract) {
    const dto = schema.create({
      username: schema.string(),
      password: schema.string(),
    })

    const body = await request.validate({
      schema: dto,
      messages: {
        required: 'The {{ field }} is required!',
      },
    })

    return body
  }

  async signin({ request, auth, response, session }: HttpContextContract) {
    const { uid, password } = request.only(['uid', 'password'])

    const dto = schema.create({
      uid: schema.string(),
      password: schema.string(),
    })

    await request.validate({
      schema: dto,
      messages: {
        'uid.required': 'Username or email is required!',
        'required': 'The {{ field }} is required!',
      },
    })

    try {
      await auth.attempt(uid, password)
    } catch (error) {
      session.flash('form', 'Username or password was incorrect!')
      return response.redirect().back()
    }

    return response.redirect('/')
  }

  async signOut({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('AuthController.index')
  }
}
