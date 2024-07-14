import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MixpanelService {
  constructor() {
    const GWWToken: any = environment.dataToken;
    mixpanel.init(GWWToken, {
      debug: false,
      track_pageview: true,
      persistence: 'localStorage',
    });
  }

  track(eventName: string, properties?: any) {
    mixpanel.track(eventName, properties);
  }
}
