# ForgeCanvas
Easy to use canvas for forge.

[![@tryforge/forge.canvas](https://img.shields.io/github/package-json/v/tryforge/ForgeCanvas/main?label=@tryforge/forge.canvas&color=5c16d4)](https://github.com/tryforge/ForgeCanvas/)
[![@tryforge/forgescript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4)](https://github.com/tryforge/ForgeScript/)
[![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)](https://discord.gg/hcJgjzPvqb)
## How to use

Download this package:
```bash
npm i @tryforge/forge.canvas
```

Now, in your client initialization:
```ts
const { ForgeCanvas } = require("@tryforge/forge.canvas")

// I'll assume client, can be bot or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeCanvas()
    ]
})
```
And voi-la, you now have canvas functions loaded to your bot. <br>
Check our [docs](https://docs.botforge.org/p/ForgeCanvas/) for info of all functions available.
