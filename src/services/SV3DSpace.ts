import Service from '../classes/Service';

/**
 * Class facing 3DSpace web services.
 */
export default class SV3DSpace extends Service {
  static topServiceName = '3DSpace';
  protected static authURI = '/resources/v1/application/CSRF';

  protected static signRequests(data: any) {
    this.commonOptions.headers.ENO_CSRF_TOKEN = data.csrf.value;
  }
}
