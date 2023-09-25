import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const adobeScriptWealth = document.createElement('script');


adobeScriptWealth.defer = true;
adobeScriptWealth.async = true;

if (environment.production) {
  adobeScriptWealth.src = environment.adobeAnalyticsWealth;
  enableProdMode();
}else {  
  adobeScriptWealth.src = environment.adobeAnalyticsWealth;
}
document.head.appendChild(adobeScriptWealth);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
