import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app.routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { errorInterceptor } from './app/core/interceptors/error-interceptor'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    importProvidersFrom(AppRoutingModule),
    provideAnimations(),
    // AÑADIR PROVEEDOR DE GRÁFICAS:
    provideCharts(withDefaultRegisterables())
  ]
}).catch((err) => console.error(err));