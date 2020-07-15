import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyMapOnly2'
})
export class KeyMapOnly2Pipe implements PipeTransform {
  transform(data: {}): any {
    const p=Object.keys(data).map(item => ({key: item, value: data[item]}));
    if(p.length>1)
      return [p[0], p[1]]
    else if(p.length>0)
      return [p[0]]
    else return []
  }
}
