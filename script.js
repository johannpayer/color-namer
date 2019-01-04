/*global $*/
var hexElement;
var nameElement;
var hexCode = "";

// Booleans
var fruit_mode = false;

var standard_colors;
$.getJSON("https://raw.githubusercontent.com/flamesdev/color-namer/master/color pallets/standard.json", function(json) {
    "use strict";
    standard_colors = json.Colors;
});
var fruit_colors;
$.getJSON("https://raw.githubusercontent.com/flamesdev/color-namer/master/color pallets/fruit.json", function(json) {
    "use strict";
    fruit_colors = json.Colors;
});

window.onload = function() {
    "use strict";
    hexElement = document.getElementById("hex");
    nameElement = document.getElementById("name");
};

document.addEventListener("keydown", (event) => {
    if (event.keyCode == 18) {
        fruit_mode = !fruit_mode;
    } else {
    var keyName = event.key.toLowerCase();
    var length = hexCode.length;

    if (event.keyCode != 8) {
        if (length < 6 && "0123456789abcdef".split("").includes(keyName))
            hexCode += keyName;
    } else
        hexCode = hexCode.substring(0, length - 1);

    hexElement.innerHTML = "#" + hexCode;
    if (hexCode.length === 6)
        document.body.style.backgroundColor = "#" + hexCode;
    else
        document.body.style.backgroundColor = "black";

    var rgb = Functions.hexToRGB(hexCode);
    var color;
    if (Functions.getAverage(rgb) / 255 >= 0.5)
        color = "black";
    else
        color = "white";
    hexElement.style.color = color;
    nameElement.style.color = color;
    var displayColor = "";
    var colors;
    if (fruit_mode)
            colors = fruit_colors;
        else
            colors = standard_colors;
    if (hexCode.length === 6) {
        var closest = -1;
        Array.prototype.forEach.call(colors, item => {
            var color = Functions.hexToRGB(item.Color);
            var similarity = Math.abs(color[0] - rgb[0]) +
                Math.abs(color[1] - rgb[1]) +
                Math.abs(color[2] - rgb[2]);
            if (closest === -1 || similarity < closest) {
                closest = similarity;
                displayColor = item.Name;
            }
        });
    }
    nameElement.innerHTML = displayColor;
    }
});

class Functions {
    static hexToRGB(hex) {
        if (hex[0] === "#")
            hex = hex.substring(1);
        if (hex.length !== 6)
            return false;
        var values = hex.split(""),
            r, g, b;

        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = parseInt(values[2].toString() + values[3].toString(), 16);
        b = parseInt(values[4].toString() + values[5].toString(), 16);
        return [r, g, b];
    }

    static getAverage(numbers) {
        return this.getTotal(numbers) / numbers.length;
    }

    static getTotal(numbers) {
        var val = 0;
        Array.prototype.forEach.call(numbers, number => {
            val += number;
        });
        return val;
    }
}