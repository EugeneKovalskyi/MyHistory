export default function getImageDimensions(imageURL) {
	return new Promise((resolve, reject) => {
		const image = new Image()
		
		image.src = imageURL

		image.onload = () => resolve({ width: image.width, height: image.height })
		image.onerror = () => reject(new Error('Ошибка загрузки!', { cause: 'UPLOAD_ERROR' }))
	})
}