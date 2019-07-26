const BYTES_PER_PIXEL = 4;

function loliColor(width: i32, height: i32): void {
	let offset = width * height * BYTES_PER_PIXEL;

	for(let i = 1; i < offset; i+=4){

        let red = load<u8>(i);
        let green = load<u8>(i + 1);
        let blue = load<u8>(i + 2);
		let alpha = load<u8>(i + 3);
		
	    let luma = (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);

	    store<u8>(offset + i, <u8>luma)
		store<u8>(offset + i + 1, <u8>luma)
		store<u8>(offset + i + 2, <u8>luma)
		store<u8>(offset + i + 3, alpha)	
	}
}

export { loliColor };