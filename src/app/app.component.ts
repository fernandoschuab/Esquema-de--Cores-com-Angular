import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ColorPickerService, Cmyk, OutputFormat } from 'ngx-color-picker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
    this.colors = this.fillColors(5, 5)
  }
  ngOnInit(): void {
    this.fillColors(5, 8)
  }
  backgroubdLight: string = '#efefe0'
  public toggle: boolean = false;
  public outPutFormat: OutputFormat = 'hex';
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';
  items = []
  formats = ['auto', 'hex', 'rgba', 'hsla']
  public colorList = [
    { key: "flame", value: "#e45a33", friendlyName: "Flame" },
    { key: "orange", value: "#fa761e", friendlyName: "Orange" },
    { key: "infrared", value: "#ef486e", friendlyName: "Infrared" },
    { key: "male", value: "#4488ff", friendlyName: "Male Color" },
    { key: "female", value: "#ff44aa", friendlyName: "Female Color" },
  ];
  colors: string[][]
  fillColors(columns: number, rows: number) {
    let matrixColors: any = [];
    for (let i = 0; i < rows; i++) {
      matrixColors[i] = [];
      let color = this.gerarCoresHex()
      console.log('%cMyProject%cline:33%ccolor', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(222, 125, 44);padding:3px;border-radius:2px', color)
      
      
      let colorTemp = color;
    
      for (let j = 0; j < columns; j++) {
        colorTemp = this.aumentarBrilhoCorHex(colorTemp,30)
        console.log('%cMyProject%cline:39%ccolorTemp', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(56, 13, 49);padding:3px;border-radius:2px', colorTemp)
        
 
//  
        matrixColors[i][j] = { value: colorTemp };
      }
    }
    return matrixColors;
  }
  gerarCoresHex() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 6) {
      color = "0" + color;
    }
    return "#" + color;
  }

   aumentarBrilhoCorHex(corHex: string, aumentoBrilho: number): string {
    // Converte a cor hexadecimal em um objeto RGB
    const corRgb = [
      parseInt(corHex.substr(1, 2), 16),
      parseInt(corHex.substr(3, 2), 16),
      parseInt(corHex.substr(5, 2), 16)
    ];
  
    // Aplica o aumento de brilho a cada componente RGB
    const novaCorRgb = corRgb.map(c => Math.min(c + aumentoBrilho, 255));
  
    // Converte a nova cor RGB de volta para o formato hexadecimal
    const novaCorHex = '#' + novaCorRgb.map(c => c.toString(16).padStart(2, '0')).join('');
  
    return novaCorHex;
  }
  






   ajustarCor(hex: string, saturacao: number, brilho: number): string {
    // converter a cor hexadecimal em RGB
    const r = parseInt(hex.substring(1,3), 16);
    const g = parseInt(hex.substring(3,5), 16);
    const b = parseInt(hex.substring(5,7), 16);
    // converter RGB em HSL
    const hsl = this.rgbToHsl(r, g, b);
    // calcular a porcentagem atual de saturação e brilho
    const pctSat = hsl[1] * 100;
    const pctBri = hsl[2] * 100;
    // ajustar a saturação e o brilho em relação à porcentagem atual
    hsl[1] += pctSat * (saturacao / 100);
    hsl[2] -= pctBri * (brilho / 100);
    // converter HSL de volta para RGB
    const rgb = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
    
    // converter RGB de volta para hexadecimal
    const novoHex = this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    
    return novoHex;
  }
  // função auxiliar para converter RGB em HSL
   rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      if(h){
        h /= 6;
      }else{
        h = 0
      }
    }
    return [h, s, l];
  }
  // função auxiliar para converter HSL em RGB
   hslToRgb(h: number, s: number, l: number): any { // [number, number, number]
    let r, g, b;
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {

        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    
   
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    // return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
   
  }
     rgbToHex(r: number, g: number, b: number): string {
      let hexR = r.toString(16);
      let hexG = g.toString(16);
      let hexB = b.toString(16);
      if (hexR.length == 1) hexR = "0" + hexR;
      if (hexG.length == 1) hexG = "0" + hexG;
      if (hexB.length == 1) hexB = "0" + hexB;
      return "#" + hexR + hexG + hexB;
    }
}
