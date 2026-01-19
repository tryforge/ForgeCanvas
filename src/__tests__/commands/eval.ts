import { ApplicationCommand, RegistrationType } from '@tryforge/forgescript';
import { SlashCommandBuilder } from 'discord.js';

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Executes some code i think')
        .addStringOption(option =>
            option
                .setName('code')
                .setDescription('meow')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('meow')
                .setRequired(false)
                .setChoices(
                    { name: 'JavaScript', value: 'js' },
                    { name: 'ForgeScript', value: 'fs' }
                )
        )
        .addBooleanOption(option =>
            option
                .setName('ephemeral')
                .setDescription('meow')
                .setRequired(false)
        )
        .setIntegrationTypes([0, 1]) as any, // fuck you typescript haha ni
    code: `
        $if[$option[ephemeral]==true;$ephemeral]
		$onlyIf[$authorID==$botOwnerID;nuh uh]
		$defer
        $if[$option[type]==js;$djsEval[$option[code]];$eval[$option[code]]]
    `,
    type: RegistrationType.Global
});
