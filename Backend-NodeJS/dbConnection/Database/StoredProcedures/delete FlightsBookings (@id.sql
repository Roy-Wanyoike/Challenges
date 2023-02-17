CREATE PROCEDURE  getFlightsBookings
    (@id VARCHAR(50))
AS
BEGIN
    SELECT *
    FROM FlightsBookings
    WHERE Id = @id

END
EXEC getFlightsBookings 'vfvfsfsdres'