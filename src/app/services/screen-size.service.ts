import { Injectable } from '@angular/core';

export enum ScreenSize {
  DESKTOP_ANY = 'desktop-any',
  DESKTOP_WIDE = 'desktop-wide',
  DESKTOP = 'desktop',
  DESKTOP_NARROW = 'desktop-narrow',
  DESKTOP_NOT_NARROW = 'desktop-not-narrow',

  TABLET_ANY = 'tablet-any',
  TABLET_WIDE = 'tablet-wide',
  TABLET = 'tablet',

  MOBILE_TABLET = 'mobile-tablet',

  MOBILE_ANY = 'mobile-any',
  MOBILE_WIDE = 'mobile-wide',
  MOBILE = 'mobile',
  MOBILE_SMALL = 'mobile-small',
}

const SCREEN_WIDTH_RANGE = {
  [ScreenSize.DESKTOP_ANY]: [1025, Infinity],
  [ScreenSize.DESKTOP_WIDE]: [1440, Infinity],
  [ScreenSize.DESKTOP]: [1025, 1439],
  [ScreenSize.DESKTOP_NARROW]: [1025, 1279],
  [ScreenSize.DESKTOP_NOT_NARROW]: [1280, Infinity],

  [ScreenSize.TABLET_ANY]: [691, 1024],
  [ScreenSize.TABLET_WIDE]: [996, 1024],
  [ScreenSize.TABLET]: [691, 995],

  [ScreenSize.MOBILE_TABLET]: [0, 1024],

  [ScreenSize.MOBILE_ANY]: [0, 690],
  [ScreenSize.MOBILE_WIDE]: [401, 690],
  [ScreenSize.MOBILE]: [0, 400],
  [ScreenSize.MOBILE_SMALL]: [0, 320],
};

@Injectable()
export class ScreenSizeService  {
  isCurrentScreenSize (screenSize:ScreenSize):boolean {
    const [rangeStart, rangeEnd] = SCREEN_WIDTH_RANGE[screenSize];
    const viewportWidth = typeof window !== 'undefined'
      ? window.innerWidth
      : SCREEN_WIDTH_RANGE[ScreenSize.MOBILE_ANY][1]; // mobile by default

    return viewportWidth >= rangeStart && viewportWidth <= rangeEnd;
  }
}
