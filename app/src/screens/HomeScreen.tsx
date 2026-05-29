import { StyleSheet, Text, View } from 'react-native';

import questions from '../data/questions.json';

export function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Phase 1</Text>
      <Text style={styles.title}>Network Infrastructure Awareness Trainer</Text>
      <Text style={styles.body}>
        Skeleton app is running with a typed question-bank structure and {questions.length} sample questions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  eyebrow: {
    color: '#2364aa',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#101820',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  body: {
    color: '#46515c',
    fontSize: 16,
    lineHeight: 24,
  },
});

