import useAddListItem from '../../hooks/useAddListItem'
import useOpenAndCloseForm from '../../hooks/useOpenAndCloseForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List'

export default function Content() {
  const [eventList, addEventItem] = useAddListItem([])
  const {isOpened, openForm, closeForm} = useOpenAndCloseForm()

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
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