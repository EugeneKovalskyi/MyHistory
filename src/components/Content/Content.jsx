import imageSrc1 from '../../public/cat.jpg'
import imageSrc2 from '../../public/potato.jpg'

import useAddListItem from '../../hooks/useAddListItem'

import Tools from './Tools'
import List from './List'

const __testData = [
	{
		day: '30.12.2023',
		title: 'Приютили кошку',
		photos: {
			alt: 'cat',
			src: imageSrc1,
		},
		description:
			'Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)',
		tags: ['#кошка', '#начало'],
	},
	{
		day: '30.12.2023',
		title: 'Приютили кошку',
		photos: {
			alt: 'cat',
			src: imageSrc1,
		},
		description:
			'Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)',
		tags: ['#кошка', '#начало'],
	},
]

const __testNewEvent = {
  day: '30.08.2024',
  title: 'Выкопали картошку',
  photos: {
    alt: 'potato',
    src: imageSrc2,
  },
  description:
    'Выкопали 11 рядов картошки за 6 часов. Хоть лето было без дождей, благодаря хорошему поливу урожай очень хороший: 2 ведра/ряд, крупная, вкусная. В основном красная, немного белой и красной гире-образной.',
  tags: ['#огород', '#картошка'],
}
	
const styles = {
  List: 'max-w-screen-xl mx-auto mt-16 px-8',
}

export default function Content() {
  const [eventList, addEvent] = useAddListItem(__testData, __testNewEvent)

  return (
    <div className={styles.List}>
      <Tools addEvent={addEvent} />
      <List eventList={eventList} />
    </div>
  )
}