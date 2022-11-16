import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const phone = value as string;
    return phone.replace(/(.{2})/g, '$1 ').trim();
  }

}
