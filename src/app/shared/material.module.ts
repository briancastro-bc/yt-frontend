import { NgModule } from '@angular/core';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  imports: [
    MatSnackBarModule,
  ],
  exports: [
    MatSnackBarModule,
  ],
})
export class MaterialModule {}
