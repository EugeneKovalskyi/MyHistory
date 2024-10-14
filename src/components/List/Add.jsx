export default function Add({ addEvent }) {
	const style = 'w-1/6 px-2 py-5 rounded-xl shadow-lg font-bold text-lg text-sky-50 bg-teal-500 transition-all duration-150 hover:shadow-xl hover:bg-teal-400'

	return (
		<button className={style} onClick={addEvent}>
			Добавить событие
		</button>
	)
}