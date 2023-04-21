import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProductsController.index').as('index')

  Route.get('/create', ({ view }) => {
    return view.render('product/createProduct')
  }).as('view.create')

  Route.post('/', 'ProductsController.create').as('create')
})
  .as('products')
  .prefix('/product')
  .middleware('auth')
