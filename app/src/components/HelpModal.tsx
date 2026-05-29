import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';

type HelpLanguage = 'en' | 'ro' | 'ru';

type HelpModalProps = {
  isVisible: boolean;
  language: HelpLanguage;
  onChangeLanguage: (language: HelpLanguage) => void;
  onClose: () => void;
};

const languageLabels: Record<HelpLanguage, string> = {
  en: 'EN',
  ro: 'RO',
  ru: 'RU',
};

const helpContent: Record<
  HelpLanguage,
  {
    title: string;
    subtitle: string;
    sections: Array<{ title: string; lines: string[] }>;
  }
> = {
  en: {
    title: 'Help',
    subtitle: 'Quick support for practice, mock exams and common codes.',
    sections: [
      {
        title: 'How to use the app',
        lines: [
          'Start with Practice and work section by section.',
          'Read the explanation after every answer, even when you are correct.',
          'Use Mock Exam only after you have reviewed all sections at least once.',
        ],
      },
      {
        title: 'Mock exam format',
        lines: ['30 questions.', '45 minute timer.', 'Pass mark is 24 correct answers.'],
      },
      {
        title: 'Common codes',
        lines: [
          'CPR means Construction Products Regulations.',
          'DoP means Declaration of Performance.',
          'Cca-s1b,d2,a2 is a EuroClass fire-performance code.',
          'Class Ea copper permanent link: 90 m. Full channel: 100 m.',
          '9/125 is single-mode fibre. 50/125 and 62.5/125 are multimode sizes.',
        ],
      },
      {
        title: 'Site safety reminders',
        lines: [
          'Use EN420 compliant gloves for cable pulling.',
          'Use a 1:4 ladder angle ratio.',
          'Use HSG47 guidance when working around underground services.',
          'Stop work and report suspected asbestos.',
        ],
      },
    ],
  },
  ro: {
    title: 'Ajutor',
    subtitle: 'Sprijin rapid pentru practica, examenul simulat si codurile uzuale.',
    sections: [
      {
        title: 'Cum folosesti aplicatia',
        lines: [
          'Incepe cu Practice si lucreaza pe fiecare sectiune.',
          'Citeste explicatia dupa fiecare raspuns, chiar daca ai raspuns corect.',
          'Foloseste Mock Exam doar dupa ce ai trecut prin toate sectiunile cel putin o data.',
        ],
      },
      {
        title: 'Formatul examenului simulat',
        lines: ['30 de intrebari.', 'Timp limita: 45 de minute.', 'Nota de trecere: 24 raspunsuri corecte.'],
      },
      {
        title: 'Coduri importante',
        lines: [
          'CPR inseamna Construction Products Regulations.',
          'DoP inseamna Declaration of Performance.',
          'Cca-s1b,d2,a2 este un cod EuroClass pentru comportarea la foc.',
          'Class Ea copper permanent link: 90 m. Canal complet: 100 m.',
          '9/125 este fibra single-mode. 50/125 si 62.5/125 sunt dimensiuni multimode.',
        ],
      },
      {
        title: 'Siguranta pe santier',
        lines: [
          'Foloseste manusi conforme EN420 la tragerea cablurilor.',
          'Pentru scari, foloseste raportul 1:4.',
          'Foloseste ghidul HSG47 cand lucrezi langa servicii subterane.',
          'Opreste lucrul si raporteaza daca suspectezi azbest.',
        ],
      },
    ],
  },
  ru: {
    title: 'Помощь',
    subtitle: 'Краткая помощь по практике, пробному экзамену и основным кодам.',
    sections: [
      {
        title: 'Как пользоваться приложением',
        lines: [
          'Начните с Practice и проходите раздел за разделом.',
          'Читайте объяснение после каждого ответа, даже если ответ правильный.',
          'Используйте Mock Exam только после повторения всех разделов хотя бы один раз.',
        ],
      },
      {
        title: 'Формат пробного экзамена',
        lines: ['30 вопросов.', 'Время: 45 минут.', 'Проходной результат: 24 правильных ответа.'],
      },
      {
        title: 'Важные коды',
        lines: [
          'CPR означает Construction Products Regulations.',
          'DoP означает Declaration of Performance.',
          'Cca-s1b,d2,a2 - это код EuroClass по пожарным характеристикам.',
          'Class Ea copper permanent link: 90 м. Полный канал: 100 м.',
          '9/125 - одномодовое волокно. 50/125 и 62.5/125 - многомодовые размеры.',
        ],
      },
      {
        title: 'Безопасность на объекте',
        lines: [
          'Используйте перчатки EN420 при протяжке кабеля.',
          'Для лестницы используйте соотношение 1:4.',
          'Используйте HSG47 при работах рядом с подземными коммуникациями.',
          'Остановите работу и сообщите, если есть подозрение на асбест.',
        ],
      },
    ],
  },
};

export function HelpModal({ isVisible, language, onChangeLanguage, onClose }: HelpModalProps) {
  const content = helpContent[language];

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.subtitle}>{content.subtitle}</Text>
            </View>
            <Pressable accessibilityLabel="Close help" onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeLabel}>X</Text>
            </Pressable>
          </View>

          <View style={styles.languageRow}>
            {(Object.keys(languageLabels) as HelpLanguage[]).map((item) => {
              const isActive = item === language;

              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => onChangeLanguage(item)}
                  style={[styles.languageButton, isActive && styles.activeLanguageButton]}
                >
                  <Text style={[styles.languageLabel, isActive && styles.activeLanguageLabel]}>
                    {languageLabels[item]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {content.sections.map((section) => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.lines.map((line) => (
                  <Text key={line} style={styles.line}>
                    {line}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(17, 24, 39, 0.36)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '88%',
    paddingTop: spacing.lg,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  closeLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  languageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  languageButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 38,
    minWidth: 54,
    justifyContent: 'center',
  },
  activeLanguageButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  languageLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  activeLanguageLabel: {
    color: colors.surface,
  },
  content: {
    gap: spacing.md,
    padding: spacing.xl,
    paddingBottom: 42,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  line: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
});
