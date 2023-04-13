import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProductsController.index').as('index').middleware('auth')
  Route.get('/card', ({ view }) => {
    return view.render('product/card')
  }).as('card')
})
  .as('products')
  .prefix('/product')
