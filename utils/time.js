const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'time' });
  }
  parseMS(ms) {
    const roundTowardsZero = ms > 0 ? Math.floor : Math.ceil;

    return {
      days: roundTowardsZero(ms / 86400000),
      hours: roundTowardsZero(ms / 3600000) % 24,
      minutes: roundTowardsZero(ms / 60000) % 60,
      seconds: roundTowardsZero(ms / 1000) % 60,
      milliseconds: roundTowardsZero(ms) % 1000,
      microseconds: roundTowardsZero(ms * 1000) % 1000,
      nanoseconds: roundTowardsZero(ms * 1e6) % 1000,
    };
  }
  format(ms) {
    let formatObj = this.parseMS(Math.abs(ms));
    let vrijeme = [];
    if (formatObj.days) vrijeme.push(formatObj.days + 'd');
    if (formatObj.hours) vrijeme.push(formatObj.hours + 'h');
    if (formatObj.minutes) vrijeme.push(formatObj.minutes + 'm');
    if (formatObj.seconds) vrijeme.push(formatObj.seconds + 's');

    if (vrijeme.length == 0) return ms + 'ms';
    return vrijeme.join(', ');
  }
};
