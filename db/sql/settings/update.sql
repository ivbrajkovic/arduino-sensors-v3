UPDATE settings
SET 
  led = ?,
  fan = ?,
  updateInterval = ?,
  co2 = ?,
  humidity = ?,
  temperature = ?
WHERE arduino = ?;