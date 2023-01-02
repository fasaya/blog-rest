/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {

  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.get("posts", "PostsController.index");
  Route.get("posts/:slug", "PostsController.show");

  Route.group(() => {
    Route.put("posts/:slug", "PostsController.update");
    Route.post("posts", "PostsController.store");
  }).middleware("auth:api");

}).namespace('App/Controllers/Http/v1').prefix("v1");