import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  saveEmailForm(data: any) {
    if (data) {
      console.log(data);
    }
  }
}
