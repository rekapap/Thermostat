require './lib/database_connection'

if ENV['ENVIRONMENT'] == 'test'
  DatabaseConnection.setup('thermostat_test')
else
  DatabaseConnection.setup('thermostat')
end
