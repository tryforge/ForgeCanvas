const {
    createCompilerHost,
    createProgram,
    readConfigFile,
    sys,
    parseJsonConfigFileContent
} = require('typescript');
const { resolve } = require('node:path');

const parsed = parseJsonConfigFileContent(
    readConfigFile(
        resolve(__dirname, 'tsconfig.json'),
        sys.readFile
    ), sys, __dirname
);

const files = parsed.fileNames.filter(
    x => !x.includes('/functions/') && !x.includes('/__test__/')
);

const t = Date.now();

const host = createCompilerHost(parsed.options);
const program = createProgram(files, parsed.options, host);

program.emit();
console.log(`Generated declaration files in ${(Date.now() - t) / 1000}s`)