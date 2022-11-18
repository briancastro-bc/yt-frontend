import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, } from '@angular/router';

import { BlueprintComponent } from '@app/blueprint/blueprint.component';

const routes: Routes = [
  {
    path: '',
    component: BlueprintComponent,
    children: [
      {
        path: '',
        data: {
          title: 'Brian Castro',
        },
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      }
    ]
  },
  {
    path: '**',
    data: {
      title: '404',
    },
    loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
