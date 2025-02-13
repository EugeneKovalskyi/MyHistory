export default async function fetchStream(readableStream, contentType) {
	const chunks = []
	let uint8Array = []

	for await (let chunk of readableStream) chunks.push(chunk)

  uint8Array = concatUint8Arrays(chunks, 'Uint8Array')

  if (contentType === 'application/json') return JSON.parse(decodeString(uint8Array))
	else if (contentType === 'text/plain') return decodeString(uint8Array)
	else throw new Error('MIME-тип не существует или не имеет обработчика')
}

function decodeString(typedArray) {
	const textDecoder = new TextDecoder()
	return textDecoder.decode(typedArray)
}

function concatUint8Arrays(array) {
	const resultLength = array.reduce((accum, curr) => accum.length + curr.length)
	const result = new Uint8Array(resultLength)	
	let offset = 0

	for (let uint8Array of array) {
		result.set(uint8Array, offset)
		offset += uint8Array.length
	}

	return result
}

