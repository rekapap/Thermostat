$(document).ready(function() { 

  var thermostat = new Thermostat

  $('#temperature').text(thermostat.getCurrentTemperature());

  $('#temperature-up').on('click', function() {
    thermostat.up(); 
    updateTemperature();
    // debugger;
    sendTemp();
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


  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=53d3f7239274b9a705f8ba4e7569eda7';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };

  var settings = {"city" : "Ashford"}; 

  $.get('/settings', function(data) {
    settings = JSON.parse(data)
    thermostat._temperature = parseInt(settings.current_temperature, 10);
    $('#temperature').text(settings.current_temperature);
    displayWeather(settings.city);
  });

  displayWeather(settings.city);

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
  });

  function sendTemp(){
    $.post("/settings",{ current_temperature: "22222", city: "Csaba"});
  };
  
});
