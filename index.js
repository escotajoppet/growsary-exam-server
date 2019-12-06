require('dotenv').config();
require('module-alias/register');

const Growsary = require('@src/Growsary.js');
const growsary = new Growsary();
growsary.load();
