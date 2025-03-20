import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Events from '@/components/Events/Events'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => [],
  })
)

describe('Events', () => {
  test('Открытие пустой формы', async () => {
    const { 
			getByTestId, 
			queryAllByTestId, 
			queryByTestId, 
      findByTestId
		} = render(<Events />)

    expect(queryByTestId('form')).toBeNull()
    fireEvent.click(getByTestId('showForm'))
    expect(await findByTestId('form')).toBeInTheDocument()
		
    expect(getByTestId('formDate').textContent).toHaveLength(0)
    expect(getByTestId('formTitle').textContent).toHaveLength(0)
    expect(getByTestId('formDescription').textContent).toHaveLength(0)
    expect(getByTestId('formTags').textContent).toHaveLength(0)
    expect(queryAllByTestId('formPhoto')).toHaveLength(0)
  })
})
