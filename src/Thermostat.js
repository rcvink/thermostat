function Thermostat() {
  this._temperature = 20;
  this._minimumTemperature = 10;
  this._powerSaveMode = true;
};

const MIN_TEMPERATURE = 10;
const NON_POWER_SAVING_MAX = 32;
const POWER_SAVING_MAX = 25;

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.isPowerSaving = function() {
  return this._powerSaveMode;
};

Thermostat.prototype.up = function(temperatureIncrease) {
  let maxTemp = this._maximumTemperature();
  if ((this._temperature + temperatureIncrease) > maxTemp) {
    throw Error(`Cannot increase temperature above ${maxTemp} degrees`);
  } else {
    this._temperature += temperatureIncrease;
  }
};

Thermostat.prototype.down = function(temperatureDecrease) {
  if (this._temperature - temperatureDecrease <= MIN_TEMPERATURE) {
    throw Error('Cannot decrease temperature below 10 degrees');
  };
  this._temperature -= temperatureDecrease;
};

Thermostat.prototype.setPowerSave = function () {
  this._powerSaveMode = !this._powerSaveMode;
};

Thermostat.prototype.reset = function () {
  this._temperature = 20;
};

Thermostat.prototype._maximumTemperature = function () {
  return this.isPowerSaving() ? POWER_SAVING_MAX : NON_POWER_SAVING_MAX;
};
