(function (){
    const BYTES_PER_PIXEL = 4;
    const PAGE_SIZE = 64 * 1024;

    function init({ instance, memory }){
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const uploader = document.getElementById('uploader')
        const filters = document.getElementById('filters')

        const img = new Image()
        let imageData = null;
        let degree = 0;

        uploader.addEventListener('change', event => {
            img.src = URL.createObjectURL(event.target.files[0]);
    
            img.onload = _ => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

                // RGBA picture, you should know
                const bytesPerImage = img.width * img.height * BYTES_PER_PIXEL;

                //because we doesn't want rewrite old bytes
                const minimumMemorySize = bytesPerImage * 2;

                if(memory.buffer.byteLength < minimumMemorySize){
                    const pagesNeeded = Math.ceil(minimumMemorySize / PAGE_SIZE)
                    memory.grow(pagesNeeded)
                }

                new Uint8ClampedArray(memory.buffer, 0).set(imageData.data)
            }
        });

        filters.addEventListener('change', event => {
            console.log(event.target.value)
            switch (event.target.value) {
                case 'invert' : {
                    instance.exports.invertColors(
                        img.width,
                        img.height
                    )
                    const resultData = new Uint8ClampedArray(
                        memory.buffer,
                        img.width * img.height * BYTES_PER_PIXEL,
                        img.width * img.height * BYTES_PER_PIXEL,
                    )

                    ctx.putImageData(new ImageData(resultData,  img.width, img.height), 0, 0)
                    break;
                }
            }
        })
        
    }


    async function load(){
        let memory = new WebAssembly.Memory({ initial: 1 });
        const imports = {
            env: {
                memory,
                abort: () => { 
                    throw Error('some troubles here') 
                },
            }
        }

        const { instance } = await WebAssembly.instantiate(
            await fetch('build/optimized.wasm')
                .then(res => res.arrayBuffer())
            , imports
        )

        if(instance.exports.memory){
            memory = instance.exports.memory;
        }

        return {
            instance,
            memory
        }
    }

    load().then(init)
})();