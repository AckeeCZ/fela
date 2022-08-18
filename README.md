 # Ackee fela
 
Set of commonly used hooks and types

## Installation
`$ yarn add @ackee/fela`

## Hooks
### `useFelaEnhanced`
 Enhanced memoized `useFela` hook from fela. It accepts fela rules and returns:
 - `styles`: object of classnames 
 - `rules`: object of passed rules 
 - `theme`: fela theme object

#### Example

```typescript jsx
// Component.rules.ts
import type { TRuleWithTheme } from "@ackee/fela"

export const section: TRuleWithTheme = () => ({
    padding: '0 2rem',
}),

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

