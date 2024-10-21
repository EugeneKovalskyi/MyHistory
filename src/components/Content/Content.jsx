import useList from '../../hooks/useList'
import useOpenAndCloseForm from '../../hooks/useOpenAndCloseForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List'

export default function Content() {
  const { list, addListItem } = useList([])
  const { isOpened, openForm, closeForm } = useOpenAndCloseForm()

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      <Form
        isOpened={isOpened}
        closeForm={closeForm}
        addListItem={addListItem}
      />
      <Tools openForm={openForm} />
      <List list={list} />
    </div>
  )
}