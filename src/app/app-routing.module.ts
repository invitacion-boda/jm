import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    data: {
      title: 'J&M',
      description: 'Te invitamos a nuestra boda',
      type: 'website',
      image: 'https://firebasestorage.googleapis.com/v0/b/boda-2a183.appspot.com/o/boda1.jpg?alt=media&token=7febc69a-ce3a-47c0-8beb-745d881ba99e&_gl=1*5eo3y1*_ga*MTY1MjgxMDg5MS4xNjk3ODU5ODY2*_ga_CW55HF8NVT*MTY5ODcyMzY5MS4xMC4xLjE2OTg3MjM3MjMuMjguMC4w'
    },
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
