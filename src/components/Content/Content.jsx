import useList from '../../hooks/useList'
import useToggleComponent from '../../hooks/useToggleComponent'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List'

export default function Content() {
  const { list, addListItem } = useList([])
  const { isFormHidden, hideForm, showForm } = useToggleComponent('Form')

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      <Form
        addListItem={addListItem}
        hideForm={hideForm}
        isFormHidden={isFormHidden}
      />
      <Tools showForm={showForm} />
      <List list={list} />
    </div>
  )
}