import useAddListItem from '../../hooks/useAddListItem'

import imageSrc1 from './cat.jpg'
import imageSrc2 from './potato.jpg'

import Add from './Add'
import Content from './Content/Content'
import Search from './Search/Search'
import Sort from './Sort/Sort'

const data = [
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

const newEvent = {
  day: '30.08.2024',
  title: 'ВЫкопали картошку',
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
  Tools: 'flex items-center justify-between',
}

export default function List() {
  const [eventList, addEvent] = useAddListItem(data, newEvent)

  return (
    <div className={styles.List}>
      <Tools addEvent={addEvent} />
      <Content eventList={eventList} />
    </div>
  )
}

function Tools({ addEvent }) {
  return (
    <div className={styles.Tools}>
      <Search />
      <Add addEvent={addEvent} />
      <Sort />
    </div>
  )
}