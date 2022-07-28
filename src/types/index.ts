import type { TRule } from 'fela';

export interface Theme {}

export type ThemeProps = { theme: Theme };

export type TRuleWithTheme<Props = {}> = TRule<ThemeProps & Props>;

export type RulesExtend<TExtandalbeRules, TProps = {}> = Partial<
    Record<keyof TExtandalbeRules, TRuleWithTheme<TProps>>
>;
