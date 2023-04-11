import Route from '@ioc:Adonis/Core/Route'

Route.get('/products', 'ProductsController.index').as('products.index').middleware('auth')
