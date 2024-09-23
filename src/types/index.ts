declare module '*.hbs' {
	const template: (context: unknown) => string;
	export default template;
}

declare module '*.hbs?raw' {
	const rawTemplate: string;
	export default rawTemplate;
}
