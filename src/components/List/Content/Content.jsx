import Preview from "./Preview/Preview"

const styles = {
	Content: 'mt-12 grid grid-cols-2 gap-8 text-sky-900'
}

export default function Content({ eventList }) {
	return (
		<div className={styles.Content}>
			{
				eventList.map((event, index) => (<Preview key={index} event={event}/>))
			}
		</div>
	)
}