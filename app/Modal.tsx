import React, { FC } from 'react'
import { ColorValue, Image, StyleSheet, TouchableOpacity, useWindowDimensions, View, ViewProps } from 'react-native'
import { AppText } from './text'
import Images from './assets/Images'
import { Button } from './Button'
import Colors from './assets/Colors'

interface ModalButton {
  text: string
  onPress?: () => void
  color?: ColorValue
}
interface ModalProps {
  title: string
  message: string
  buttons?: ModalButton[]
  onRequestClose: () => void
}

export const Modal: FC<ViewProps & ModalProps> = props => {
  const { width, height } = useWindowDimensions()

  return (
    <View style={[{ width, height }, styles.overlay]}>
      <View style={styles.card}>
        <TouchableOpacity onPress={props.onRequestClose} style={styles.x}>
          <Image accessibilityRole="button" accessibilityLabel="Close" source={Images.ic_close} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <AppText bold style={styles.title}>
              {props.title}
            </AppText>
            <View style={styles.titleUnderline}></View>
          </View>
          <AppText bold style={styles.message}>
            {props.message}
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          {props.buttons?.map((button, i) => (
            <Button color={button.color} key={i} onPress={button.onPress} style={{ marginHorizontal: 3 }}>
              {button.text}
            </Button>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: Colors.grey_overlay,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.yellow,
    minHeight: 200,
    marginHorizontal: 30,
    justifyContent: 'space-between',
    borderWidth: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 25,
  },
  titleUnderline: {
    height: 2,
    backgroundColor: Colors.black,
  },
  message: {
    fontSize: 25,
    marginTop: 5,
  },
  x: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 20,
    alignSelf: 'flex-end',
  },
})
