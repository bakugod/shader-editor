const BYTES_PER_PIXEL = 4;

function blurFilter(width: i32, height: i32): void {
    let offset = width * height * BYTES_PER_PIXEL;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let i = (y * 4) * width + x * 4;

            let red = load<u8>(i);
            let green = load<u8>(i + 1);
            let blue = load<u8>(i + 2);
            let alpha = load<u8>(i + 3);

            store<u8>(offset + i, load<u32>(i))
            store<u8>(offset + i + 1, load<u32>(i))
            store<u8>(offset + i + 2, load<u32>(i))
            store<u8>(offset + i + 3, load<u32>(i))


            // store<u8>(offset + i, <u8>green)
            // store<u8>(offset + i + 1, <u8>red)
            // store<u8>(offset + i + 2, <u8>blue)
            // store<u8>(offset + i + 3, alpha)
        }
    }
}

export { blurFilter };