import { BrowserModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { app_routing } from './app.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

/* tslint:disable:only-arrow-functions */
export function getWindow(): any {
  return (typeof window !== 'undefined') ? window : null;
}

export function getScreen(): any {
  return (typeof screen !== 'undefined') ? screen : null;
}
/* tslint:enable */

// Material
import {
  MatButtonModule
} from '@angular/material';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { exportTranslateStaticLoader } from './shared/i18n/translate-browser-loader.service';

// Pipes
import { TruncatePipe } from './shared/pipes/truncate.pipe';

// Directives
import { ClickStopPropagationDirective } from './shared/directives/click-stop-propagation.directive';

// Services
import { TriggerScrollService } from './shared/services/trigger-scroll.service';

// Components
import { AppComponent } from './app.component';

// Shared
import { MenuContainerComponent } from './shared/components/menu/menu-container/menu-container.component';
import { MenuItemComponent } from './shared/components/menu/menu-item/menu-item.component';
import { JsonLdComponent } from './shared/seo/json-ld.component';
import { OrganizationSdComponent } from './shared/seo/organization-sd.component';

@NgModule({
  declarations: [
    // Directives
    ClickStopPropagationDirective,
    TruncatePipe,

    // Components
    AppComponent,
    OrganizationSdComponent,

    // Shared
    MenuContainerComponent,
    MenuItemComponent,
    JsonLdComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'akazuk' }),
    TransferHttpCacheModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    app_routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient, TransferState]
      }
    }),
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),

    // Material
    MatButtonModule
  ],
  providers: [
    { provide: 'WINDOW', useFactory: getWindow },
    { provide: 'SCREEN', useFactory: getScreen },
    TriggerScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
