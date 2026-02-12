/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ArgType, ForgeClient } from '@tryforge/forgescript';
import { ForgeCanvas, registerFonts } from '../';

const client = new ForgeClient({
    intents: [
        'GuildMembers', 'GuildMessages',
        'Guilds', 'MessageContent'
    ],
    events: ['messageCreate', 'interactionCreate', 'clientReady'],
    extensions: [new ForgeCanvas()],
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

registerFonts([
    { src: 'https://fonts.googleapis.com/css2?family=Comfortaa&display=swap' },
    { src: './assets/Twemoji.ttf', name: 'Twemoji' }
], true);

ForgeCanvas.components.set({
    name: 'circle',
    params: [
        {
            name: 'style',
            type: ArgType.String,
            required: true
        },
        {
            name: 'size',
            type: ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    code: '$drawRect[;fill;$env[style];0;0;$env[size];$env[size];$divide[$env[size];2]]]'
})

ForgeCanvas.components.set({
    name: 'circles',
    params: [
        {
            name: 'style',
            type: ArgType.String,
            required: true
        },
        {
            name: 'size',
            type: ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    code: `
        $renderComponent[;circle;0;0;$env[style];$env[size]]
        $renderComponent[;circle;$env[size];$env[size];$env[style];$env[size]]
    `
});

ForgeCanvas.components.load(__dirname + '/components', true);

client.login(process.env.TOKEN);
