import { StyleSheet, Text, View } from 'react-native';

export function MockExamScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mock Exam</Text>
      <Text style={styles.body}>Timed mock exams will be built in Phase 2.</Text>
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
});

