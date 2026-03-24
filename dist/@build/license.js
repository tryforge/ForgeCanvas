"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const LICENSE = `/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/`;
const dir = (0, node_path_1.resolve)('src');
const HeaderRegex = /^\s*\/\*[\s\S]*?SPDX-License-Identifier:[\s\S]*?\*\/\s*/;
const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
if (!(0, node_fs_1.existsSync)(dir)) {
    console.error('src folder not found');
    process.exit(1);
}
function addHeaderIfMissing(filePath) {
    try {
        const content = (0, node_fs_1.readFileSync)(filePath, 'utf8');
        const stripped = content.replace(HeaderRegex, '');
        const updated = `${LICENSE}\n\n${stripped}`;
        if (updated === content)
            return false;
        (0, node_fs_1.writeFileSync)(filePath, updated);
        log(`Added license header → ${filePath}`);
        return true;
    }
    catch {
        return false;
    }
}
function scanDir(dir) {
    for (const entry of (0, node_fs_1.readdirSync)(dir)) {
        const full = (0, node_path_1.join)(dir, entry);
        const st = (0, node_fs_1.statSync)(full);
        if (st.isDirectory())
            scanDir(full);
        else if (st.isFile() && full.endsWith('.ts'))
            addHeaderIfMissing(full);
    }
}
log('Scanning existing files for missing headers…');
scanDir(dir);
log('Completed the scan.');
