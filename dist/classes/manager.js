"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentManager = exports.LottieManager = exports.NeuQuantManager = exports.GIFManager = exports.ImageManager = exports.GradientManager = exports.CanvasManager = void 0;
const canvas_1 = require("@napi-rs/canvas");
const builder_1 = require("./builder");
const __1 = require("../");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const forgescript_1 = require("@tryforge/forgescript");
const forgescript_2 = require("@tryforge/forgescript");
class Manager {
    map;
    constructor() {
        this.map = new Map();
    }
    get(name) { return this.map.get(name); }
    remove(name) { this.map.delete(name); }
}
class CanvasManager extends Manager {
    current;
    constructor() {
        super();
        this.current = [];
    }
    get lastCurrent() {
        return this.current[this.current.length - 1];
    }
    set(name, a, b) {
        if (typeof a === 'number')
            this.map.set(name, new builder_1.CanvasBuilder(a, b ?? a));
        else
            this.map.set(name, a);
    }
}
exports.CanvasManager = CanvasManager;
class GradientManager extends Manager {
    ctx;
    stops;
    constructor() {
        super();
        this.ctx = (0, canvas_1.createCanvas)(1, 1).getContext('2d');
        this.stops = [];
    }
    set(name, a, ...options) {
        if (__1.GradientType?.[a])
            this.map.set(name, a === __1.GradientType.radial
                ? this.ctx.createRadialGradient(...options)
                : a === __1.GradientType.conic
                    ? this.ctx.createConicGradient(...options)
                    : this.ctx.createLinearGradient(...options));
        else
            this.map.set(name, a);
    }
}
exports.GradientManager = GradientManager;
class ImageManager extends Manager {
    set(name, image) { this.map.set(name, image); }
}
exports.ImageManager = ImageManager;
class GIFManager {
    encoders;
    decoders;
    decodeOptions;
    frames;
    currentOptions;
    currentEncoder;
    constructor() {
        this.encoders = new Map();
        this.decoders = new Map();
        this.decodeOptions = new Map();
        this.frames = new Map();
        this.currentOptions = null;
        this.currentEncoder = [];
    }
    get lastCurrentEncoder() {
        return this.currentEncoder[this.currentEncoder.length - 1];
    }
    setEncoder(name, encoder) { this.encoders.set(name, encoder); }
    setDecoder(name, decoder) { this.decoders.set(name, decoder); }
    setDecodeOptions(name, options) { this.decodeOptions.set(name, options); }
    setFrame(name, frame) { this.frames.set(name, frame); }
    getEncoder(name) { return this.encoders.get(name); }
    getDecoder(name) { return this.decoders.get(name); }
    getDecodeOptions(name) { return this.decodeOptions.get(name); }
    getFrame(name) { return this.frames.get(name); }
    removeEncoder(name) { this.encoders.delete(name); }
    removeDecoder(name) { this.decoders.delete(name); }
    removeDecodeOptions(name) { this.decodeOptions.delete(name); }
    removeFrame(name) { this.frames.delete(name); }
}
exports.GIFManager = GIFManager;
class NeuQuantManager extends Manager {
    set(name, nq) { this.map.set(name, nq); }
}
exports.NeuQuantManager = NeuQuantManager;
class LottieManager extends Manager {
    set(name, lottie) { this.map.set(name, lottie); }
}
exports.LottieManager = LottieManager;
class ComponentManager extends Manager {
    set(component) {
        this.map.set(// @ts-ignore
        component?.data?.name ?? component.name, component instanceof forgescript_2.ForgeFunction
            ? component : new forgescript_2.ForgeFunction(component));
    }
    load(path, log) {
        if (!(0, node_fs_1.existsSync)(path))
            throw forgescript_1.Logger.error(`Component ${path} does not exist`);
        if ((0, node_fs_1.statSync)(path).isFile()) {
            if (!path.endsWith('.js'))
                return;
            try {
                require.cache[path] = undefined;
                const r = require(path);
                const component = r?.default ?? r;
                this.set(component);
                if (log)
                    forgescript_1.Logger.info(`Successfully loaded component: ${component.data?.name ?? component.name}`);
            }
            catch (error) {
                throw forgescript_1.Logger.error(`Failed to load component ${path}: ${error}`);
            }
        }
        else
            for (const child of (0, node_fs_1.readdirSync)(path))
                this.load((0, node_path_1.join)(path, child), log);
    }
}
exports.ComponentManager = ComponentManager;
