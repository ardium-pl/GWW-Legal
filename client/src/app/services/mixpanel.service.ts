import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';


@Injectable({
  providedIn: 'root',
})
export class MixpanelService {
  constructor() {
    const GWWToken: any = process.env['GWW_Token'];
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