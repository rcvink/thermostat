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
const HIGH_USAGE_THRESHOLD = 35;

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.isPowerSaving = function() {
  return this._powerSaveMode;
};

Thermostat.prototype.up = function() {
  if (this._willExceedMax()) {
    throw Error(`Cannot increase temperature above ${this._maximumTemperature()} degrees`);
  };
  ++this._temperature;
};

Thermostat.prototype.down = function() {
  if (this._willSubceedMin()) {
    throw Error(`Cannot decrease temperature below ${MIN_TEMPERATURE} degrees`);
  };
  --this._temperature;
};

Thermostat.prototype.changePowerMode = function () {
  this._powerSaveMode ? this._powerSaveOff() : this._powerSaveOn();
};

Thermostat.prototype.reset = function () {
  this._temperature = STARTING_TEMP;
  this._powerSaveMode = true;
};

Thermostat.prototype.currentUsage = function () {
  if (this._isLowEnergyUsage()) {
    return 'low-usage';
  } else if (this._isMediumEnergyUsage()) {
    return 'medium-usage';
  };
  return 'high-usage';
};

Thermostat.prototype._willExceedMax = function () {
  return this._temperature + 1 > this._maximumTemperature();
};

Thermostat.prototype._maximumTemperature = function () {
  return this.isPowerSaving() ? POWER_SAVING_MAX : NON_POWER_SAVING_MAX;
};

Thermostat.prototype._willSubceedMin = function () {
  return this._temperature - 1 < MIN_TEMPERATURE;
};

Thermostat.prototype._powerSaveOff = function () {
  this._powerSaveMode = false;
};

Thermostat.prototype._powerSaveOn = function () {
  this._powerSaveMode = true;
  if (this._exceedsMax()) {
    this._temperature = this._maximumTemperature();
  };
};

Thermostat.prototype._exceedsMax = function () {
  return this._temperature > this._maximumTemperature();
};

Thermostat.prototype._isLowEnergyUsage = function () {
  return this._temperature < LOW_USAGE_THRESHOLD;
};

Thermostat.prototype._isMediumEnergyUsage = function () {
  return this._temperature < MEDIUM_USAGE_THRESHOLD && this._temperature >= LOW_USAGE_THRESHOLD;
};
