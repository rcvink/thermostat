function Thermostat() {
  this._temperature = 20;
  this._minimumTemperature = 10;
  this._powerSaveMode = true;
};

const MIN_TEMPERATURE = 10;

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.isPowerSaving = function() {
  return this._powerSaveMode;
};

Thermostat.prototype.up = function(temperatureIncrease) {
  if (this.isPowerSaving() && (this._temperature + temperatureIncrease) > 25) {
    throw Error('Cannot increase temperature above 25 degrees')
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
  this._powerSaveMode = !this._powerSaveMode
};
