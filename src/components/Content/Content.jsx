import catSrc from '../../public/cat.jpg'
import potatoSrc from '../../public/potato.jpg'

import useAddListItem from '../../hooks/useAddListItem'
import useOpenAndCloseForm from '../../hooks/useOpenAndCloseForm'

import Tools from './Tools'
import List from './List'
import Form from './Form'
	
const styles = {
  Content: 'max-w-screen-xl mx-auto mt-16 px-8',
}

export default function Content() {
  const [eventList, addEventItem] = useAddListItem([])
  const [isOpened, openForm, closeForm] = useOpenAndCloseForm()

  return (
    <div className={styles.Content}>
      <Form
        isOpened={isOpened}
        closeForm={closeForm}
        addEventItem={addEventItem}
      />
      <Tools openForm={openForm} />
      <List eventList={eventList} />
    </div>
  )
}