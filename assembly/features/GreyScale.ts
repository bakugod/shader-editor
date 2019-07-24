const BYTES_PER_PIXEL = 4;

function greyScale(width: i32, height: i32): void {
	let offset = width * height * BYTES_PER_PIXEL;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {

			let i = (y * 4) * width + x * 4;

			let red = load<u8>(i);
			let green = load<u8>(i + 1);
			let blue = load<u8>(i + 2);
			let alpha = load<u8>(i + 3);

			let avg = (red + green + blue*0.0722) / 2.5;

			store<u8>( offset + i    , <u8>avg )
			store<u8>( offset + i + 1, <u8>avg )
			store<u8>( offset + i + 2, <u8>avg )
			store<u8>( offset + i + 3, alpha )	
		}
	}
}

export { greyScale };