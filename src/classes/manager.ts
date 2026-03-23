/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { SKRSContext2D, createCanvas, CanvasGradient, Image, loadImage, LottieAnimation, LoadImageOptions } from '@napi-rs/canvas';
import { DecodeOptions, Decoder, Encoder, Frame, NeuQuant } from '@gifsx/gifsx';

import { ForgeFunction, IForgeFunction, Logger } from '@tryforge/forgescript';

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { CanvasBuilder, GradientType } from '..';

class Manager<T> {
    public map: Map<string, T>;

    constructor() { this.map = new Map() }

    public get(name: string) { return this.map.get(name) }
    public remove(name: string) { this.map.delete(name) }
}

export class CanvasManager extends Manager<CanvasBuilder> {
    public current: CanvasBuilder | undefined;

    set(name: string, canvas: CanvasBuilder): void;
    set(name: string, width: number, height: number): void;
    public set(name: string, a: CanvasBuilder | number, b?: number) {
        if (typeof a === 'number')
            this.map.set(name, new CanvasBuilder(a, b ?? a));
        else this.map.set(name, a);
    }

    public getOrCurrent(name: string | null) { // @ts-ignore
        return this.map.get(name) ?? this.current;
    }
}

export class GIFManager {
    public encoders: Map<string, Encoder>;
    public decoders: Map<string, Decoder>;
    public decodeOptions: Map<string, DecodeOptions>;
    public frames: Map<string, Frame>;
    public currentOptions: DecodeOptions | undefined;
    public currentEncoder: Encoder | undefined;

    constructor() {
        this.encoders = new Map();
        this.decoders = new Map();
        this.decodeOptions = new Map();
        this.frames = new Map();
    }

    public getEncoderOrCurrent(name: string | null) { // @ts-ignore
        return this.encoders.get(name) ?? this.currentEncoder;
    }

    public setEncoder(name: string, encoder: Encoder) { this.encoders.set(name, encoder) }
    public setDecoder(name: string, decoder: Decoder) { this.decoders.set(name, decoder) }
    public setDecodeOptions(name: string, options: DecodeOptions) { this.decodeOptions.set(name, options) }
    public setFrame(name: string, frame: Frame) { this.frames.set(name, frame) }

    public getEncoder(name: string) { return this.encoders.get(name) }
    public getDecoder(name: string) { return this.decoders.get(name) }
    public getDecodeOptions(name: string) { return this.decodeOptions.get(name) }
    public getFrame(name: string) { return this.frames.get(name) }

    public removeEncoder(name: string) { this.encoders.delete(name) }
    public removeDecoder(name: string) { this.decoders.delete(name) }
    public removeDecodeOptions(name: string) { this.decodeOptions.delete(name) }
    public removeFrame(name: string) { this.frames.delete(name) }
}

export class GradientManager extends Manager<CanvasGradient> {
    private ctx: SKRSContext2D;
    public stops: [number, string][];

    constructor() {
        super();
        this.ctx = createCanvas(0,0).getContext('2d');
        this.stops = [];
    }

    set(name: string, gradient: CanvasGradient): void;
    set(name: string, type: GradientType.radial, x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): void;
    set(name: string, type: GradientType.conic, startAngle: number, x: number, y: number): void;
    set(name: string, type: GradientType.linear, x1: number, y1: number, x2: number, y2: number): void;
    public set(name: string, a: CanvasGradient | GradientType, ...options: number[]) {
        if (typeof a !== 'object')
            this.map.set(
                name, a === GradientType.radial
                    ? this.ctx.createRadialGradient(...options as [number, number, number, number, number, number])
                : a === GradientType.conic
                    ? this.ctx.createConicGradient(...options as [number, number, number])
                : this.ctx.createLinearGradient(...options as [number, number, number, number])
            );
        else this.map.set(name, a);
    }
}

export class ImageManager extends Manager<Image> {
    public loadOptions?: LoadImageOptions;

    public set(name: string, image: Image) { this.map.set(name, image) }
    
    load(src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL): Promise<Image>;
    load(name: string, src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL): Promise<Image>;
    public async load(
        name: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL,
        src?: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL
    ) {
        if (name instanceof Image) return name;
        
        const image = await loadImage(src ?? name, this.loadOptions);
        if (typeof name === 'string') this.map.set(name, image);

        return image;
    }

    public async tryGet(name: string, src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL) {
        let image = this.map.get(name);
        if (image) return image;

        image = await this.load(name, src);
        this.map.set(name, image);

        return image;
    }
}

export class NeuQuantManager extends Manager<NeuQuant> {
    public set(name: string, nq: NeuQuant) { this.map.set(name, nq) }
}

export class LottieManager extends Manager<LottieAnimation> {
    public set(name: string, lottie: LottieAnimation) { this.map.set(name, lottie) }
}

export class ComponentManager extends Manager<ForgeFunction> {
    public set(component: ForgeFunction | IForgeFunction) {
        this.map.set( // @ts-ignore
            component?.data?.name ?? component.name,
            component instanceof ForgeFunction
                ? component : new ForgeFunction(component)
        );
    }

    public load(path: string, log?: boolean) {
        if (!existsSync(path)) throw Logger.error(`Component ${path} does not exist`);
        if (statSync(path).isFile()) {
            if(!path.endsWith('.js')) return;
            try {
                require.cache[path] = undefined;
                const r = require(path);
                const component = r?.default ?? r;
                this.set(component);
                if (log) Logger.info(`Successfully loaded component: ${component.data?.name ?? component.name}`);
            } catch (error) { throw Logger.error(`Failed to load component ${path}: ${error}`) }
        } else for (const child of readdirSync(path))
            this.load(join(path, child), log);
    }
}