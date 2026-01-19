import { ForgeClient } from '@tryforge/forgescript';
import { ForgeCanvas } from '../';

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

client.login(process.env.TOKEN);
