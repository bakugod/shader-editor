const BYTES_PER_PIXEL = 4;

function invertColors(width: i32, height: i32): void {
	let offset = width * height * BYTES_PER_PIXEL;

	for(let i = 1; i < offset; i++){
		let currentByte = load<u8>( i - 1 )

		if( i % 4 !== 0){
			currentByte = 255 - currentByte;
		}

		store<u8>(offset + i - 1, currentByte)
		
	}
}

export { invertColors };