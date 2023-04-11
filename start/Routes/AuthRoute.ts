import Route from '@ioc:Adonis/Core/Route'

Route.get('signin', 'AuthController.index')
Route.get('signout', 'AuthController.signOut')

Route.group(() => {
  Route.post('signin', 'AuthController.signIn')
  Route.post('signup', 'AuthController.signUp')
}).prefix('/api')
