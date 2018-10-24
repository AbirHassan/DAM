-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `CanvasItems`;


DROP TABLE `Canvas`;


DROP TABLE `Items`;


DROP TABLE `User`;



-- ************************************** `Items`

CREATE TABLE `Items`
(
 `ItemName` VARCHAR(45) NOT NULL ,
 `Material` VARCHAR(45) NOT NULL ,
 `Width`    INT NOT NULL ,
 `Length`   INT NOT NULL ,

PRIMARY KEY (`ItemName`, `Material`, `Width`, `Length`)
);






-- ************************************** `User`

CREATE TABLE `User`
(
 `Username`          VARCHAR(45) NOT NULL ,
 `UUID`              INT NOT NULL ,
 `PasswordHash`      VARCHAR(45) NOT NULL ,
 `PasswordSalt`      VARCHAR(45) NOT NULL ,
 `Email`             VARCHAR(45) NOT NULL ,
 `CreationTimestamp` TIMESTAMP NOT NULL ,
 `Token`             VARCHAR(45) NOT NULL ,

PRIMARY KEY (`Username`, `UUID`)
);






-- ************************************** `Canvas`

CREATE TABLE `Canvas`
(
 `CanvasName` VARCHAR(45) NOT NULL ,
 `UCID`       INT NOT NULL ,
 `Username`   VARCHAR(45) NOT NULL ,
 `UUID`       INT NOT NULL ,
 `Width`      INT NOT NULL ,
 `Length`     INT NOT NULL ,

PRIMARY KEY (`CanvasName`, `UCID`, `Username`, `UUID`),
KEY `fkIdx_10` (`Username`, `UUID`),
CONSTRAINT `FK_10` FOREIGN KEY `fkIdx_10` (`Username`, `UUID`) REFERENCES `User` (`Username`, `UUID`)
);






-- ************************************** `CanvasItems`

CREATE TABLE `CanvasItems`
(
 `CanvasName` VARCHAR(45) NOT NULL ,
 `Username`   VARCHAR(45) NOT NULL ,
 `UUID`       INT NOT NULL ,
 `X_pos`      INT NOT NULL ,
 `Y_pos`      INT NOT NULL ,
 `UCID`       INT NOT NULL ,
 `ItemName`   VARCHAR(45) NOT NULL ,
 `Material`   VARCHAR(45) NOT NULL ,
 `Width`      INT NOT NULL ,
 `Length`     INT NOT NULL ,

PRIMARY KEY (`CanvasName`, `Username`, `UUID`, `X_pos`, `Y_pos`, `UCID`),
KEY `fkIdx_28` (`CanvasName`, `UCID`, `Username`, `UUID`),
CONSTRAINT `FK_28` FOREIGN KEY `fkIdx_28` (`CanvasName`, `UCID`, `Username`, `UUID`) REFERENCES `Canvas` (`CanvasName`, `UCID`, `Username`, `UUID`),
KEY `fkIdx_38` (`ItemName`, `Material`, `Width`, `Length`),
CONSTRAINT `FK_38` FOREIGN KEY `fkIdx_38` (`ItemName`, `Material`, `Width`, `Length`) REFERENCES `Items` (`ItemName`, `Material`, `Width`, `Length`)
);