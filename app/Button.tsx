import React, { FC } from 'react'
import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { AppText } from './text'
import Colors from './assets/Colors'

export const Button: FC<TouchableOpacityProps & { color?: ColorValue }> = props => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...props}
      style={[styles.button, { backgroundColor: props.color || Colors.white }, props.style]}
    >
      <AppText medium style={{ textTransform: 'uppercase', textAlign: 'center' }}>
        {props.children}
      </AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingBottom: 3,
    paddingHorizontal: 8,
    borderColor: Colors.black,
    borderWidth: 2,
    minWidth: 65,
  },
})
