import Preview from "./Preview/Preview"

export default function Content() {
	const style = 'mt-12 grid grid-cols-2 gap-8 text-sky-900'

	return (
		<div className={ style }>
			<Preview />
			<Preview />
			<Preview />
			<Preview />
			<Preview />
			<Preview />
			<Preview />
			<Preview />
		</div>
	)
}