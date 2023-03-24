import { Component, Input } from '@angular/core';
import { OutputFormat } from 'ngx-color-picker';

@Component({
  selector: 'app-column-colors',
  templateUrl: './column-colors.component.html',
  styleUrls: ['./column-colors.component.scss']
})
export class ColumnColorsComponent {
  @Input('colors')colors: Array<any> = [];
  @Input('colorText')colorText: string = '#a1619c';
  backgroundLight: string = '#D9D8D9'
  public toggle: boolean = false;
public outPutFormat: OutputFormat = 'hex';
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  items = []
formats = [ 'auto', 'hex', 'rgba', 'hsla']


 
}
