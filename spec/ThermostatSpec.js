describe('Thermostat', function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('is at 20 degrees initially', function() {
    expect(thermostat.temperature()).toEqual(20)
  });
});
