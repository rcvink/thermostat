describe('Thermostat', function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('Initially', function () {
    it('is at 20 degrees initially', function() {
      expect(thermostat.temperature()).toEqual(20);
    });

    it('is in power saving mode', function() {
      expect(thermostat.isPowerSaving()).toEqual(true);
    });
  });

  describe('up', function() {
    it('increases temperature', function() {
      thermostat.up(5);
      expect(thermostat.temperature()).toEqual(25);
    });

    it('cannot increase past 25 degrees in power save mode', function() {
      expect(function() {thermostat.up(6)}).toThrowError('Cannot increase temperature above 25 degrees');
    });

    it('cannot increase past 32 degrees when power save mode off', function() {
      thermostat.setPowerSave()
      expect(function() {thermostat.up(13)}).toThrowError('Cannot increase temperature above 32 degrees');
    });
  });

  describe('down', function() {
    it('decreases temperature', function() {
      thermostat.down(5);
      expect(thermostat.temperature()).toEqual(15);
    });

    it('does not decrease temperature below 10 degrees', function() {
      expect(function() {thermostat.down(11)}).toThrowError('Cannot decrease temperature below 10 degrees');
    });
  });

  describe('setPowerSave', function() {
    it('changes power save mode to off', function () {
      thermostat.setPowerSave()
      expect(thermostat.isPowerSaving()).toEqual(false)
    });

    it('changes power save mode to on', function () {
      thermostat.setPowerSave()
      thermostat.setPowerSave()
      expect(thermostat.isPowerSaving()).toEqual(true)
    });
  });

  describe('reset', function() {
    it('resets the temperature to 20', function () {
      thermostat.reset()
      expect(thermostat.temperature()).toEqual(20)
    });
  });

  describe('currentUsage', function() {
    it('returns low-usage for temperatures <18', function () {
      thermostat.down(5)
      expect(thermostat.currentUsage()).toEqual('low-usage')
    });

    it('returns medium-usage for temperatures 18 < x < 25', function () {
      expect(thermostat.currentUsage()).toEqual('medium-usage')
    });

    it('returns high-usage for temperatures >25', function () {
      thermostat.setPowerSave()
      thermostat.up(6)
      expect(thermostat.currentUsage()).toEqual('high-usage')
    });
  });
});
