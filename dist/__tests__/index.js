"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../");
const client = new forgescript_1.ForgeClient({
    intents: [
        'GuildMembers', 'GuildMessages',
        'Guilds', 'MessageContent'
    ],
    events: ['messageCreate', 'interactionCreate', 'clientReady'],
    extensions: [new __1.ForgeCanvas()],
    prefixes: ['.']
});
client.commands.add({
    name: 'eval',
    aliases: ['e', 'е'],
    type: 'messageCreate',
    code: `
        $onlyIf[$authorID==$botOwnerID;nuh uh]
        $eval[$message]
    `,
});
client.applicationCommands.load('dist/__tests__/commands');
(0, __1.registerFonts)([
    { src: 'https://fonts.googleapis.com/css2?family=Comfortaa&display=swap' },
    { src: './assets/Twemoji.ttf', name: 'Twemoji' }
], true);
__1.ForgeCanvas.components.set({
    name: 'ball',
    code: '$log[$env[options]]$drawRect[;fill;$env[options;0];0;0;$env[options;1];$env[options;2];$divide[$env[options;1];2]]]'
});
client.login(process.env.TOKEN);
