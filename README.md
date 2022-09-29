 # Ackee fela
 
Set of commonly used hooks and types

## Installation

```$ yarn add @ackee/fela```

## Hooks
### `useFelaEnhanced`
 Enhanced memoized `useFela` hook from fela. It accepts fela rules and returns:
 - `styles`: an object of class names 
 - `rules`: object of passed rules 
 - `theme`: fela theme object

#### Example

```typescript jsx
// Component.rules.ts
import type { TRuleWithTheme } from "@ackee/fela"

export const section: TRuleWithTheme = () => ({
    padding: '0 2rem',
})

export const title: TRuleWithTheme = ({ theme }) => ({
    fontSize: '3rem',
    color: theme.colors.red,
    textTransform: 'uppercase'
})

// Component.jsx
import { useFelaEnhanced } from "@ackee/fela";
import * as felaRules from "./Component.rules"

const Component = () => {
    const { styles } = useFelaEnhanced(felaRules);
    
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Hello world</h1>
        </section>
    )
}
```

#### Example with props

```typescript jsx
// Paragraph.rules.ts
import type { TRuleWithTheme } from "@ackee/fela"
import type { ParagraphProps } from "./Paragraph"

export const paragraph: TRuleWithTheme<Pick<ParagraphProps<'weight'>>> = ({ weight }) => ({
    padding: '0 2rem',
    fontWeight: weight
})

// Paragraph.jsx
import { useFelaEnhanced } from "@ackee/fela";
import * as felaRules from "./Paragraph.rules"

export interface ParagraphProps {
    weight: 400 | 500 | 600;
}

const Paragraph = ({ weight }) => {
    const { styles } = useFelaEnhanced(felaRules, { weight });
    
    return (
        <p className={styles.paragraph}>Hello world</p>
    )
}
```

## Use with your own theme

### Define `Theme` type
If you are using TypeScript, you should extend the default `Theme` type with your project's theme type inside a `.d.ts` file.
```typescript
// theme.ts
export const theme = {
    colors: {
        red: "#F00",
        green: "#0F0",
        blue: "#00F",
    },
} as const;

export type Theme = typeof theme;

// index.d.ts 
import { Theme as ProjectTheme } from "./theme.ts"

declare module "@ackee/fela" {
  interface Theme extends ProjectTheme {}
}
```
### Extending an existing component 
To extend rules of an existing component you can define a prop `extend` inside the component and pass it to the `useFelaEnhanced` hook.  
```typescript jsx
// Paragraph.tsx
import { useFelaEnhanced } from "@ackee/fela";
import type { RulesExtend } from "@ackee/fela";

const felaRules = {
    paragraph: {
        padding: '0 2rem',
        fontSize: '1rem'
    }
}

export interface ParagraphProps {
    weight: 400 | 500 | 600;
    extend?: RulesExtend<typeof felaRules>
}

const Paragraph = ({ extend }) => {
    const { styles } = useFelaEnhanced(felaRules, { extend });

    return (
        <p className={styles.paragraph}>Hello world</p>
    )
}

// Description.tsx
import { useFelaEnhanced } from "@ackee/fela";
import type { RulesExtend } from "@ackee/fela";

import { Paragraph } from "../Paragraph"

export interface ParagraphProps {
    weight: 400 | 500 | 600;
}

const felaRules = {
    description: {
        fontSize: '1.25rem',
        color: '#00F'
    }
}

const Description = () => {
    const { rules } = useFelaEnhanced(felaRules);

    return (
        <Paragraph extend={{ paragraph: rules.description }}>Hello world</Paragraph>
    )
}
```

## TypesScript
### `TRuleWithTheme`
A generic type that takes rule props as input. It is based on the `TRule` generic type from `fela` but extended with the `theme` prop in the function props.
```typescript
/// Component.rules.ts
import type { TRuleWithTheme } from "@ackee/fela";

export const paragraph: TRuleWithTheme<{ weight: number }> = ({ theme, weight }) => ({
    color: theme.colors.red,
    fontWeight: weight,
})

export const container: TRuleWithTheme = ({ theme }) => ({
    backgroundColor: theme.colors.red,
    display: 'flex'
})
```

### `RulesExtend`
A generic type that takes type of component's fela rules as input.
```typescript jsx
const felaRules = {
    paragraph: {
        padding: '0 2rem',
        fontSize: '1rem'
    }
}

export interface ParagraphProps {
    weight: 400 | 500 | 600;
    extend?: RulesExtend<typeof felaRules>
}

const Paragraph = ({ extend }) => {
    const { styles } = useFelaEnhanced(felaRules, { extend });

    return (
        <p className={styles.paragraph}>Hello world</p>
    )
}
```
