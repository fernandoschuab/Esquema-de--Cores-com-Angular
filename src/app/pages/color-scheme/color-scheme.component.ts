import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorPickerService, Cmyk, OutputFormat } from 'ngx-color-picker';
import { colorSchemesService } from '../../services/colorSchemes.service';
@Component({
  selector: 'app-color-scheme',
  templateUrl: './color-scheme.component.html',
  styleUrls: ['./color-scheme.component.scss'],
})
export class ColorSchemeComponent implements OnInit {
  colorText: string = 'a1619c';
  rows = 5;
  columns = 6;
  lightLevel = 3;
  darkLevel = 2;
  minSaturation: number = 40;
  maxSaturation: number = 60;
  minLightness: number = 40;
  maxLightness: number = 60;
  constructor(
    private colorSrv: colorSchemesService,
    private active: ActivatedRoute
  ) {
    this.colors = this.fillColors(this.rows, this.columns);
  }
  ngOnInit(): void {
    this.active.params.subscribe((p) => this.getId(p['id']));
  }
  backgroubdLight: string = '#efefe0';
  public toggle: boolean = false;
  public outPutFormat: OutputFormat = 'hex';
  colors: string[][];
  async getId(colors: string): Promise<void> {
    if (!colors) {
      return;
    }
    console.log('📢[color-scheme.component.ts:38]: colors: ', colors);
    let itens = colors.split('-');
    const partes_com_hashtag: string[] = itens.map((it) => '#' + it);
  }
  fillColors(columns: number, rows: number, colorPreSelected = null) {
    ////////////////////////////////////////////////// Coluna
    if (colorPreSelected) {

      let columnColors = [];
      let colorTemp1 = colorPreSelected ? colorPreSelected : '';
          // encontrar linha do meio 
      let midle1 = Math.round(rows / 2) - 1;
      console.log('📢[color-scheme.component.ts:51]: midle1: ', midle1);
      // Preencher coluna
      for (let j = 0; j < rows; j++) {
        let color = '#ffffff';
        //
        columnColors[j] = { value: color };
      }
      //
      columnColors[midle1] = { value: colorTemp1 };
      let scaleColorMin =  this.calcularIluminacaoCor(colorPreSelected) * (5*22/this.rows) + this.lightLevel;
      console.log(
        '📢[color-scheme.component.ts:110]: scaleColorMin: ',
        scaleColorMin
      );
      for (let j = midle1 + 1; j < rows; j++) {
        colorTemp1 = this.aumentarBrilhoESaturacaoCorHex(
          colorTemp1,
          scaleColorMin,
          -1 * scaleColorMin
        );

        columnColors[j] = { value: colorTemp1 };
      }
      colorTemp1 = colorPreSelected ? colorPreSelected : '';
      for (let j = midle1-1; j >= 0; j--) {
        let scaleColorMax =
          this.calcularIluminacaoCor(colorPreSelected) *  (5*22/this.rows)  - this.darkLevel;
        console.log(
          '📢[color-scheme.component.ts:120]: scaleColorMax: ',
          scaleColorMax
        );
        colorTemp1 = this.aumentarBrilhoESaturacaoCorHex(
          colorTemp1,
          -1 * scaleColorMax,
          scaleColorMax
        );
        columnColors[j] = { value: colorTemp1 };
      }
      console.log(
        '📢[color-scheme.component.ts:68]: columnColors: ',
        columnColors
      );
      return columnColors;
    }
    ////////////////////////////////////////////////// Matrix
    let matrixColors: any = [];
    // Preencher Matrix
    for (let i = 0; i < rows; i++) {
      matrixColors[i] = [];
      let color = '#ffffff';
      for (let j = 0; j < columns; j++) {
        matrixColors[i][j] = { value: color };
      }
    }
    // encontrar coluna meio 
    let midle = Math.round(matrixColors[0].length / 2) - 1;
    for (let i = 0; i < rows; i++) {
      // Gera cor aleatória
      let color = this.gerarCoresHex();
      let colorTemp = color + '';
      console.log("📢[color-scheme.component.ts:108]: colorTemp: ", colorTemp);
      // Preenche parte de cima
      for (let j = midle +1; j < columns; j++) {
          let scaleColorMin = this.calcularIluminacaoCor(color) * (5*22/this.rows) + this.lightLevel;
          console.log(
            '📢[color-scheme.component.ts:110]: scaleColorMin: ',
            scaleColorMin
          );
          colorTemp = this.aumentarBrilhoESaturacaoCorHex(
            colorTemp,
            scaleColorMin,
            -1 * scaleColorMin
          );
        
        matrixColors[i][j] = { value: colorTemp };
      }
      colorTemp = color + '';
      matrixColors[i][midle] = { value: colorTemp };
      for (let j = midle-1; j >= 0; j--) {
        let scaleColorMax =
          this.calcularIluminacaoCor(color) *  (5*22/this.rows)  - this.darkLevel;
        console.log(
          '📢[color-scheme.component.ts:120]: scaleColorMax: ',
          scaleColorMax
        );
        colorTemp = this.aumentarBrilhoESaturacaoCorHex(
          colorTemp,
          -1 * scaleColorMax,
          scaleColorMax
        );
        //
        matrixColors[i][j] = { value: colorTemp };
      }
      // console.log("📢[color-scheme.component.ts:112]: colorTemp: ", colorTemp);
    }
    return matrixColors;
  }
  gerarCoresHex() {
    // let color = Math.floor(Math.random() * 16777215).toString(16);
    // Math.random(): Isso gera um número aleatório entre 0 (inclusive) e 1 (exclusive).
    // Math.random() * 16777215: Multiplica o número aleatório pela quantidade máxima de cores possíveis em hexadecimal (16.777.215).
    // Math.floor(...): Arredonda para baixo o resultado da multiplicação para obter um número inteiro.
    // .toString(16): Converte o número inteiro em uma string hexadecimal.
    // Exemplo de uso com intervalos de saturação de 50 a 80% e brilho de 30 a 70%
    let color = this.getRandomColor();
    console.log('📢[color-scheme.component.ts:90]: color2: ', color);
    return color;
    // console.log('📢[color-scheme.component.ts:84]: color: ', color);
    // while (color.length < 6) {
    //   color = '0' + color;
    // }
    // return '#' + color;
  }
  getRandomColor() {
    const h = Math.floor(Math.random() * 360); // H (hue) de 0 a 360
    const s =
      Math.floor(
        Math.random() * (this.maxSaturation - this.minSaturation + 1)
      ) + this.minSaturation; // S (saturation) dentro do intervalo
    const l =
      Math.floor(Math.random() * (this.maxLightness - this.minLightness + 1)) +
      this.minLightness; // L (lightness) dentro do intervalo
    // Converter HSL para RGB
    const rgbColor = this.hslToRgb(h / 360, s / 100, l / 100);
    // Converter RGB para hexadecimal
    const hexColor = this.rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
    return hexColor;
  }
  hslToRgb(h: number, s: number, l: number): number[] {
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // A cinza quando a saturação é 0
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
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
  }
  rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
  aumentarBrilhoESaturacaoCorHex(
    corHex: string,
    aumentoBrilho: number,
    aumentoSaturacao: number
  ): string {
    // Converte a cor hexadecimal em um objeto HSL
    const corHsl = this.hexToHsl(corHex);
    // Aplica o aumento de brilho e saturação
    const novaCorHsl = {
      h: corHsl.h,
      s: Math.min(corHsl.s + aumentoSaturacao, 100),
      l: Math.min(corHsl.l + aumentoBrilho, 100),
    };
    // Converte a nova cor HSL de volta para o formato hexadecimal
    const novaCorHex = this.hslToHex(novaCorHsl);
    return novaCorHex;
  }
  // Função auxiliar para converter uma cor hexadecimal em HSL
  hexToHsl(hex: string) {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16) / 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    const d = max - min,
      l = (max + min) / 2;
    let h = 0,
      s = 0;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }
    return { h, s: s * 100, l: l * 100 };
  }
  // Função auxiliar para converter uma cor HSL em hexadecimal
  hslToHex(hsl: { h: number; s: number; l: number }) {
    const h = hsl.h,
      s = hsl.s / 100,
      l = hsl.l / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  gerarCorOposta(corHex: string) {
    // Remove o símbolo '#' do início do valor hexadecimal
    const corSemHash = corHex.replace('#', '');
    // Converte o valor hexadecimal em um número inteiro
    const corInt = parseInt(corSemHash, 16);
    // Inverte os bits do número inteiro e converte o resultado de volta para hexadecimal
    const corIntOposta = 0xffffff - corInt;
    const corHexOposta = corIntOposta.toString(16).padStart(6, '0');
    // Adiciona o símbolo '#' no início do valor hexadecimal resultante
    const corOposta = `#${corHexOposta}`;
    let res = this.calcularContraste(corHex, corOposta);
    if (res < 4) {
      let res2 = this.calcularContraste(corHex, '#000000');
      if (res2 < 4) {
        this.colorText = '#FFFFFF';
      } else {
        this.colorText = '#000000';
      }
    } else {
      this.colorText = corOposta;
    }
    // return corOposta;
  }
  calcularContraste(cor1: string, cor2: string): number {
    // Converte as cores em valores RGBA
    const rgba1 = this.hexToRgba(cor1);
    const rgba2 = this.hexToRgba(cor2);
    // Calcula a luminosidade relativa das cores
    const l1 = this.calcularLuminosidadeRelativa(rgba1.r, rgba1.g, rgba1.b);
    const l2 = this.calcularLuminosidadeRelativa(rgba2.r, rgba2.g, rgba2.b);
    // Calcula o contraste entre as cores
    const contraste =
      l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    // Retorna o valor do contraste
    return contraste;
  }
  hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
    // Remove o símbolo '#' do início do valor hexadecimal
    const corSemHash = hex.replace('#', '');
    // Converte o valor hexadecimal em valores RGB
    const r = parseInt(corSemHash.substring(0, 2), 16);
    const g = parseInt(corSemHash.substring(2, 4), 16);
    const b = parseInt(corSemHash.substring(4, 6), 16);
    // Retorna os valores RGB e a opacidade
    return { r, g, b, a: 1 };
  }
  calcularLuminosidadeRelativa(r: number, g: number, b: number): number {
    const rsrgb = r / 255;
    const gsrgb = g / 255;
    const bsrgb = b / 255;
    const rlinear =
      rsrgb <= 0.03928 ? rsrgb / 12.92 : ((rsrgb + 0.055) / 1.055) ** 2.4;
    const glinear =
      gsrgb <= 0.03928 ? gsrgb / 12.92 : ((gsrgb + 0.055) / 1.055) ** 2.4;
    const blinear =
      bsrgb <= 0.03928 ? bsrgb / 12.92 : ((bsrgb + 0.055) / 1.055) ** 2.4;
    const l = 0.2126 * rlinear + 0.7152 * glinear + 0.0722 * blinear;
    return l;
  }
  saveColors() {
    this.colorSrv.saveColors(this.colors);
    this.colors = this.colorSrv.getColorsById(1);
  }
  mixColors(color1: string, color2: string): string[] {
    // Converte as cores hexadecimais em valores RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    // Calcula a diferença entre as cores
    const dr = r2 - r1;
    const dg = g2 - g1;
    const db = b2 - b1;
    // Cria uma lista com 10 tons intermediários
    const colors = [];
    for (let i = 1; i <= 10; i++) {
      // Calcula o valor RGB de cada tom intermediário
      const r = r1 + Math.floor((i * dr) / 10);
      const g = g1 + Math.floor((i * dg) / 10);
      const b = b1 + Math.floor((i * db) / 10);
      // Converte os valores RGB de volta para hexadecimal
      const hexColor = `#${r.toString(16).padStart(2, '0')}${g
        .toString(16)
        .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      // Adiciona a cor à lista de cores intermediárias
      colors.push(hexColor);
    }
    // Retorna a lista de cores intermediárias
    return colors;
  }
  colorChanged(evt: any) {
    console.log(
      '📢[color-scheme.component.ts:288]: ',
      this.colors[evt.column][evt.line]
    );
    this.colors[evt.column] = this.fillColors(1, this.rows, evt.color);
    console.log('📢[color-scheme.component.ts:287]: evt: ', evt, this.colors);
  }
  calcularIluminacaoCor(hex: string) {
    // Remover o "#" inicial, se presente
    hex = hex.replace('#', '');
    // Converter para RGB
    let r = parseInt(hex.substring(0, 2), 16); // Componente vermelho
    let g = parseInt(hex.substring(2, 4), 16); // Componente verde
    let b = parseInt(hex.substring(4, 6), 16); // Componente azul
    // Calcular a luminosidade (luminance)
    // Fórmula de luminosidade baseada na percepção humana de cores
    let luminosidade = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    console.log("📢[color-scheme.component.ts:378]: luminosidade: ", luminosidade);
    // let luminosidade = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminosidade > 0.5) {
      luminosidade = 1 - luminosidade;
    }
    return luminosidade;
  }
}
