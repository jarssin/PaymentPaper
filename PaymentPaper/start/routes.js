'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// routes of user
Route.group(() => {
    Route.post('/', 'UserController.store')
    Route.post('login', 'UserController.login')
}).prefix('users').middleware(['guest'])

Route.group(() => {
    Route.get('/', 'PaymentPaperController.index')
    Route.post('/', 'PaymentPaperController.store')
    Route.post('/items', 'PaymentPaperController.storeItems')
    Route.post('/release', 'PaymentPaperController.release')
    Route.delete('/:id', 'PaymentPaperController.destroy')
}).prefix('payment-paper').middleware(['auth'])
