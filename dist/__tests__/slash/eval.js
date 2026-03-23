"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.ApplicationCommand({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('eval')
        .setDescription('Executes some code i think')
        .addStringOption(option => option
        .setName('code')
        .setDescription('meow')
        .setRequired(true))
        .addStringOption(option => option
        .setName('type')
        .setDescription('meow')
        .setRequired(false)
        .setChoices({ name: 'JavaScript', value: 'js' }, { name: 'ForgeScript', value: 'fs' }))
        .addBooleanOption(option => option
        .setName('ephemeral')
        .setDescription('meow')
        .setRequired(false))
        .setIntegrationTypes([0, 1]),
    code: `
        $if[$option[ephemeral]==true;$ephemeral]
		$onlyIf[$authorID==$botOwnerID;nuh uh]
		$defer
        $if[$option[type]==js;$djsEval[$option[code]];$eval[$option[code]]]
    `,
    type: forgescript_1.RegistrationType.Global
});
