use nodeUsers
CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
    SELECT name, email
    from nodeUsers
    where id=Id

END

exec getUsers