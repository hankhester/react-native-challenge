import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import Colors from './assets/Colors'
import { Button } from './Button'
import { Modal } from './Modal'
import { AppText } from './text'

type AppState = 'start' | 'confirming' | 'fetching' | 'error' | 'displaying'

export const App = () => {
  const [appState, setAppState] = useState<AppState>('start')
  const [affirmation, setAffirmation] = useState<string>()

  const fetchAffirmation = async () => {
    setAppState('fetching')
    try {
      const resp = await fetch('https://www.affirmations.dev/')
      const { affirmation } = await resp.json()
      if (affirmation) {
        setAppState('start')
        setAffirmation(affirmation)
      } else {
        setAppState('error')
      }
    } catch (e) {
      setAppState('error')
    }
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={styles.container}>
        <View>
          <AppText accessibilityRole="header" bold style={styles.header}>
            Introduction
          </AppText>
          <AppText style={styles.content}>
            Affirmations are positive statements that can help you to challenge and overcome self-sabotaging and
            negative thoughts. You can use this overly-convoluted tool to fetch an affirmation for joy and positive
            change.
          </AppText>
        </View>
        <View>
          <AppText accessibilityRole="header" bold style={styles.header}>
            Step 1: Fetch
          </AppText>
          <AppText style={styles.content}>
            Click the button below to make a request to a remote API and fetch an affirmation
          </AppText>
          <Button color={Colors.cyan} onPress={() => setAppState('confirming')}>
            Fetch
          </Button>
        </View>
        <View>
          <AppText accessibilityRole="header" bold style={styles.header}>
            Step 2: Display
          </AppText>
          <AppText style={styles.content}>
            Click the button below to display the most recently fetched affirmation
          </AppText>
          <Button
            onPress={() => setAppState('displaying')}
            color={!affirmation ? Colors.white : Colors.cyan}
            disabled={!affirmation}
          >
            Display
          </Button>
        </View>
      </View>
      {appState === 'confirming' && (
        <Modal
          title="Fetch?"
          message="Are you sure you want to fetch an affirmation?"
          buttons={[
            { text: 'No', onPress: () => setAppState('start') },
            { text: 'Yes', onPress: fetchAffirmation, color: Colors.cyan },
          ]}
          onRequestClose={() => setAppState('start')}
        />
      )}
      {affirmation && appState === 'displaying' && (
        <Modal title="Affirmation:" message={affirmation} onRequestClose={() => setAppState('start')} />
      )}
      {appState === 'fetching' && (
        <AppText style={{ padding: 30 }} medium>
          Loading affirmation...
        </AppText>
      )}
      {appState === 'error' && (
        <AppText medium style={styles.error}>
          Oh no! There was an error fetching a new affirmation. Are you connected to the internet?
        </AppText>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    height: '60%',
    minHeight: 500,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 16,
    paddingVertical: 10,
  },
  error: {
    fontSize: 16,
    padding: 30,
  },
})

export default App
