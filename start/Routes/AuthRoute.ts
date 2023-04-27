import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('signin', 'AuthController.index').as('view.signin')
  Route.get('signup', 'AuthController.signUpView').as('view.signup')

  Route.group(() => {
    Route.get('signout', 'AuthController.signOut').as('signout')
    Route.post('signin', 'AuthController.signIn').as('signin')
    Route.post('signup', 'AuthController.signUp').as('signup')
  }).prefix('/api')
}).as('auth')
