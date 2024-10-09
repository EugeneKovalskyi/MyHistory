import Item from "./Item"

export default function Navigation() {
	return (
		<div className='h-full flex text-sky-50 text-xl'>
			<Item>События</Item>
			<Item>Цели</Item>
			<Item>Знания</Item>
			<Item>Мысли</Item>
			<Item>Книги</Item>
			<Item>Кино</Item>
		</div>
	)
}