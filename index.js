require('dotenv').config();
require('module-alias/register');

const Growsary = require('./Growsary.js');
const growsary = new Growsary();
growsary.load();
