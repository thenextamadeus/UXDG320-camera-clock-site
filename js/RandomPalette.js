class RandomPalette {

  #numberOfColors; // # means private
  #colors;

  constructor(numberOfColors) {
    if(numberOfColors && numberOfColors.isInteger() && numberOfColors > 0)
      this.#numberOfColors = numberOfColors;
  }

  generate(limit) {
    this.#colors = []; // Reset color array

    let i, color, hueBrightness, saturationRatio, newSetEvery, ratio, hueBrightnessDiff, hue, saturation, saturationMax, saturationMin, brightness, brightnessMax, brightnessMin, hueSpan, hueSpanMax, hueSpanMin, hueSpanMaxWide, hueSpanMaxNarrow, hueSpanMinWide, hueSpanMinNarrow, oldSaturation, oldBrightness, oldHueBrightness;

    saturationMax = 100;
    saturationMin = 80;
    hueSpanMaxWide = 100;
    hueSpanMinWide = 60;
    hueSpanMaxNarrow = 20;
    hueSpanMinNarrow = 5;
    brightnessMax = 100;
    brightnessMin = 50;

    newSetEvery = Math.max(2, Math.round(Utility.randomNumberBetween(limit/3, limit)));
    console.log("newSetEvery: " + newSetEvery + ", limit: " + limit);


    for(i = 0; i < limit ; i++)
    {
      if(i === 0) {
        // FIRST COLOR
        hue = Utility.randomNumberBetween(0, 360);
        saturation = Utility.randomNumberBetween(saturationMin, saturationMax);
        brightness = Utility.randomNumberBetween(brightnessMin, brightnessMax);
        saturationRatio = (saturation - saturationMin) / (saturationMax - saturationMin);
        ratio = (saturationRatio + 2*(1-(brightness/100)))/3;

        hueSpanMin = Math.round((1 - saturationRatio) * (hueSpanMinWide - hueSpanMinNarrow) + hueSpanMinNarrow);
        hueSpanMax = Math.round((1 - saturationRatio) * (hueSpanMaxWide - hueSpanMaxNarrow) + hueSpanMaxNarrow);

        hueSpan = Math.round(Utility.randomNumberBetween(hueSpanMin, hueSpanMax));
        color = new Color(Color.HSB, hue, saturation, brightness);
        hueBrightness = color.hueBrightness;
        console.log("%cFIRST COLOR", "background: " + color.hex + "; color: #000");
      } else if(i % newSetEvery === 0) {
        // COMPLEMENTARY COLOR
        hue = this.#colors[this.#colors.length - Math.ceil(newSetEvery / 2)].hsb[0] + 180;
        saturation = Utility.randomNumberBetween(saturationMin, saturationMax);
        brightness = Utility.randomNumberBetween(brightnessMin, brightnessMax);
        saturationRatio = (saturation - saturationMin) / (saturationMax - saturationMin);
        ratio = (saturationRatio + 1-(brightness/100))/2;

        hueSpanMin = Math.round((1 - saturationRatio) * (hueSpanMinWide - hueSpanMinNarrow) + hueSpanMinNarrow);
        hueSpanMax = Math.round((1 - saturationRatio) * (hueSpanMaxWide - hueSpanMaxNarrow) + hueSpanMaxNarrow);

        hueSpan = Math.round(Utility.randomNumberBetween(hueSpanMin, hueSpanMax));
        color = new Color(Color.HSB, hue, saturation, brightness);
        hueBrightness = color.hueBrightness;
        console.log("%cCOMPLEMENTARY COLOR", "background: " + color.hex + "; color: #000");
      } else {
        // INCREMENTAL COLOR VARIANT
        oldHueBrightness = hueBrightness;
        hue += hueSpan;
        hueBrightness = Color.getHueBrightnessForHue(hue);
        hueBrightnessDiff = hueBrightness - oldHueBrightness;
        if(hueBrightnessDiff > 0)
        {
          if(brightness > 0.5) {
            saturation -= Math.abs(hueSpan * hueBrightnessDiff) / 3;
          }
          brightness += Math.abs(hueSpan * hueBrightnessDiff) / 3;
        } else {
          saturation += Math.abs(hueSpan * hueBrightnessDiff) / 3;
          brightness -= Math.abs(hueSpan * hueBrightnessDiff) / 3;
        }
        color = new Color(Color.HSB, hue, saturation, brightness);
        console.log("%cCOLOR VARIANT (hueSpan: " + hueSpan + ")", "background: " + color.hex + "; color: #000");
      }
      this.#colors.push(color);
    }
    //Utility.shuffleArray(this.#colors);
    return this.#colors;
  }

  get colors() {
    return this.#colors;
  }
}
