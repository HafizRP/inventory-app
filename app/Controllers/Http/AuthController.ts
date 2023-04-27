import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  async index({ view }: HttpContextContract) {
    return view.render('auth/signin')
  }

  async signUp({ request }: HttpContextContract) {
    const dto = schema.create({
      username: schema.string({}, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      password: schema.string(),
      profile_image: schema.file({}, [rules.required()]),
    })

    const body = await request.validate({
      schema: dto,
      messages: {
        required: 'The {{ field }} is required!',
      },
    })

    await body.profile_image.move(Application.tmpPath('uploads'))

    return body
  }

  async signIn({ request, auth, response, session }: HttpContextContract) {
    const dto = schema.create({
      uid: schema.string(),
      password: schema.string(),
    })

    const { uid, password } = await request.validate({
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
    return response.redirect().toRoute('authpage')
  }

  async signUpView({ view }: HttpContextContract) {
    return view.render('auth/signup')
  }
}
