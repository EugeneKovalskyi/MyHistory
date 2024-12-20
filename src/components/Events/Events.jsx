'use client'

import useList from '@/hooks/useList'
import useItem from '@/hooks/useItem'
import useToggleForm from '@/hooks/useToggleForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List/List'

export default function Events({ eventList }) {
  const { list, addListItem, updateListItem, removeListItem } = useList(eventList)
  const { currentItem, getCurrentItem, resetCurrentItem } = useItem()
  const { isFormHidden, hideForm, showForm } = useToggleForm(resetCurrentItem)

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      {
        !isFormHidden
        &&
        <Form
          hideForm={hideForm}
          addListItem={addListItem}
          updateListItem={updateListItem}
          removeListItem={removeListItem}
          currentItem={currentItem}
        />
      } 
      <Tools showForm={showForm} />
      <List list={list} showForm={showForm} getCurrentItem={getCurrentItem} />
    </div>
  )
}