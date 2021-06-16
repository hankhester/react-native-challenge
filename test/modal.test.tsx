import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Modal } from '../app/Modal'

test('Modal renders correctly without buttons', () => {
  const title = 'Cool title'
  const message = 'Interesting message'
  const onRequestClose = jest.fn()
  const modal = render(<Modal title={title} message={message} onRequestClose={onRequestClose} />)
  expect(modal.getByText(title)).not.toBeNull()
  expect(modal.getByText(message)).not.toBeNull()
  const buttons = modal.getAllByA11yRole('button')
  expect(buttons.length).toBe(1)
  fireEvent.press(modal.queryByA11yLabel('Close'))
  expect(onRequestClose).toBeCalled()
})

test('Modal renders correctly with buttons', () => {
  const title = 'Cool title'
  const message = 'Interesting message'
  const color = '#222'
  const onRequestClose = jest.fn()
  const buttonAPress = jest.fn()
  const buttonBPress = jest.fn()
  const modal = render(
    <Modal
      title={title}
      message={message}
      onRequestClose={onRequestClose}
      buttons={[
        { text: 'a', color, onPress: buttonAPress },
        { text: 'b', color, onPress: buttonBPress },
      ]}
    />
  )
  expect(modal.getByText(title)).not.toBeNull()
  expect(modal.getByText(message)).not.toBeNull()

  const buttons = modal.getAllByA11yRole('button')
  expect(buttons.length).toBe(3)

  for (const button of buttons) {
    if (button.props.accessibilityLabel !== 'Close') {
      expect(button.props.style.backgroundColor).toBe(color)
    }
  }

  const buttonA = modal.getByText('a')
  const buttonB = modal.getByText('b')
  fireEvent.press(buttonA)
  expect(buttonAPress).toBeCalled()
  fireEvent.press(buttonB)
  expect(buttonBPress).toBeCalled()
  const closeButton = modal.queryByA11yLabel('Close')
  fireEvent.press(closeButton)
  expect(onRequestClose).toBeCalled()
})
