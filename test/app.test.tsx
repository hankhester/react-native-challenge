import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { App } from '../app/App'
import Colors from '../app/assets/Colors'

test('App renders correct headers', () => {
  const expectedHeaders = ['Introduction', 'Step 1: Fetch', 'Step 2: Display']
  const app = render(<App />)
  const headers = app.getAllByA11yRole('header')
  expect(headers.length).toBe(3)
  for (const header of expectedHeaders) {
    expect(app.queryByText(header)).not.toBeNull()
  }
})

test('App renders correct buttons', () => {
  const expectedButtons = ['Fetch', 'Display']
  const app = render(<App />)
  const buttons = app.getAllByA11yRole('button')
  expect(buttons.length).toBe(2)
  for (const button of expectedButtons) {
    expect(app.queryByText(button)).not.toBeNull()
  }
})

test('App fetches and displays an affirmation', async () => {
  const app = render(<App />)
  const buttons = app.getAllByA11yRole('button')
  const fetchButton = buttons[0]
  const displayButton = buttons[1]
  expect(fetchButton.props.style.backgroundColor).toBe(Colors.cyan)
  expect(displayButton.props.style.backgroundColor).toBe(Colors.white)

  const affirmation = "You're beautiful"
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ affirmation }) })) as any
  fireEvent.press(fetchButton)
  expect(app.queryByText('Are you sure you want to fetch an affirmation?')).not.toBeNull()

  fireEvent.press(app.getByText('Yes'))
  expect(global.fetch).toBeCalled()
  await waitFor(() => expect(displayButton.props.style.backgroundColor).toBe(Colors.cyan))

  fireEvent.press(displayButton)
  expect(app.getByText(affirmation)).not.toBeNull()
})
