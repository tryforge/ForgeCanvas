/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ForgeClient } from '@tryforge/forgescript';
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
    name: 'ball',
    code: '$log[$env[options]]$drawRect[;fill;$env[options;0];0;0;$env[options;1];$env[options;2];$divide[$env[options;1];2]]]'
})

client.login(process.env.TOKEN);
