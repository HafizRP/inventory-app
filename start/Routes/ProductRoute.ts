import Route from '@ioc:Adonis/Core/Route'

Route.get('/products', 'ProductsController.getProducts')

Route.group(() => {
  Route.get('/', 'ProductsController.index').as('index')
  Route.get('/create', 'ProductsController.createView').as('view.create')
  Route.post('/', 'ProductsController.create').as('create')
})
  .as('products')
  .prefix('/product')
  .middleware('auth')
