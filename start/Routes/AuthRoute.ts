import Route from '@ioc:Adonis/Core/Route'

Route.get('signin', 'AuthController.index')

Route.group(() => {
  Route.get('signout', 'AuthController.signOut')
  Route.post('signin', 'AuthController.signIn')
  Route.post('signup', 'AuthController.signUp')
}).prefix('/api')
