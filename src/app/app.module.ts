import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './components/services/guard/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/utils/http-loader-factory';
import { HeaderComponent } from './components/header/header.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { ContactListModalComponent } from './components/contact-list/components/contact-list-modal/contact-list-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    SearchFilterComponent,
    ContactListComponent,
    ContactListModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
