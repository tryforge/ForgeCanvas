type rawr<num extends number, meow extends number[] = []> = 
  meow['length'] extends num
    ? meow[number]
    : rawr<num, [...meow, meow['length']]>;

type Range<Min extends number, Max extends number> = 
  Min extends Max 
    ? never 
    : Exclude<rawr<Max>, rawr<Min>> | Min | Max;

declare module 'gif-encoder-2' {
    import { SKRSContext2D } from '@napi-rs/canvas';
    import { ByteArray } from './classes';

    export default class GIFEncoder {
        /**
         * The GIF "buffer".
         */
        public out: ByteArray;

        /**
         * @param width The GIF width.
         * @param height The GIF height.
         * @param algorithm The color quantization algorithm to use.
         */
        constructor(
            width: number,
            height: number,
            algorithm?: 'neuquant' | 'octree',
            useOptimizer?: boolean,
            totalFrames?: number
        );

        /**
         * Starts the encoder.
         */
        public start();

        /**
         * Adds a frame to the GIF.
         * @param context Context of the frame canvas.
         */
        public addFrame(context: SKRSContext2D);

        /**
         * Sets the frame delay.
         * @param value The new delay.
         */
        public setDelay(value: number);

        /**
         * Sets the gif quality.
         * @param value Neuquant quality.
         */
        public setQuality(value: Range<1, 30>);

        /**
         * Sets the number fps.
         * @param value Number of frames per second to display.
         */
        public setFrameRate(value: number);

        /**
         * Sets the optimizer threshold percentage
         * @param value The percentage.
         */
        public setThreshold(value: Range<0, 100>);

        /**
         * Sets the number of loops GIF does.
         * @param value The number.
         */
        public setRepeat(value: number);
        
        /**
         * Sets the transparency color.
         * @param color The color.
         */
        public setTransparent(color: number);

        /**
         * Sets the palette size.
         * @param value The size. (0-255)
         */
        public setPaletteSize(value: number);

        /**
         * Stops the encoder.
         */
        public finish();
    };
};