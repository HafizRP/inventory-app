import Route from '@ioc:Adonis/Core/Route'

Route.get('signin', 'AuthController.index')
Route.get('logout', 'AuthController.signOut')

Route.post('signin', 'AuthController.signin')

Route.group(() => {})
