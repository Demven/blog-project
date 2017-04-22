import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import HomePage from './pages/home/home';
import ContactsPage from './pages/contacts/contacts';
import ArticlePage from './pages/article/article';
import Page404 from './pages/page404/page404';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'contacts', component: ContactsPage },
  { path: 'article/:slug', component: ArticlePage },
  { path: '**', component: Page404 },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export default class AppRouterModule {}
