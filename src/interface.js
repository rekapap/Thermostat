$(document).ready(function() { 

  var thermostat = new Thermostat

  $('#temperature').text(thermostat.getCurrentTemperature());

  $('#temperature-up').on('click', function() {
    thermostat.up(); 
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#powersaving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperature();
  })

  $('#powersaving-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#ppower-saving-status').text('off');
    updateTemperature();
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.energyUsage());
  };

});
