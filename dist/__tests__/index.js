"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const client = new forgescript_1.ForgeClient({
    intents: [
        'GuildMembers', 'GuildMessages',
        'Guilds', 'MessageContent'
    ],
    events: ['messageCreate', 'interactionCreate', 'clientReady'],
    extensions: [new __1.ForgeCanvas()],
    prefixes: ['.']
});
client.applicationCommands.load('dist/__tests__/slash');
client.commands.load('dist/__tests__/commands');
(0, __1.registerFonts)([
    { src: 'https://fonts.googleapis.com/css2?family=Comfortaa&display=swap' },
    { src: './assets/Twemoji.ttf', name: 'Twemoji' }
], true);
__1.ForgeCanvas.components.set({
    name: 'circle',
    params: [
        {
            name: 'style',
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: 'size',
            type: forgescript_1.ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    code: '$drawRect[;fill;$env[style];0;0;$env[size];$env[size];$divide[$env[size];2]]]'
});
__1.ForgeCanvas.components.set({
    name: 'circles',
    params: [
        {
            name: 'style',
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: 'size',
            type: forgescript_1.ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    code: `
        $renderComponent[;circle;0;0;$env[style];$env[size]]
        $renderComponent[;circle;$env[size];$env[size];$env[style];$env[size]]
    `
});
__1.ForgeCanvas.components.load(__dirname + '/components', true);
client.login(process.env.TOKEN);
