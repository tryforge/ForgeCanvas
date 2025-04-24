module.exports = {
    data: {
        name: "review",
        description: "Review a Server to show others views the server",
        options: [
            {
                type: 3,
                name: "id",
                description: "Server Id Go's Here",
                required: false,
            }
        ]
     },
    code: `
$let[tmpid;$if[$option[id]==;$guildID;$option[id]]]

$onlyIf[$guildExists[$get[tmpid]];Sorry I am not In That Guild.]

$c[controls the positive to negative ratio!]
    $let[good;$getGuildVar[GoodVotes;$get[tmpid];1]]
   $let[bad;$getGuildVar[BadVotes;$get[tmpid];1]]


    $title[Post Your Review!]
    $description[Review $guildName[$get[tmpid]] Support]
$addField[Reviewers;$math[$get[good]+$get[bad]]]
$addField[Pos To Neg; $round[$math[$get[good]/($get[good]+$get[bad])*100]]%:$round[$math[$get[bad]/($get[good]+$get[bad])*100]]%]

$c[Creates The Canvas Baseplate and sets the canvas size!]
$createCanvas[profile;90;50]
 $c[Draws a red bar to reprasent negative and green bar from positive]
$drawRect[profile;fill;#006400;0;0;$round[$math[(900*$get[good]/($get[good]+$get[bad]))]];50]
$drawRect[profile;fill;#8B0000;$round[$math[(900*$get[good]/($get[good]+$get[bad]))]];0;$round[$math[(900*$get[bad]/($get[good]+$get[bad]))]];50]
$renderCanvas[profile;prof.png]
$image[attachment://prof.png]

$c[Add Button Functionality Yourself!]
    $addActionRow
    $addButton[like;;Success;<:Like:1236288901413605437>;]
	$addButton[dislike;;Danger;<:Dislike:1236288996234231899>;]
    
    `
}