import { Routes, RouterModule } from '@angular/router';

import{ HomePageComponent} from './home-page/index';
import{ LoginPageComponent} from './login-page/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes= [

    {path:'login', component:LoginPageComponent},
    { path: '', component: HomePageComponent, canActivate: [AuthGuard]  }
]
export const routing = RouterModule.forRoot(appRoutes);