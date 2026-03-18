"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: 'eval',
    aliases: ['e'],
    type: 'messageCreate',
    code: `
        $onlyIf[$authorID==$botOwnerID;nuh uh]
        $eval[$message]
    `,
});
