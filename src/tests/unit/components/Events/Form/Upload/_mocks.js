import { src as src1 } from './images/1.jpg'
import { src as src2 } from './images/2.jpg'

export default {
	deletePhoto: jest.fn(),
	addPhotos: jest.fn(),

	photos: [
		{
			id: 1,
			name: '1.jpg',
			width: 200,
			height: 100,
			src: src1
		},
		{
			id: 2,
			name: '2.jpg',
			width: 300,
			height: 150,
			src: src2
		}
	]
}