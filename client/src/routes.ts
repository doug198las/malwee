import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { LoginComponent } from "./app/login/login.component";
import { AuthService } from "./services/auth.service";

const chieldRoutes: any = [
  {
    path: 'teste',
    component: HomeComponent,
  }
]

const rootRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthService],
      children: [
        {
          path: '',
          canActivateChild: [AuthService],
          children: chieldRoutes
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];
  
  export const rootRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(rootRoutes, { relativeLinkResolution: 'legacy' });
  