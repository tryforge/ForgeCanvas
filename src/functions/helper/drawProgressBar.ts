import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';
import { getBarOptions, getBarData } from './progressBarUtils';

export default new NativeFunction({
    name: '$drawProgressBar',
    aliases: ['$progressBar', '$bar'],
    description: 'Creates and draws progress bars on a canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas to draw on.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [canvasName]) {
        const canvas = ctx.canvasManager?.get(canvasName);

        if (!canvas) {
            return this.customError('No canvas found.');
        }

        const ctx2D = canvas.ctx;

        // Retrieve options and data
        const progressBarOptions = getBarOptions(ctx);
        const progressBarData = getBarData(ctx);

        if (!progressBarData.length) {
            return this.customError('No bar data provided.');
        }

        const { type, height, maxWidth, background, radius } = progressBarOptions;
        const totalValue = progressBarData.reduce((sum, data) => sum + data.value, 0);

        if (type === 'normal') {
            // Background
            ctx2D.fillStyle = background;
            ctx2D.fillRect(0, 0, maxWidth, height);

            // Segments
            let currentX = 0;
            for (const { value, color } of progressBarData) {
                const segmentWidth = (value / 100) * maxWidth;
                ctx2D.fillStyle = color;

                if (radius > 0) {
                    ctx2D.beginPath();
                    ctx2D.moveTo(currentX + radius, 0);
                    ctx2D.arcTo(currentX + segmentWidth, 0, currentX + segmentWidth, height, radius);
                    ctx2D.arcTo(currentX + segmentWidth, height, currentX, height, radius);
                    ctx2D.arcTo(currentX, height, currentX, 0, radius);
                    ctx2D.arcTo(currentX, 0, currentX + radius, 0, radius);
                    ctx2D.closePath();
                    ctx2D.fill();
                } else {
                    ctx2D.fillRect(currentX, 0, segmentWidth, height);
                }

                currentX += segmentWidth;
            }
        } else if (type === 'ratio') {
            ctx2D.fillStyle = background;
            ctx2D.fillRect(0, 0, maxWidth, height);

            let currentX = 0;
            for (const { value, color } of progressBarData) {
                const segmentWidth = (value / totalValue) * maxWidth;
                ctx2D.fillStyle = color;
                ctx2D.fillRect(currentX, 0, segmentWidth, height);
                currentX += segmentWidth;
            }
        } else if (type === 'pie') {
            const centerX = maxWidth / 2;
            const centerY = height / 2;
            const pieRadius = Math.min(maxWidth, height) / 2;

            let startAngle = 0;
            for (const { value, color } of progressBarData) {
                const sliceAngle = (value / totalValue) * (Math.PI * 2);
                ctx2D.fillStyle = color;

                ctx2D.beginPath();
                ctx2D.moveTo(centerX, centerY);
                ctx2D.arc(centerX, centerY, pieRadius, startAngle, startAngle + sliceAngle);
                ctx2D.closePath();
                ctx2D.fill();

                startAngle += sliceAngle;
            }
        } else {
            return this.customError(`Unknown bar type: ${type}`);
        }

        return this.success('Progress bar drawn successfully.');
    }
});
