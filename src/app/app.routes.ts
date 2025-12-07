import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./Pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./Pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./Pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./Pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./Pages/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'address',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Pages/address/address.component').then(
        (m) => m.AddressComponent
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'test',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./test/test.component').then((m) => m.TestComponent),
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./test/components/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./test/components/customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
      },
      {
        path: 'vendors',
        loadComponent: () =>
          import('./test/components/vendors/vendors.component').then(
            (m) => m.VendorsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
