/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const LICENSE = `/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/`;

const dir = resolve('src');
const HeaderRegex = /^\s*\/\*[\s\S]*?SPDX-License-Identifier:[\s\S]*?\*\/\s*/;

const log = (msg: string) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

if (!existsSync(dir)) {
    console.error('src folder not found');
    process.exit(1);
}

function addHeaderIfMissing(filePath: string) {
    try {
        const content = readFileSync(filePath, 'utf8');
        const stripped = content.replace(HeaderRegex, '');
        const updated = `${LICENSE}\n\n${stripped}`;
        if (updated === content) return false;
        writeFileSync(filePath, updated);
        log(`Added license header → ${filePath}`);
        return true;
    } catch { return false }
}

function scanDir(dir: string) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) scanDir(full);
        else if (st.isFile() && full.endsWith('.ts')) addHeaderIfMissing(full);
    }
}

log('Scanning existing files for missing headers…');
scanDir(dir);
log('Completed the scan.');
