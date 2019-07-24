const BYTES_PER_PIXEL = 4;

function grayScale(width: i32, height: i32): void {
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

	// for(let i = 1; i < offset; i+=4){

	// let red = load<u8>(i);
	// let green = load<u8>(i + 1);
	// let blue = load<u8>(i + 2);
	// let alpha = load<u8>(i + 3);

	//     //0.299 R + 0.587 G + 0.114 B
	//     let luma = (red * 0.299) + (green * 0.587) + (blue * 0.114);
	//     //let luma = (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
	//     //let intens: f64 = (red+green+blue) / 3;
	//     //let l = Math.ceil(luma / intens);


	//     store<u8>(offset + i, <u8>luma)
	// 	store<u8>(offset + i + 1, <u8>luma)
	// 	store<u8>(offset + i + 2, <u8>luma)
	// 	store<u8>(offset + i + 3, alpha)	
	// }
}

export { grayScale };