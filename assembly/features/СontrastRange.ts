const BYTES_PER_PIXEL = 4;
const COLORS = 256;

function contrastRange(width: i32, height: i32, ratio: i32): void {
    let offset = width * height * BYTES_PER_PIXEL;

    let contrast = ratio * 2.55;

    let factor = (255 + <i32>contrast) / (255 - <i32>contrast);
    //let factor = (259 * (ratio + 255)) / (255 * (259 - ratio));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let i = (y * 4) * width + x * 4;

            let red = load<u8>(i);
            let green = load<u8>(i + 1);
            let blue = load<u8>(i + 2);
            let alpha = load<u8>(i + 3);
    
            let oRed = factor * (<i32>(red * .1855) - 128) + 128 ;
            let oGreen = factor * (<i32>(green * .1855) - 128) + 128;
            let oBlue = factor * (<i32>(blue * .1855) - 128) + 128;
    
            store<u8>(offset + i, <u8>oRed)
            store<u8>(offset + i + 1, <u8>oGreen)
            store<u8>(offset + i + 2, <u8>oBlue)
            store<u8>(offset + i + 3, alpha)
        }
    }
}

export { contrastRange };