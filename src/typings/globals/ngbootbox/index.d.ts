// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/50387d40462301d54cda62e24d3b2ee46540f24a/ngbootbox/index.d.ts
interface NgBootboxDialog {
	title?: string;
	message?: string;
	templateUrl?: string;
	locale?: string;
	callback?: () => any;
	onEscape?: () => any | boolean;
	show?: boolean;
	backdrop?: boolean;
	closeButton?: boolean;
	animate?: boolean;
	className?: string;
	size?: string;
	buttons?: BootboxButtonMap;
}

interface BootboxService {
	alert(msg: string): Promise<any>;
	confirm(msg: string): Promise<any>;
	prompt(msg: string): Promise<any>;
	customDialog(options: NgBootboxDialog): void;
	setDefaults(options: BootboxDefaultOptions): void;
	hideAll(): void;

	addLocale(name: string, values: BootboxLocaleValues): void;
	removeLocale(name: string): void;
	setLocale(name: string): void;
}

declare var $ngBootbox: BootboxService;