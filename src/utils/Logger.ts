import "colors";

export class Logger {
	private static readonly TextDivisor = " ";

	private static Now() {
		const now = new Date();

		return `${now.getHours()}:${now.getMinutes()}`;
	}

	public static Error(...args: (string | any)[]) {
		console.log(
			`[${Logger.Now()}]` +
				Logger.TextDivisor +
				`[Error]`.bgRed.black +
				Logger.TextDivisor +
				`${args[0]}`.red,
		);
		console.log(`> Begin of error stack`.red);

		console.error(args.splice(1, args.length));

		console.log(`> End of error stack`.red);

		return;
	}

	public static Warning(message: string) {
		console.log(
			`[${Logger.Now()}]` +
				Logger.TextDivisor +
				`[Warning]`.bgYellow.black +
				Logger.TextDivisor +
				`${message}`.yellow,
		);

		return;
	}

	public static Success(message: string) {
		console.log(
			`[${Logger.Now()}]` +
				Logger.TextDivisor +
				`[Success]`.bgGreen.black +
				Logger.TextDivisor +
				`${message}`.green,
		);

		return;
	}

	public static Info(message: string) {
		console.log(
			`[${Logger.Now()}]` +
				Logger.TextDivisor +
				`[Info]`.bgCyan.black +
				Logger.TextDivisor +
				`${message}`.cyan,
		);

		return;
	}
}
