import i3DXCompassServices from 'DS/i3DXCompassServices/i3DXCompassServices';
import Service from './Service';

/**
 * We consider that `widget` object is already accessible in `init` function implemented by extending class.
 */
declare global {
  const widget: any;
}

/**
 * Usual data about platform.
 * May be not exhausting on initialization.
 */
export interface Platform {
  id: string;
  displayName?: string;
}

/**
 * Usual response from `i3DXCompassServices.getPlatformServices`.
 */
export interface PlatformServices {
  platformId: string;
  displayName: string;
  [serviceName: string]: string;
}

export interface WidgetOptions {
  /**
   * Whether to remove styles that are embedded into 3DDashboard widget by default.
   */
  removeDefaultStyles?: boolean;
}

/**
 * Class with typed abstraction of 3DDashboard widget.
 * It also makes working with 3DEXPERIENCE web services more convenient if you use classes extending `Service`.
 */
export default abstract class Widget {
  /**
   * Data about platform that can be accessed via `Widget.platform`.
   */
  static platform: Platform;

  /**
   * Get platform ID and wait for `onLoad` to initialize everything else.
   * @param options Options for widget instantiation
   */
  constructor(options: WidgetOptions = {}) {
    if (!widget) throw new Error(`Application must run as 3DDashboard widget`);
    Widget.platform = { id: widget.getValue('x3dPlatformId') };
    Widget.listen('onLoad').then(this.init);
    if (options.removeDefaultStyles) {
      document.querySelector('link[href*="iframe.css"]')?.remove();
    }
  }

  /**
   * Method intended to be implemented by extending class.
   * It must initialize application when `onLoad` event is being triggered by UWA.
   * There is guarantee that you will have access to `widget` object at the time of `init` is being called.
   */
  abstract init(): void;

  /**
   * Get widget's underlying URL.
   */
  static get href(): string {
    return new URLSearchParams(location.search).get('uwaUrl');
  }

  /**
   * Get underlying URL query parameters.
   */
  static get params(): URLSearchParams {
    return new URLSearchParams(this.href.substring(this.href.indexOf('?') + 1));
  }

  /**
   * Promisified `widget.addEvent`.
   * @param name Name of event
   * @return Promise that is resolved with an array of event result parameters
   */
  static async listen(name: string) {
    return new Promise<any[]>(resolve => widget.addEvent(name, (...args) => resolve(args)));
  }

  /**
   * Request platform service URLs and set them in required `Service` classes.
   * Retrieves display name of the platform as bonus.
   * @param services Array of `Service` classes required for working application
   * @return Promise that is resolved after initial authentication of all services was performed
   */
  protected static async fetchServices(services: typeof Service[]) {
    return new Promise<void>((resolve, reject) => {
      i3DXCompassServices.getPlatformServices({
        platformId: Widget.platform.id,
        onComplete: ({ platformId, displayName, ...urls }: PlatformServices) => {
          Widget.platform.displayName = displayName;
          const authPromises = [];
          for (let service of services) {
            service.url = urls[service.serviceName];
            authPromises.push(service.authenticate());
          }
          Promise.all(authPromises).then(resolve.bind(this));
        },
        onFailure: reject,
        onTimeout: reject
      });
    });
  }
}
