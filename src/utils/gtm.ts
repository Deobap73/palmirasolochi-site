// src/utils/gtm.ts
'use strict';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function gtmEvent(name: string, params: Record<string, unknown> = {}): void {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: name,
      ...params,
    });
  }
}
