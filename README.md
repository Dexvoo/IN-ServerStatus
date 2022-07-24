# IN-ServerStatus

<img align="right" src="https://imgur.com/5N3uHl2.png" width=40%>
<strong>A discord bot that interacts with (https://github.com/PABLO-1610/cfx-api)
<br>
Discord JS v14
<br>
Slash Commands
<br>
How to install

```bash
npm install
```

Create a `.env` file (at the root of the folder) and use the config below, Please fill in everything execept from FiveMMessageID.

```bash
# Discord Bot Token
Token=''
# Your Guild Information
ClientID=''
GuildID=''
# Embed Config
ThumnailImage='https://imgur.com/0KIFmOl.gif'
EmbedColour='#a082ff'
FooterText='• IND 2022'
FooterImage='https://imgur.com/0KIFmOl.gif'
# FiveM Server Status
FiveMEmbedUpdateTime=60 # In Seconds
FiveMServerID='lm6l84' # https://keymaster.fivem.net/
FiveMShowPlayerInformation=false # or true
FiveMChannelID=''
DonationWebsite='https://ind.tebex.io'

# Leave blank for install, once you have the message ID Put it in
FiveMMessageID=''
```

Discord Commands Register

```bash
npm run commands
```

Starting Bot

```bash
npm run dev
```

Copy the message id of the message inside of the FiveMChannelID, place it the config. Save any .js file and it will be running!
