import React, { FC } from 'react'
import { Text, TextProps } from 'react-native'

interface FontWeightProps {
  medium?: boolean
  bold?: boolean
}

export const AppText: FC<TextProps & FontWeightProps> = props => {
  let fontFamily = 'Folio-Light'
  if (props.medium) {
    fontFamily = 'Folio-Medium'
  } else if (props.bold) {
    fontFamily = 'Folio-Bold'
  }

  return (
    <Text {...props} style={[{ fontFamily }, props.style]}>
      {props.children}
    </Text>
  )
}
