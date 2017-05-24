import { RequestOptions, RequestOptionsArgs, BaseRequestOptions } from "@angular/http";
import { environment } from "../../../environments/environment";

export class CustomRequestOptions extends BaseRequestOptions {

  merge(options?: RequestOptionsArgs): RequestOptions {
    options.url = environment.apiUrl + options.url;
    let result = super.merge(options);
    result.merge = this.merge;
    return result;
  }
}
