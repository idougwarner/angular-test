import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyMap'
})
export class KeyMapPipe implements PipeTransform {
  transform(data: {}): any {
    return Object.keys(data).map(item => ({key: item, value: data[item]}))
  }
}
