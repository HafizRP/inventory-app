/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'

View.global('active', (title: string, tab: string) => {
  return title === tab ? 'active' : ''
})

View.global('sidebarActive', (title, tab) => {
  return title === tab ? 'border-primary border-start border-2 fw-semibold' : 'link-dark'
})
