import { RequestOptions, RequestOptionsArgs, BaseRequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';

export class CustomRequestOptions extends BaseRequestOptions {

  merge(options?: RequestOptionsArgs): RequestOptions {
    const token = sessionStorage.getItem('api-token');
    if (token) {
      options.headers = new Headers({'Authorization': 'Bearer ' + token});
      options.withCredentials = true;
    }

    options.url = environment.apiUrl + options.url;
    const result = super.merge(options);
    result.merge = this.merge;
    return result;
  }
}
