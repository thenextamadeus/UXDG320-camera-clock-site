class Color {
  static get RGB() { return "RGB"; };
  static get HSB() { return "HSB"; };
  static get HEX() { return "HEX"; };

  #rgb = [0, 0, 0];
  #hsb = [0, 0, 0];
  #hex = "#000000";

  constructor(mode, ...Components) {
    switch(mode) {
      case Color.RGB:
        this.rgb = [Components[0], Components[1], Components[2]];
        break;
      case Color.HSB:
        this.hsb = [Components[0], Components[1], Components[2]];
        break;
      case Color.HEX:
        this.hex = [Components[0]];
        break;
      default:
        throw "Color mode not recognized!";
    }
  }

  get rgb() {
    //return this.#hsbToRgb(this.#hsb[0], this.#hsb[1], this.#hsb[2]);
    return this.#rgb;
  }
  get red() {
    return this.#rgb[0];
  }
  get green() {
    return this.#rgb[1];
  }
  get blue() {
    return this.#rgb[2];
  }
  set rgb(components) {
    if(components.length !== 3) throw "Color.rgb required 3 components!";
    const red = components[0], green = components[1], blue = components[2];
    if(!red.isInteger() || !green.isInteger() || !blue.isInteger()) throw "Color.rgb components must be integers!";
    if(red < 0 || red > 255) throw "Color.rgb red component out of range!";
    if(green < 0 || green > 255) throw "Color.rgb green component out of range!";
    if(blue < 0 || blue > 255) throw "Color.rgb blue component out of range!";

    this.#rgb = [red, green, blue];
    this.#hsb = this.#rgbToHsb(red, green, blue);
    this.#hex = this.#rgbToHex(red, green, blue);
  }

  get hsb() {
    //return this.#rgbToHsb(this.#rgb[0], this.#rgb[1], this.#rgb[2]);
    return this.#hsb;
  }
  get hue() {
    return this.#hsb[0];
  }
  get saturation() {
    return this.#hsb[1];
  }
  get brightness() {
    return this.#hsb[2];
  }
  set hsb(components) {
    if(components.length !== 3) throw "Color.hsb requires 3 components!";
    let hue = components[0], saturation = components[1], brightness = components[2];
    if(hue < 0) {
      hue = 360 - (-hue % 360);
    } else if(hue > 360) {
      hue %= 360;
    }
    saturation = Math.min(Math.max(saturation, 0), 100);
    brightness = Math.min(Math.max(brightness, 0), 100);

    this.#hsb = [hue, saturation, brightness];
    this.#rgb = this.#hsbToRgb(hue, saturation, brightness);
    this.#hex = this.#rgbToHex(this.#rgb[0], this.#rgb[1], this.#rgb[2]);
  }

  get hex() {
    //let rgb = this.#hsbToRgb(this.#hsb[0], this.#hsb[1], this.#hsb[2]);
    //return this.#rgbToHex(rgb[0], rgb[1], rgb[2]);
    return this.#hex;
  }
  set hex(hexString) {
    if(!(typeof hexString === 'string' || hexString instanceof String)) throw "Color.hex requires a string!";
    if(hexString.length != 4 && hexString.length != 7) throw "Color.hex string has wrong format!";
    //this.#rgb = this.#hexToRgb(hexString);
    this.#rgb = this.#hexToRgb(hexString);
    this.#hsb = this.#rgbToHsb(this.#rgb[0], this.#rgb[1], this.#rgb[2]);
    this.#hex = this.#expandHexShorthand(hexString);
  }

  get hueBrightness() {
    return Color.getHueBrightnessForHue(this.#hsb[0]);
  }

  static getHueBrightnessForHue(hue)
  {
    let brightness = 0;
    switch(hue) {
      case 0:
      case 120:
      case 240:
      case 360:
        brightness = 0;
        break;
      case 60:
      case 180:
      case 300:
        brightness = 1;
        break;
      default:
        if((hue > 0 && hue < 60) || (hue > 120 && hue < 180) || (hue > 240 && hue < 300)) {
          brightness = (hue % 60) / 60;
        } else {
          brightness = 1 - ((hue % 60) / 60);
        }
    }

    return brightness;
  }



  #rgbToHsb(red, green, blue) {
      // Convert RBG values to 0-1 ratios
      red /= 255, green /= 255, blue /= 255;

      const max = Math.max(red, green, blue),
        min = Math.min(red, green, blue),
        diff = max - min;

      var hue;
      if(diff === 0) {
        hue = 0;
      } else {
        switch(max) {
          case red: hue = (green - blue) / diff + (green < blue ? 6 : 0); break;
          case green: hue = (blue - red) / diff + 2; break;
          case blue: hue = (red - green) / diff + 4; break;
        }
        hue /= 6;
      }

      return [hue * 360, max && (diff / max) * 100, max * 100];
  }

  #hsbToRgb(hue, saturation, brightness) {
    saturation /= 100, brightness /= 100;
    const k = (n) => (n + hue / 60) % 6;
    const f = (n) => brightness * (1 - saturation * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    const red = Math.round(255 * f(5));
    const green = Math.round(255 * f(3));
    const blue = Math.round(255 * f(1));

    return [red, green, blue];
  }

  #rgbToHex(red, green, blue) {
    return "#" + this.#componentToHex(red) + this.#componentToHex(green) + this.#componentToHex(blue);
  }

  #componentToHex(component) {
    var hex = component.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  #hexToRgb(hex) {
    hex = this.#expandHexShorthand(hex);

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  }

  #expandHexShorthand(hex) {
    // Expand shorthand form (e.g.: "#03F") to full form (e.g.: "#0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    return hex;
  }
}
