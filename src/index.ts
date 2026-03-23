/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { CanvasManager, ComponentManager, GIFManager, GradientManager, ImageManager, LottieManager, NeuQuantManager } from './classes';

import * as pkg from '../package.json';
export const version = pkg.version;

export class ForgeCanvas extends ForgeExtension {
    name = 'forge.canvas';
    description = pkg.description;
    version = version;

    public init(client: ForgeClient) {
        this.load(__dirname + '/functions');
        client.preloadImages = new ImageManager();
    }

    public static components = new ComponentManager();
}

declare module '@tryforge/forgescript' {
    interface ForgeClient {
        preloadImages: ImageManager;
    }

    interface Context {
        canvasManager?: CanvasManager;
        gradientManager?: GradientManager;
        imageManager?: ImageManager;
        gifManager?: GIFManager;
        neuquantManager?: NeuQuantManager;
        lottieManager?: LottieManager;
    }
}

export * from './structures';
export * from './classes';