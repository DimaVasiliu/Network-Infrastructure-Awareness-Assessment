import { StyleSheet, Text, View } from 'react-native';

import questions from '../data/questions.json';

export function PracticeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.body}>Section practice will use the local question bank.</Text>
      <Text style={styles.count}>{questions.length} questions available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#101820',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 10,
  },
  body: {
    color: '#46515c',
    fontSize: 16,
    lineHeight: 24,
  },
  count: {
    color: '#2364aa',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
  },
});

