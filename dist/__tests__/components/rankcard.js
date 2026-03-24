"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: 'rankcard',
    brackets: true,
    params: [
        {
            name: 'background',
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: 'name',
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: 'avatar',
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: 'level',
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: 'xp',
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: 'maxXp',
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: 'width',
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: 'backgroundShadow',
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: 'roundBg',
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    code: `
        $c[Original by ayansh; refactored by lordduck :P]

        $let[height;$divide[$env[width];3]]
        $if[$env[background]!=;
            $drawImage[;$env[background];0;0;$env[width];$get[height];$env[roundBg]]
        ]

        $if[$env[backgroundShadow]!=;
            $opacity[;$env[backgroundShadow]]
            $drawRect[;fill;#000000;0;0;$env[width];$get[height];$env[roundBg]]
            $opacity[;100]
        ]

        $let[pfpPosition;$divide[$env[width];20]]
        $let[pfpDimensions;$divide[$env[width];4.25]]
        $drawImage[;$env[avatar];$get[pfpPosition];$get[pfpPosition];$get[pfpDimensions];$get[pfpDimensions];$divide[$get[pfpDimensions];2]]

        $let[font;Comfortaa-latin, Comfortaa-latin-ext, Comfortaa-cyrillic, Comfortaa-cyrillic-ext, Comfortaa-greek, Comfortaa-vietnamese, Yu Gothic, Twemoji]
        $let[afterAvatarX;$math[$get[pfpPosition]*2+$get[pfpDimensions]]]
        $let[end;$math[$env[width]-$get[afterAvatarX]-$get[pfpPosition]]]

        $let[oldBaseline;$textBaseline]
        $textBaseline[;top]
        $drawText[;fill;$env[name];bold $divide[$get[height];4.85]px $get[font];#fff;$get[afterAvatarX];$math[$get[pfpPosition]*1.5];$get[end];false;erase-character]

        $drawProgressBar[;$get[afterAvatarX];$math[$get[height]-$get[pfpPosition]*2.1];$get[end];$divide[$get[height];6.5];
            $barData[$math[$env[xp]/$env[maxXp]*100];#fff]
            $barOptions[
                draw-type:fill;
                radius:$divide[$get[height];2.5];
                left:#ffffff80
            ]
        ]

        $let[font;Comfortaa-latin, Comfortaa-latin-ext]

        $let[fontsize;$divide[$get[height];11]]
        $let[levelY;$math[($get[height]-$get[pfpPosition]*2.2)-$get[fontsize]]]

        $let[xpFont;bold $get[fontsize]px $get[font]]
        $let[xpWidth;$measureText[;$env[xp] / $env[maxXp];$get[xpFont];width]]

        $drawText[;fill;Level $env[level];$get[fontsize]px $get[font];#fff;$get[afterAvatarX];$get[levelY];$sub[$get[end];$get[xpWidth]]]

        $let[oldAlign;$textAlign]
        $textAlign[;right]

        $drawText[;fill;$env[xp] / $env[maxXp];$get[xpFont];#fff;$sum[$get[end];$get[afterAvatarX]];$get[levelY]]

        $textAlign[;$get[oldAlign]]
        $textBaseline[;$get[oldBaseline]]
    `
});
