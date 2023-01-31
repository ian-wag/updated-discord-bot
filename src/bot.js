require("dotenv").config;
const { DISCORD_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
