import { StyleSheet, Text, View } from 'react-native';

export function StatsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Stats</Text>
      <Text style={styles.body}>Progress tracking will be stored locally in Phase 2.</Text>
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

