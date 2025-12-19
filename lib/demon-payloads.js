const { cttl } = require('../devinehisdemon/cttl');
const { ngazap } = require('../devinehisdemon/nightraider');
const { bugpdf } = require('../devinehisdemon/myfunction1');

let virtex7, bugios, nightzap, iosCrash, androidCrash, blankBug, freezeText, deathText;

try { virtex7 = require('../devinehisdemon/myfunction2').virtex7; } catch(e) { virtex7 = null; }
try { bugios = require('../devinehisdemon/myfunction3').bugios; } catch(e) { bugios = null; }
try { nightzap = require('../devinehisdemon/myfunction4').nightzap; } catch(e) { nightzap = null; }
try { iosCrash = require('../devinehisdemon/myfunction5').iosCrash; } catch(e) { iosCrash = null; }
try { androidCrash = require('../devinehisdemon/myfunction6').androidCrash; } catch(e) { androidCrash = null; }
try { blankBug = require('../devinehisdemon/myfunction9').blankBug; } catch(e) { blankBug = null; }
try { freezeText = require('../devinehisdemon/myfunction10').freezeText; } catch(e) { freezeText = null; }
try { deathText = require('../devinehisdemon/myfunction11').deathText; } catch(e) { deathText = null; }

const getDemonPayloads = () => {
  const payloads = [];
  
  if (cttl) payloads.push(cttl);
  if (typeof ngazap === 'function') payloads.push(ngazap(''));
  if (bugpdf) payloads.push(bugpdf);
  if (virtex7) payloads.push(virtex7);
  if (bugios) payloads.push(bugios);
  if (nightzap) payloads.push(typeof nightzap === 'function' ? nightzap() : nightzap);
  if (iosCrash) payloads.push(iosCrash);
  if (androidCrash) payloads.push(androidCrash);
  if (blankBug) payloads.push(blankBug);
  if (freezeText) payloads.push(freezeText);
  if (deathText) payloads.push(deathText);
  
  return payloads.filter(p => p && typeof p === 'string' && p.length > 0);
};

const getRandomDemonPayload = () => {
  const payloads = getDemonPayloads();
  if (payloads.length === 0) return null;
  return payloads[Math.floor(Math.random() * payloads.length)];
};

const getEnhancedTexts = (baseTexts = []) => {
  const demonPayloads = getDemonPayloads();
  return [...baseTexts, ...demonPayloads.slice(0, 5)];
};

module.exports = {
  getDemonPayloads,
  getRandomDemonPayload,
  getEnhancedTexts,
  cttl,
  ngazap,
  bugpdf
};
