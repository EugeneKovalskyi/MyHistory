import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Event from '@/components/Events/List/Event'
import mocks from './_mocks'
import { MAX_PREVIEW_PHOTOS_NUMBER } from '@/constants'

describe('Event', () => {
  test('Корректная отрисовка полей', () => {
    const event = mocks.events[2]
    const { 
      getByTestId, 
      getAllByTestId, 
      queryAllByTestId 
    } = render(<Event event={event} />)

    const date = getByTestId('eventDate')
    const title = getByTestId('eventTitle')
    const description = getByTestId('eventDescription')
    const tags = getAllByTestId('eventTag')
    const photos = queryAllByTestId('eventPhoto')

    expect(date.textContent).toBe(event.date)
    expect(title.textContent).toBe(event.title)
    expect(description.textContent).toBe(event.description)
    expect(photos.length).toBe(event.photos.slice(0, MAX_PREVIEW_PHOTOS_NUMBER).length)

    for (const tag of tags) {
      expect(event.tags).toContain(tag.textContent.slice(1))
    }
  })
})
