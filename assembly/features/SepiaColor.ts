const BYTES_PER_PIXEL = 4;

function sepiaColors(width: i32, height: i32): void {
    let offset = width * height * BYTES_PER_PIXEL;

    //(112, 66, 20)

    // outputRed = (inputRed * .393) + (inputGreen * .769) + (inputBlue * .189)
    // outputGreen = (inputRed * .349) + (inputGreen * .686) + (inputBlue * .168)
    // outputBlue = (inputRed * .272) + (inputGreen * .534) + (inputBlue * .131)

//     for (let i = 0; i < offset; i += 4) {

//         let red = load<u8>(i);
//         let green = load<u8>(i + 1);
//         let blue = load<u8>(i + 2);
//         let alpha = load<u8>(i + 3);


//         let oRed = (red * .393) + (green * .669) + (blue * .389) / 3;
//         let oGreen = (red * .349) + (green * .586) + (blue * .368) / 3;
//         let oBlue = (red * .272) + (green * .434) + (blue * .00031) / 3;

//         rgbValues[i + 2] = (byte)Math.Min((.393 * red) + (.769 * green) + (.189 * blue), 255.0); // red
//         rgbValues[i + 1] = (byte)Math.Min((.349 * red) + (.686 * green) + (.168 * blue), 255.0); // green
//         rgbValues[i + 0] = (byte)Math.Min((.272 * red) + (.534 * green) + (.131 * blue), 255.0); // blue
// }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let i = (y * 4) * width + x * 4;

            let red = load<u8>(i);
            let green = load<u8>(i + 1);
            let blue = load<u8>(i + 2);
            let alpha = load<u8>(i + 3);

            let avg = (red + green + blue * 0.0722) / 2.5;

            let oRed = (red * .393) + (green * .469) + (blue * .0389);
            let oGreen = (red * .349) + (green * .386) + (blue * .0268);
            let oBlue = (red * .272) + (green * .354) + (blue * .0031);


            store<u8>(offset + i, <u8>oRed)
            store<u8>(offset + i + 1, <u8>oGreen)
            store<u8>(offset + i + 2, <u8>oBlue)
            store<u8>(offset + i + 3, alpha)
        }
    }
}

export { sepiaColors };