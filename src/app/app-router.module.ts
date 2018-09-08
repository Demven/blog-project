import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { EditHomePage } from './pages/edit-homepage/edit-homepage';
import { ContactsPage } from './pages/contacts/contacts';
import { EditArticlePage } from './pages/edit-article/edit-article';
import { ArticlePage } from './pages/article/article';
import { Page404 } from './pages/page404/page404';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { CanActivateGuard } from './services/can-activate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'homepage/edit',
    component: EditHomePage,
    canActivate: [CanActivateGuard],
  },
  { path: 'homepage/preview', component: HomePage },
  { path: 'homepage', redirectTo: '' },
  {
    path: 'article/new',
    component: EditArticlePage,
    canActivate: [CanActivateGuard],
  },
  { path: 'article/preview', component: ArticlePage },
  { path: 'article/:slug', component: ArticlePage },
  {
    path: 'article/:slug/edit',
    component: EditArticlePage,
    canActivate: [CanActivateGuard],
  },
  { path: 'contacts', component: ContactsPage },
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: '**', component: Page404 },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    CanActivateGuard,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRouterModule {}
