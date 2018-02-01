'use strict';

function Thermostat(initialTemp = STARTING_TEMP, initialMode = true) {
  this._temperature = initialTemp;
  this._minimumTemperature = MIN_TEMPERATURE;
  this._powerSaveMode = initialMode;
};

const STARTING_TEMP = 20;
const MIN_TEMPERATURE = 10;
const NON_POWER_SAVING_MAX = 32;
const POWER_SAVING_MAX = 25;
const LOW_USAGE_THRESHOLD = 18;
const MEDIUM_USAGE_THRESHOLD = 25;

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.isPowerSaving = function() {
  return this._powerSaveMode;
};

Thermostat.prototype.up = function() {
  let maxTemp = this._maximumTemperature();
  if ((this._temperature + 1) > maxTemp) {
    throw Error(`Cannot increase temperature above ${maxTemp} degrees`);
  } else {
    ++this._temperature;
  }
};

Thermostat.prototype.down = function() {
  if (this._temperature - 1 < MIN_TEMPERATURE) {
    throw Error('Cannot decrease temperature below 10 degrees');
  };
  --this._temperature;
};

Thermostat.prototype.setPowerSave = function () {
  this._powerSaveMode = !this._powerSaveMode;
};

Thermostat.prototype.reset = function () {
  this._temperature = 20;
};

Thermostat.prototype.currentUsage = function () {
  let temperature = this.temperature()
  if (temperature < LOW_USAGE_THRESHOLD) {
    return 'low-usage';
  } else if (temperature < MEDIUM_USAGE_THRESHOLD) {
    return 'medium-usage';
  } else {
    return 'high-usage';
  }
};

Thermostat.prototype._maximumTemperature = function () {
  return this.isPowerSaving() ? POWER_SAVING_MAX : NON_POWER_SAVING_MAX;
};
