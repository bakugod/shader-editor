(function () {
    const BYTES_PER_PIXEL = 4;
    const PAGE_SIZE = 64 * 1024;

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const uploader = document.getElementById('uploader')
    const filters = document.getElementById('filters')


    const hookedFilters = (functionName, img, memory, ...args) => {
        functionName(
            img.width,
            img.height,
            args
        )
        const resultData = new Uint8ClampedArray(
            memory.buffer,
            img.width * img.height * BYTES_PER_PIXEL,
            img.width * img.height * BYTES_PER_PIXEL,
        )
    
        ctx.putImageData(new ImageData(resultData, img.width, img.height), 0, 0)
    }

    function init({ instance, memory }) {


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

                if (memory.buffer.byteLength < minimumMemorySize) {
                    const pagesNeeded = Math.ceil(minimumMemorySize / PAGE_SIZE)
                    memory.grow(pagesNeeded)
                }

                new Uint8ClampedArray(memory.buffer, 0).set(imageData.data)
            }
        });

        filters.addEventListener('change', event => {
            if (img.width === 0 || img.height === 0) {
                ctx.font = '32px serif';
                ctx.fillText('Downoload image', 0, 50);
            }
            else {
                switch (event.target.id) {
                    case '1': {
                        hookedFilters(instance.exports.invertColors, img, memory)
                        break;
                    }
                    case '2': {
                        hookedFilters(instance.exports.greyScale, img, memory)
                        break;
                    }
                    case '3': {
                        hookedFilters(instance.exports.loliColor, img, memory)
                        break;
                    }
                    case '4': {
                        hookedFilters(instance.exports.sepiaColors, img, memory)
                        break;
                    }
                    case '5': {
                        hookedFilters(instance.exports.blueColors, img, memory)
                        break;
                    }
                    case '6': {
                        ctx.putImageData(new ImageData(imageData.data, img.width, img.height), 0, 0)
                        break;
                    }
                    case '7': {
                        console.log(event.target.value)
                        hookedFilters(instance.exports.contrastRange, img, memory, event.target.value)
                        break;
                    }
                    default: {
                        ctx.putImageData(new ImageData(imageData.data, img.width, img.height), 0, 0)
                        break;
                    }
                }
            }
        })
    }


    async function load() {
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

        if (instance.exports.memory) {
            memory = instance.exports.memory;
        }

        return {
            instance,
            memory
        }
    }

    load().then(init)
})();