import useList from '../../hooks/useList'
import useToggleForm from '../../hooks/useToggleForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List'
import useItem from '../../hooks/useItem'

export default function Content() {
  const { list, addListItem, updateListItem } = useList([])
  const { isFormHidden, hideForm, showForm } = useToggleForm()
  const { currentItem, getCurrentItem, clearCurrentItem } = useItem()

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      <Form
        hideForm={hideForm}
        isFormHidden={isFormHidden}
        addListItem={addListItem}
        updateListItem={updateListItem}
        currentItem={currentItem}
        clearCurrentItem={clearCurrentItem}
      />
      <Tools showForm={showForm} />
      <List list={list} showForm={showForm} getCurrentItem={getCurrentItem} />
    </div>
  )
}