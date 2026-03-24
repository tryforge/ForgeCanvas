/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction } from '@tryforge/forgescript';
import { clearAllCache } from '@napi-rs/canvas';

import { charWidthCache, wordWidthCache, cacheRegex } from '../..';

export default new NativeFunction({
    name: '$clearCanvasCache',
    description: 'Clears all canvas caches',
    version: '1.3.0',
    brackets: false,
    unwrap: true,
    args: [],
    execute(ctx) {
        const preloaded = ctx.client.preloadImages;
        preloaded.map.forEach((x, k) => {
            if (cacheRegex.test(k)) { // @ts-ignore
                x = undefined;
                return preloaded.map.delete(k);
            }
        });

        charWidthCache.clear();
        wordWidthCache.clear();
        clearAllCache();
        return this.success();
    }
});
