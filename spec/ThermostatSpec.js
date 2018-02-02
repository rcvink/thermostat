describe('Thermostat', function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('initially', function () {
    it('is at 20 degrees', function() {
      expect(thermostat.temperature()).toEqual(STARTING_TEMP);
    });

    it('is in power saving mode', function() {
      expect(thermostat.isPowerSaving()).toEqual(true);
    });
  });

  describe('up', function() {
    it('increases temperature by 1', function() {
      thermostat.up();
      expect(thermostat.temperature()).toEqual(21);
    });

    it('does not increase beyond 25 degrees in power save mode', function() {
      var thermostat = new Thermostat(25);
      expect(function() {thermostat.up()}).toThrowError('Cannot increase temperature above 25 degrees');
    });

    it('does not increase beyond 32 degrees when power save mode off', function() {
      var thermostat = new Thermostat(32, false);
      expect(function() {thermostat.up()}).toThrowError('Cannot increase temperature above 32 degrees');
    });
  });

  describe('down', function() {
    it('decreases temperature by 1', function() {
      thermostat.down();
      expect(thermostat.temperature()).toEqual(19);
    });

    it('does not decrease temperature below 10 degrees', function() {
      thermostat = new Thermostat(10);
      expect(function() {thermostat.down()}).toThrowError('Cannot decrease temperature below 10 degrees');
    });
  });

  describe('changePowerMode', function() {
    describe('when mode is "on"', function() {
      it('changes to off', function() {
        thermostat.changePowerMode();
        expect(thermostat.isPowerSaving()).toEqual(false);
      });

      it('reduces temperature to 25 if necessary', function() {
        thermostat = new Thermostat(32, false);
        thermostat.changePowerMode();
        expect(thermostat.temperature()).toEqual(25);
      });
    });

    describe('when mode is "off"', function() {
      it('changes to on', function() {
        thermostat = new Thermostat(20, false);
        thermostat.changePowerMode();
        expect(thermostat.isPowerSaving()).toEqual(true);
      });
    });
  });

  describe('reset', function() {
    it('resets the temperature to 20', function () {
      thermostat = new Thermostat(21);
      thermostat.reset();
      expect(thermostat.temperature()).toEqual(20);
    });

    it('changes power save mode to "on"', function() {
      thermostat = new Thermostat(20, false);
      thermostat.reset();
      expect(thermostat.isPowerSaving()).toEqual(true);
    });
  });

  describe('currentUsage', function() {
    it('returns low-usage for temperatures <18', function () {
      thermostat = new Thermostat(17);
      expect(thermostat.currentUsage()).toEqual('low-usage')
    });

    it('returns medium-usage for temperatures 18 < x < 25', function () {
      expect(thermostat.currentUsage()).toEqual('medium-usage');
    });

    it('returns high-usage for temperatures >25', function () {
      thermostat = new Thermostat(26, false);
      expect(thermostat.currentUsage()).toEqual('high-usage');
    });
  });
});
