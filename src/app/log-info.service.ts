import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInfoService {
  apiResponse: any;

  setResponse(response: any) {
    this.apiResponse = response;
  }

  getResponse(): any {
    return this.apiResponse;
  }
}
