"use strict";
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
client.login(process.env.TOKEN);
