/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ArgType, NativeFunction, Return } from '@tryforge/forgescript';
import { ForgeCanvasError, FillOrStroke, TextAlign, TextWrap, validateFont, resolveStyle, parseText } from '../..';

export default new NativeFunction({
    name: '$drawText',
    aliases: ['$placeText', '$text', '$writeText'],
    description: 'Draws a filled/stroked text on a canvas',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'type',
            description: 'The text type',
            type: ArgType.Enum,
            enum: FillOrStroke,
            required: true,
            rest: false
        },
        {
            name: 'text',
            description: 'The text to draw',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The text font ({size}px {font name})',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The text start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The text start Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxWidth',
            description: 'Maximum font width',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'multiline',
            description: 'Indicates if new lines should be allowed',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'wrap',
            description: 'Indicates how the text should be wrapped if it exceeds the maximum width',
            type: ArgType.Enum,
            enum: TextWrap,
            required: false,
            rest: false
        },
        {
            name: 'lineOffset',
            description: 'The text lines offset',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'newlineBeginning',
            description: 'The alignment of the text when a new line is encountered',
            type: ArgType.Enum,
            enum: TextAlign,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'allowEmojis',
            description: 'Indicates if custom emojis should be drawn; emojis get cached into preload://cache_emoji_{id}',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        }
    ],
    async execute (ctx, [name, t, text, font, style, x, y, maxWidth, multiline, wrap, lineOffset, nlAlign, allowEmojis]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        const valid = validateFont(font);
        if (!valid || typeof valid === 'string') return this.customError(valid);

        const s = await resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx[t === FillOrStroke.fill ? 'fillStyle' : 'strokeStyle'] = s;
        canvas.text(
            t,
            await parseText(
                ctx.client, text,
                multiline === true, allowEmojis
            ),
            x, y,
            font,
            typeof maxWidth === 'number' ? maxWidth : undefined,
            // @ts-expect-error
            TextAlign[wrap] !== undefined ? wrap : undefined,
            typeof lineOffset === 'number' ? lineOffset : undefined,
            // @ts-expect-error
            typeof nlAlign === 'number' ? TextAlign[nlAlign] : nlAlign
        );

        return this.success();
    }
});
