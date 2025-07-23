import { SlashCommandBuilder } from "discord.js";

export class SlashCommand {
	private _name?: string;
	private _description?: string;
	private readonly command = new SlashCommandBuilder();

	constructor() {}

	public setName(name: string) {
		this._name = name;
		this.command.setName(name);

		return this;
	}

	public setDescription(description: string) {
		this._description = description;
		this.command.setDescription(description);

		return this;
	}

	public get name() {
		return this._name;
	}

	public get description() {
		return this._description;
	}

	public toJSON() {
		return this.command.toJSON();
	}
}
