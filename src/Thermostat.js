function Thermostat() {
  this._temperature = 20;
  this._minimumTemperature = 10;
};

const MIN_TEMPERATURE = 10;

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.up = function(temperatureIncrease) {
  this._temperature += temperatureIncrease;
};

Thermostat.prototype.down = function(temperatureDecrease) {
  if (this._temperature - temperatureDecrease < MIN_TEMPERATURE) {
    throw Error('Cannot decrease temperature below 10 degrees');
  };
  this._temperature -= temperatureDecrease;
};
