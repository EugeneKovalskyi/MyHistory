import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import List from '@/components/Events/List/List'
import mocks from './_mocks'

describe('List', () => {
  test('Отрисовка списка событий', async () => {
    const { findAllByTestId } = render(<List list={mocks.events} />)

    expect(await findAllByTestId('event')).toHaveLength(3)
  })
})
