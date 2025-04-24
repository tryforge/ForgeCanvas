module.exports = {
    data: {
        name: "fakedm",
        description: "Fake dm",
        description_localizations: { "cs": "Upravit Server" },
        options: [
            {
                type: 6,
                name: "user",
                description: "user",
                required: true,
            },
            {
                type: 3,
                name: "message",
                description: "sepperate with ||",
                required: true
            }
        ],
        type: 1
    },
    code: `
    $let[u;$findUser[$option[user]]]
$let[m;$option[message]]
$onlyIf[$userExists[$get[u]];$description[No user?]]
$onlyIf[$get[m]!=;$description[No messge?]]
$arrayLoad[m;||;$get[m]]
$let[m1;$arrayAt[m;0]]
$let[m2;$arrayAt[m;1]]
$onlyIf[$get[m2]!=;$description[Separate the messages using \`||\`]]


 $createCanvas[fake;1500;1000;
 $drawRect[;fill;#1c1d22;0;0;1500;1000]
 $drawRect[;fill;#383A43;0;250;1500;2]

 $c[Outer Circle for Video call]

 $drawRect[;fill;#26262E;1300;60;120;120;60]

 $c[Brightness of Video Call Icon]
 $filter[;add;brightness;3]
    $c[Change \\$drawRect to \\$drawImage remove colour arg and change fill to your icon file path]
    $drawRect[;fill;#26262E;1320;80;80;80;45]
 $filter[;clear]

 $c[Outer Circle for Voice call]
 $drawRect[;fill;#26262E;1100;60;120;120;60]

 $c[Brightness of Voice Call Icon]
 $filter[;add;brightness;3]
    $c[Change \\$drawRect to \\$drawImage remove colour arg and change fill to your icon file path]
    $drawRect[;fill;#26262E;1120;80;80;80;45]
 $filter[;clear]

 $drawImage[;$userAvatar[$get[u]];230;50;150;150;75]

 $c[Change \\$drawRect to \\$drawImage remove colour arg and change fill to your icon file path]
 $drawRect[;fill;#ffffff;350;150;38;38;19]
 
 $drawText[;fill;$userGlobalName[$get[u]];70px OpenSans-Bold;#ffffff;430;120]

 $c[Change "user status thing" to the actual status of the user]
 $drawText[;fill;user status thing;40px DejaVu Sans;#6F717D;430;180]


$c[Message Replied To]

$drawImage[;$userAvatar;280;340;75;75;37.5]
$drawText[;fill;@user message thing;45px DejaVu Sans;#ffffff;390;390]


$c[Message To]

$drawImage[;$userAvatar[$get[u]];50;450;175;175;87.5]
$drawText[;fill;$userGlobalName[$get[u]];65px OpenSans-Bold;#ffffff;280;515] 

$c[Date and Time WARNING TIMEZONE FUNCTION MAY BE REQUIRED FOR DESIRED TIMEZONE]
$drawText[;fill;$day/$month/$year $hour:$minute;50px DejaVu Sans;#81838F;$math[$round[$measureText[;$userGlobalName[$get[u]];65px OpenSans-Bold;width]]+280+50];515]

$c[User Message]

$c[Change The "Lorem ipsum..." to the actual message]
$drawText[;fill;Lorem ipsum odor amet, consectetuer adipiscing elit. Integer scelerisque inceptos arcu tortor auctor nisl. Id cras maximus aliquam dis placerat conubia.;65px OpenSans-Bold;#ffffff;280;595;$math[$round[$measureText[;$userGlobalName[$get[u]];65px OpenSans-Bold;width]]+280+625];true;true;10]

 ]  


 $c[Watermark For the Bot appears in middle opacity can be changed to make brighter or dimmer]
 $opacity[fake;1]
    $drawText[fake;fill;Mai-Chan;250px DejaVu Sans;#ffffff;200;600]
 $opacity[fake;100]


 $sendMessage[$channelID;]
 $renderCanvas[fake;fakedm.png]
`};