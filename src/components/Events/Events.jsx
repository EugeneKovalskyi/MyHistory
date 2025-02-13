'use client'

import { useEffect } from 'react'

import useList from '@/hooks/useList'
import useItem from '@/hooks/useItem'
import useToggleForm from '@/hooks/useToggleForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List/List'

export default function Events({ userId }) {
  const { list, addListItem, getList, updateListItem, removeListItem } = useList(userId)
  const { selectedItem, selectItem, deselectItem } = useItem()
  const { isFormHidden, hideForm, showForm } = useToggleForm(deselectItem)
  
  useEffect(() => {
    getList()
  }, [userId])
  // console.log(list)

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
          selectedItem={selectedItem}
        />
      } 
      <Tools showForm={showForm} />
      <List list={list} showForm={showForm} selectItem={selectItem} />
    </div>
  )
}