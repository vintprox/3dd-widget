import Service from '../classes/Service';

/**
 * Class facing 3DSwym web services.
 */
export default class SV3DSwym extends Service {
  static serviceName = '3DSwym';
  protected static authURI = '/api/index/tk';

  protected static signRequests(data: any) {
    this.commonOptions.headers['X-DS-SWYM-CSRFTOKEN'] = data.result.ServerToken;
  }
}
