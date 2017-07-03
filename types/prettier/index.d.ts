
declare module 'prettier' {
  export interface PrettierOptions {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    semi?: boolean;
    singleQuote?: boolean;
    trailingComma?: 'none' | 'es5' | 'all';
    bracketSpacing?: boolean;
    jsxBracketSameLine?: boolean;
    cursorOffset?: number;
    rangeStart?: number;
    rangeEnd?: number;
    parser?: 'flow' | 'babylon' | 'typescript' | 'postcss';
    filepath?: string;
  }
  function format(source: string, options?: PrettierOptions): string;
  export {format};
}