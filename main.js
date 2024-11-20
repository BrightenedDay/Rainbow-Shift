console.log("Loaded in");

const sleep = ms => new Promise(res => setTimeout(res, ms));

function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

function map2hex(value) {
    if (value == 10)
        return 'A';
    else if (value == 11)
        return 'B';
    else if (value == 12)
        return 'C';
    else if (value == 13)
        return 'D';
    else if (value == 14)
        return 'E';
    else if (value == 15)
        return 'F';

    return value;
}

function rgb2hex(red, green, blue) {
    let redHex = map2hex(Math.floor(red / 16)).toString() + map2hex(Math.floor(red % 16)).toString();
    let greenHex = map2hex(Math.floor(green / 16)).toString() + map2hex(Math.floor(green % 16)).toString();
    let blueHex = map2hex(Math.floor(blue / 16)).toString() + map2hex(Math.floor(blue % 16)).toString();

    return '#' + redHex + greenHex + blueHex;
}

let color1 = [255, 0 ,0];
let color2 = [255, 0 ,0];
let timeBackground = 0;
let timeLabel = 45;
let brightness = 1;

function SetNextColor(time, color) {
    if (time <= 90)
        color[0] = Math.floor(255 * Math.sin(deg2rad(90 - time)));
    else if (time > 180)
        color[0] = Math.floor(255 * Math.sin(deg2rad(time - 180)));

    if (time <= 180)
        color[1] = Math.floor(255 * Math.sin(deg2rad(time)));

    if (time > 90)
        color[2] = Math.floor(255 * Math.sin(deg2rad(time - 90)));
}

async function loop() {
    await sleep(30);

    SetNextColor(timeBackground, color1);

    if (timeBackground < 270)
        timeBackground++;
    else
        timeBackground = 0;

    document.body.style.backgroundColor = 'rgb(' + color1[0] * brightness + ',' + color1[1] * brightness + ',' + color1[2] * brightness + ')';

    SetNextColor(timeLabel, color2);

    if (timeLabel < 270)
        timeLabel++;
    else
        timeLabel = 0;

    var label1 = document.getElementById("label1");
    var label2 = document.getElementById("label2");
    label1.style.color = rgb2hex(color2[0], color2[1], color2[2]);
    label2.style.color = rgb2hex(color2[0], color2[1], color2[2]);

    //console.log('rgb(' + color[0] * brightness + ',' + color[1] * brightness + ',' + color[2] * brightness + '), hex(' + rgb2hex(color[0], color[1], color[2]) + ')');

    loop();
}
loop();