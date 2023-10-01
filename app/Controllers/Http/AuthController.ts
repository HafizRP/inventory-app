import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  async index({ view }: HttpContextContract) {
    return view.render('auth/signin')
  }

  async signUp({ request, session, response }: HttpContextContract) {
    const dto = schema.create({
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
      email: schema.string({}, [rules.unique({ table: 'users', column: 'email', caseInsensitive: true }), rules.email()]),
      first_name: schema.string(),
      last_name: schema.string(),
      password: schema.string(),
      profile_image: schema.file({
        size: "10mb",
        extnames: ['jpg', 'png']
      }),
    })

    const { first_name, last_name, password, profile_image, username, email } = await request.validate({
      schema: dto,
      messages: {
        required: 'The {{ field }} is required!',
        'first_name.required': "First Name required!",
        'last_name.required': "Last Name required!",
        'profile_image.required': "Profile Image required!",
        'username.unique': "Username is already used!",
        'email.unique': 'Email is already used!'
      },
    })

    try {
      await User.create({ last_name, first_name, password, username, email, profile_url: profile_image.filePath })
      await profile_image.move(Application.tmpPath('uploads'))
    } catch (error) {
      console.log(error)
      session.flash("form", "Server Error, Please Wait")
      return response.redirect().back()
    }


    return response.redirect().toRoute('auth.view.signin')

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
