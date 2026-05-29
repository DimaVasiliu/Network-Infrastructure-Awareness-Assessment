# Project Structure

```text
Network-Infrastructure-Awareness-Assessment/
  app/          Expo React Native app
  docs/         Planning and product documentation
  reference/    Source reference material, not shipped directly as app content
```

## App structure

```text
app/
  assets/        Expo image assets
  src/
    data/        Local original question bank
    navigation/  App navigation shell
    screens/     Screen components
    types/       Shared TypeScript types
```

## Content rule

The official PDF must not be copied into the app question bank. It can be used only to identify topics. App questions and explanations must be original.

## Mock exam blueprint

The mock exam follows the official ECS Network Infrastructure Awareness guide format:

- 30 multiple-choice questions.
- 45 minute timer.
- Pass mark: 24 correct answers, 80%.
- Topic weighting: Product Selection 3, Containment Systems 4, Cable Laying 4, Cable Dressing 4, Fire Regulations 3, Safe Cable Installation 4, Personal Safety 4, Other Services 3, Waste Management 1.
