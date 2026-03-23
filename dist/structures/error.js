"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeCanvasError = void 0;
exports.ForgeCanvasError = {
    EmptyName: 'The name argument cannot be empty',
    NoCanvas: 'No canvas with provided name found',
    NoImage: 'No image with provided name found',
    NoGradient: 'No gradient with provided name found',
    NoStyle: 'No style provided',
    NoFilter: 'No filter provided',
    NoFilterOrValue: 'No filter or value provided',
    ImageFail: 'Failed to load an image',
    InvalidOffset: 'Offset must be between 0 and 100',
    InvalidRectType: 'Invalid rect type provided (Expected fill/stroke/clear)',
    InvalidLineDashSegments: 'Invalid line dash segments provided (Expected array of numbers)',
    InvalidFontFormat: 'Invalid font format provided',
    InvalidFont: 'Provided font does not exist',
    NoEncoder: 'No GIF encoder with provided name found',
    NoDecoder: 'No GIF decoder with provided name found',
    NoDecodeOptions: 'No decode options with provided name found',
    NoNeuQuant: 'No NeuQuant Instance with provided name found',
    NoFrame: 'No frame with provided name found',
    NoSizeAndPalette: 'No size and palette has been set',
    FrameFail: 'Failed to load a frame',
    NoLottie: 'No Lottie animation with provided name found',
    NoBarData: 'No bar data provided',
    InvalidBarType: 'Invalid bar type provided (Expected normal/pie)',
    InvalidBarDirection: 'Invalid bar direction provided (Expected horizontal/vertical)',
    NoComponent: 'No component with provided name found',
    NoSize: 'No size has been set',
    NoPath: 'No path provided',
    ArrayExpected: 'Array expected',
    InvalidWidthOrHeight: 'Invalid width or height provided',
};
