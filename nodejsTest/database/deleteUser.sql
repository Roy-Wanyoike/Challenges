
use nodeUsers
create or alter PROCEDURE getAllUsers
(
    @id VARCHAR(50)

)
AS
BEGIN
SELECT * FROM userTable WHERE Id=@id
END

exec getAllUsers