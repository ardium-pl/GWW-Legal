import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root',
})
export class MixpanelService {
  constructor() {
    mixpanel.init('4907d2d6d9e231b5ecd7b8fdcfc716d8', {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });
  }

  track(eventName: string, properties?: any) {
    mixpanel.track(eventName, properties);
  }
}
