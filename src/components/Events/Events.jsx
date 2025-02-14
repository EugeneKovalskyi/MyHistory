'use client'

import { useEffect } from 'react'

import useList from '@/hooks/useList'
import useEvent from '@/hooks/useEvent'
import useToggleForm from '@/hooks/useToggleForm'

import Form from './Form/Form'
import Tools from './Tools'
import List from './List/List'

export default function Events({ userId }) {
  const { list, getList, addEvent, updateEvent, deleteEvent } = useList(userId)
  const { updatedEvent, setUpdatedEvent, resetUpdatedEvent } = useEvent()
  const { isFormHidden, hideForm, showForm } = useToggleForm(resetUpdatedEvent)
  
  useEffect(() => {
    getList()
  }, [userId])

  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      {
        !isFormHidden
        &&
        <Form
          hideForm={hideForm}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          updatedEvent={updatedEvent}
        />
      } 
      <Tools showForm={showForm} />
      <List list={list} showForm={showForm} setUpdatedEvent={setUpdatedEvent} />
    </div>
  )
}