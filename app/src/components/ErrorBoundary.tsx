import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getT } from '../i18n';
import { colors, spacing } from '../theme';
import { PrimaryButton } from './PrimaryButton';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      const t = getT();
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{t.error.title}</Text>
          <Text style={styles.body}>{t.error.body}</Text>
          <Text style={styles.errorText}>{this.state.error.message}</Text>
          <PrimaryButton onPress={() => this.setState({ error: undefined })}>
            {t.error.tryAgain}
          </PrimaryButton>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  errorText: {
    backgroundColor: colors.dangerSoft,
    borderRadius: 8,
    color: colors.danger,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
});
