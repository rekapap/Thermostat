class ThermostatSettings
  attr_reader :id, :current_temp, :city, :time
  def initialize(id:, current_temp:, city:, time:)
    @id = id
    @current_temp = current_temp
    @city = city
    @time = time
  end

  def self.create(current_temp, city)
    time = 'now'
    result = DatabaseConnection.query('INSERT INTO settings (current_temp, city, time)'\
    " VALUES('#{current_temp}', '#{city}', '#{time}') "\
    'RETURNING id, current_temp, city, time;').first
    ThermostatSettings.new(
      id: result['id'],
      current_temp: result['current_temp'],
      city: result['city'],
      time:  result['time']
    )
  end

  def self.latest
    result = DatabaseConnection.query('SELECT * FROM settings;').first
    ThermostatSettings.new(
      id: result['id'],
      current_temp: result['current_temp'],
      city: result['city'],
      time:  result['time']
    )
  end
end
