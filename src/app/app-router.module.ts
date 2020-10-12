import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ContactsPage } from './pages/contacts/contacts';
import { ArticlePage } from './pages/article/article';
import { Page404 } from './pages/page404/page404';
import { CMSRedirectGuard } from './services/cms-redirect-guard.service';
import { HomepageDataResolverService } from './services/data-resolvers/homepage-data-resolver.service';
import { ArticleDataResolverService } from './services/data-resolvers/article-data-resolver.service';
import { Page404DataResolverService } from './services/data-resolvers/page-404-data-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      homepageSections: HomepageDataResolverService
    }
  },
  {
    path: 'homepage/edit',
    component: Page404,
    canActivate: [CMSRedirectGuard],
  },
  {
    path: 'homepage/preview',
    component: HomePage,
    resolve: {
      homepageSections: HomepageDataResolverService
    }
  },
  { path: 'homepage', redirectTo: '' },
  {
    path: 'article/new',
    component: Page404,
    canActivate: [CMSRedirectGuard],
  },
  {
    path: 'article/preview',
    component: ArticlePage,
    resolve: {
      article: ArticleDataResolverService
    }
  },
  {
    path: 'article/:slug',
    component: ArticlePage,
    resolve: {
      article: ArticleDataResolverService
    }
  },
  {
    path: 'article/:slug/edit',
    component: Page404,
    canActivate: [CMSRedirectGuard],
  },
  { path: 'contacts', component: ContactsPage },
  {
    path: 'login',
    component: Page404,
    canActivate: [CMSRedirectGuard],
  },
  {
    path: 'logout',
    component: Page404,
    canActivate: [CMSRedirectGuard],
  },
  {
    path: '**',
    component: Page404,
    resolve: {
      page404Data: Page404DataResolverService
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { scrollPositionRestoration: 'enabled' }
    ),
  ],
  providers: [
    CMSRedirectGuard,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRouterModule {}
