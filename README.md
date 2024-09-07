<p align="center"><img height="128" width="128" src="https://raw.githubusercontent.com/tryforge/ForgeCanvas/main/assets/forgecanvas.png" alt="ForgeCanvas logo"></p>
<h1 align="center">ForgeCanvas</h1>
<p align="center">Elevate your Discord app's visual appeal with ease. Create beautiful images using simple canvas functions.</p>
<p align="center">
<a href="https://github.com/tryforge/ForgeCanvas/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeCanvas/main?label=@tryforge/ForgeCanvas&color=5c16d4" alt="@tryforge/forgecanvas"></a>
<a href="https://github.com/tryforge/ForgeScript/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4" alt="@tryforge/forgescript"></a>
<a href="https://discord.gg/hcJgjzPvqb"><img src="https://img.shields.io/discord/739934735387721768?logo=discord" alt="Discord"></a>
</p>
<br>
<h2 align="center">Contents</h2>

1. [Why ForgeCanvas?](#why-forgecanvas)
2. [Installation](#installation)
3. [Contributing](#contributing)
4. [Documentation](https://docs.botforge.org/p/ForgeCanvas/)
5. [Need help!](#need-help)
6. [Credits](#credits)
<br>
<h3 align="center">Why ForgeCanvas?</h3><hr>
<p align="center">ForgeCanvas simplifies image creation, integrates seamlessly with ForgeScript, and makes canvas-related tasks quicker and easier for bot development.</p>
<br>
<h3 align="center">Installation</h3><hr>
<p align="center">Just a few simple steps and you'll be a cook, cooking awesome images by sprinkling magic coding dust.</p>

1. Summon the package by incanting:
   ```bash
   npm i @tryforge/forge.canvas
   ```
2. Summon the package's power with this spell in your main file:
   ```js
   const { ForgeCanvas } = require("@tryforge/forge.canvas")
   ```
3. Behold the power, that's now in your hand. Technically speaking not you but your code, here's how to use it:
   ```js
   // This is your main file,
   // And just like usual, I'll assume this client can be an app or anything
   const { ForgeCanvas } = require("@tryforge/forge.canvas")
   const client = new ForgeClient({
       ...options // The options you currently have   
       extensions: [
           new ForgeCanvas()
       ]
   })
   ```
<br>
<h3 align="center">Contributing</h3><hr>
<p align="center">We're always welcome for brave adventurers to join our quest! Just fork, clone, commit, push, pull request and the usual.</p>
<h3 align="center">Need help!</h3><hr>
<p align="center">Having trouble? Don't fret! Join our <a href="https://botforge.org/discord">Discord server</a> to get some help!</p>
<br>
<h3 align="center">Credits</h3>

*We hope you enjoy using ForgeCanvas!*
This package was made with ♥️ by [Aggelos](https://discord.com/users/637648484979441706)

Contributor|Contribution|Contact
-|-|-
Aggelos|Owner of the package|[Discord](https://discord.com/users/637648484979441706) [GitHub](https://github.com/aggelos-007)
LordDuck|Developer|[Discord](https://discord.com/users/1096717977304453160) [GitHub](https://github.com/devlordduck)
Aurea|Readme|[Discord](https://discord.com/users/976413539076026388) [GitHub](https://github.com/aurea6)
Aditya|Readme Answer|[Discord](https://discord.com/users/903681538842054686) [GitHub](https://github.com/Clyders)
Econome|Middle man of the west|[Discord](https://discord.com/users/838105973985771520) [GitHub](https://github.com/project-econome)

<strong>P.S.:</strong> We may or may not accept bribes in form of pizza!
