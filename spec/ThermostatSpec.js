describe('Thermostat', function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('is at 20 degrees initially', function() {
    expect(thermostat.temperature()).toEqual(20);
  });

  describe('up', function() {
    it('increases temperature', function() {
      thermostat.up(5);
      expect(thermostat.temperature()).toEqual(25);
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
});
