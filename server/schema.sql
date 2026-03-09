CREATE TABLE IF NOT EXISTS contact_submissions (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  company     VARCHAR(255)  DEFAULT NULL,
  service     VARCHAR(255)  DEFAULT NULL,
  message     TEXT          NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
