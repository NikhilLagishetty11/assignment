import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FiltroFetchaPipe } from './filtro-fetcha.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import { appReducer } from 'src/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';

import { HeaderComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { TopnavComponent } from './topnav/topnav.component';
import { BottomnavComponent } from './bottomnav/bottomnav.component';







@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    DashboardComponent,
    FiltroFetchaPipe,
    TopnavComponent,
    BottomnavComponent,
 


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      
      logOnly: environment.production, // Restrict extension to log-only mode
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
