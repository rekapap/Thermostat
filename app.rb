require 'json'
require 'sinatra'
require_relative './lib/thermostat_settings'
require_relative './database_connection_setup'
require 'json'

class ThermostatController < Sinatra::Base
  enable :sessions, :method_override

  get '/' do
    erb :index
  end

  get '/settings' do
    current_temperature = ThermostatSettings.latest.current_temp
    city = ThermostatSettings.latest.city
    session["data"] = { "current_temperature": current_temperature.to_s,
              "city": city.to_s }.to_json
  end

  post '/settings' do
    settings = JSON.parse(session["data"])
    p settings
    ThermostatSettings.create(settings["current_temperature"], settings["city"])
  end

  run! if app_file == $PROGRAM_NAME
end
