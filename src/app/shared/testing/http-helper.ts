import { Response, ResponseOptions } from '@angular/http';

export class ErrorResponse extends Response implements Error {
  name: any;
  message: any;
}


export const mockErrorResponse = (status: number) => new ErrorResponse(new ResponseOptions({ status: status }));