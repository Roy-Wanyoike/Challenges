CREATE OR ALTER PROCEDURE InsertOrUpdate(@id VARCHAR(50),
    @name VARCHAR(100) NULL,
    @email VARCHAR(50) NULL,
    @destination VARCHAR(100) NULL,
    @Traveldate DATE
)
AS
BEGIN




    IF EXISTS(SELECT *
    FROM FlightsBooking
    WHERE Id = @id)

BEGIN
        UPDATE FlightsBooking  SET Name=@name, Email=@email, Destination = @destination, TravelDate = @date
WHERE Id = @id
    END

ELSE
BEGIN

        INSERT INTO FlightsBooking
            (Id, Name, Email, Destination, TravelDate)
        VALUES
            (@id, @name, @email, @destination, @date)

    END
END

EXEC InsertOrUpdate @id='vfvfsfsdres',
 @name = 'Roy Wanyoike',
 @destination = 'Nairobi',
 @date = '10-02-2023'