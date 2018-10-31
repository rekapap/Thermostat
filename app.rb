require 'sinatra'
require_relative './lib/thermostat_settings'
require_relative './database_connection_setup'
require 'json'

class ThermostatController < Sinatra::Base
  enable :sessions, :method_override

  get '/settings' do
    @current_temperature = ThermostatSettings.latest.current_temp
    @city = ThermostatSettings.latest.city
  end

  post '/settings' do
    ThermostatSettings.create(params[:current_tempeture], params[:city])
  end

  run! if app_file == $PROGRAM_NAME
end
