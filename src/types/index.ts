declare module '*.hbs' {
    const template: (context: any) => string;
    export default template;
  }

  declare module '*.hbs?raw' {
    const rawTemplate: string;
    export default rawTemplate;
  }
