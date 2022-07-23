# IN-ServerStatus

A discord bot that interacts with [cfx-api](https://github.com/PABLO-1610/cfx-api), Shows with a embed that updates every so often.

<img align="right" src="https://imgur.com/5N3uHl2.png" width=40%>
<br>
<br>
<br>
**How to install**

```bash
npm install
```

Create a `.env` file (at the root of the folder) and use the config below, Please fill in as much as you can.

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
# Fill in this once you have got your message you want to embed
FiveMChannelID=''
FiveMMessageID=''
DonationWebsite='https://ind.tebex.io'
```

Discord Commands Register

```bash
npm run commands
```

Starting Bot

```bash
npm run dev
```

Discord Command in the channel you wish

```bash
/serverstatus
```

Copy the channel id and message id, place it the config. Save any .js file and it will be running!
