DELIMITER //

CREATE PROCEDURE services.add_shop(
  IN name VARCHAR(255),
  IN description TEXT
)
  BEGIN

    INSERT INTO shops (name, description) VALUES(name, description);

  END //

DELIMITER ;
