var Thermostat = function(){
  this.DEFAULT_TEMPERATURE = 20;
  this.MINIMUM_TEMPERATURE = 10;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this._powerSavingMode = true;
  this._temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this._temperature;
};

Thermostat.prototype.isMinimumTemperature = function() {
  return this._temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isMaximumTemperature = function() {
  if (this.isPowerSavingModeOn() === false) {
    return this._temperature === this.MAX_LIMIT_PSM_OFF;
  }
  return this._temperature === this.MAX_LIMIT_PSM_ON;
};

// PSM 
Thermostat.prototype.isPowerSavingModeOn = function() {
  return this._powerSavingMode === true;
};

Thermostat.prototype.switchPowerSavingModeOn = function() {
  this._powerSavingMode = true;
};

Thermostat.prototype.switchPowerSavingModeOff = function() {
  this._powerSavingMode = false;
};

// Controlls
Thermostat.prototype.up = function() {
  if (this.isMaximumTemperature()){
    return;
  }
  return this._temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemperature()){
    return;
  };
  return this._temperature -= 1;
};

// RESET
Thermostat.prototype.resetTemperature = function() {
  this._temperature = this.DEFAULT_TEMPERATURE;
};


// ENERGY USAGE
Thermostat.prototype.energyUsage = function() {
  if (this.getCurrentTemperature() < this.MEDIUM_ENERGY_USAGE_LIMIT) {
    return 'low-usage';
  }
  if (this.getCurrentTemperature() >= this.MEDIUM_ENERGY_USAGE_LIMIT && this.getCurrentTemperature() <= this.MAX_LIMIT_PSM_ON) {
    return 'medium-usage';
  }
  return 'high-usage';
}