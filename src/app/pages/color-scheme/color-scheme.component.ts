import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorPickerService, Cmyk, OutputFormat } from 'ngx-color-picker';
import { colorSchemesService } from '../../services/colorSchemes.service';

@Component({
  selector: 'app-color-scheme',
  templateUrl: './color-scheme.component.html',
  styleUrls: ['./color-scheme.component.scss']
})
export class ColorSchemeComponent implements OnInit {
  colorText: string = 'a1619c'
  constructor(private colorSrv: colorSchemesService, private active: ActivatedRoute,) {
    this.colors = this.fillColors(5, 5)
  }
  ngOnInit(): void {
    this.fillColors(5, 8)
    console.log(this.mixColors('#ffffff', '#1999c8'))

    this.active.params.subscribe((p) => this.getId(p['id']));


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

  async getId(colors: string): Promise<void> {
    if (!colors) {
      return;
    }
    console.log('%cMyProject%cline:39%cuid', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 38, 58);padding:3px;border-radius:2px', colors)
    let itens = colors.split('-')
    const partes_com_hashtag: string[] = itens.map(it => "#" + it);
    console.log('%cMyProject%cline:42%cpartes_com_hashtag', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px', partes_com_hashtag)
  }
  fillColors(columns: number, rows: number) {
    let matrixColors: any = [];
    for (let i = 0; i < rows; i++) {
      matrixColors[i] = [];
      let color = '#ffffff'
      // let color = this.gerarCoresHex()
      // let colorTemp = color;
      for (let j = 0; j < columns; j++) {
        // colorTemp = this.aumentarBrilhoESaturacaoCorHex(colorTemp,10,6)
        //
        matrixColors[i][j] = { value: color };
      }
    }
    let midle = Math.round(matrixColors[0].length / 2) - 2
    for (let i = 0; i < rows; i++) {
      let color = this.gerarCoresHex()
      let colorTemp = color;
      for (let j = midle; j < columns; j++) {
        if (j !== midle) {
          colorTemp = this.aumentarBrilhoESaturacaoCorHex(colorTemp, 10, -10)
        }
        //
        matrixColors[i][j] = { value: colorTemp };
      }
      colorTemp = color;
      for (let j = 0; j < midle; j++) {
        colorTemp = this.aumentarBrilhoESaturacaoCorHex(colorTemp, -10, 10)
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

  aumentarBrilhoESaturacaoCorHex(corHex: string, aumentoBrilho: number, aumentoSaturacao: number): string {
    // Converte a cor hexadecimal em um objeto HSL
    const corHsl = this.hexToHsl(corHex);
    // Aplica o aumento de brilho e saturação
    const novaCorHsl = {
      h: corHsl.h,
      s: Math.min(corHsl.s + aumentoSaturacao, 100),
      l: Math.min(corHsl.l + aumentoBrilho, 100)
    };
    // Converte a nova cor HSL de volta para o formato hexadecimal
    const novaCorHex = this.hslToHex(novaCorHsl);
    return novaCorHex;
  }
  // Função auxiliar para converter uma cor hexadecimal em HSL
  hexToHsl(hex: string) {
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min, l = (max + min) / 2;
    let h = 0, s = 0;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }
    return { h, s: s * 100, l: l * 100 };
  }
  // Função auxiliar para converter uma cor HSL em hexadecimal
  hslToHex(hsl: { h: number, s: number, l: number }) {
    const h = hsl.h, s = hsl.s / 100, l = hsl.l / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  gerarCorOposta(corHex: string) {
    // Remove o símbolo '#' do início do valor hexadecimal
    const corSemHash = corHex.replace('#', '');
    // Converte o valor hexadecimal em um número inteiro
    const corInt = parseInt(corSemHash, 16);
    // Inverte os bits do número inteiro e converte o resultado de volta para hexadecimal
    const corIntOposta = 0xFFFFFF - corInt;
    const corHexOposta = corIntOposta.toString(16).padStart(6, '0');
    // Adiciona o símbolo '#' no início do valor hexadecimal resultante
    const corOposta = `#${corHexOposta}`;
    let res = this.calcularContraste(corHex, corOposta)
    if (res < 4) {
      let res2 = this.calcularContraste(corHex, '#000000')
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
    const contraste = (l1 > l2) ? ((l1 + 0.05) / (l2 + 0.05)) : ((l2 + 0.05) / (l1 + 0.05));
    // Retorna o valor do contraste
    return contraste;
  }
  hexToRgba(hex: string): { r: number, g: number, b: number, a: number } {
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
    const rlinear = (rsrgb <= 0.03928) ? (rsrgb / 12.92) : ((rsrgb + 0.055) / 1.055) ** 2.4;
    const glinear = (gsrgb <= 0.03928) ? (gsrgb / 12.92) : ((gsrgb + 0.055) / 1.055) ** 2.4;
    const blinear = (bsrgb <= 0.03928) ? (bsrgb / 12.92) : ((bsrgb + 0.055) / 1.055) ** 2.4;
    const l = 0.2126 * rlinear + 0.7152 * glinear + 0.0722 * blinear;
    return l;
  }


  saveColors() {

    this.colorSrv.saveColors(this.colors)
    this.colors = this.colorSrv.getColorsById(1)


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
      const r = r1 + Math.floor(i * dr / 10);
      const g = g1 + Math.floor(i * dg / 10);
      const b = b1 + Math.floor(i * db / 10);

      // Converte os valores RGB de volta para hexadecimal
      const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

      // Adiciona a cor à lista de cores intermediárias
      colors.push(hexColor);
    }

    // Retorna a lista de cores intermediárias
    return colors;
  }


}
