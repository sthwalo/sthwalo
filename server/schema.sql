CREATE TABLE IF NOT EXISTS contact_submissions (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  company     VARCHAR(255)  DEFAULT NULL,
  service     VARCHAR(255)  DEFAULT NULL,
  message     TEXT          NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------
-- Moves the blog out of src/data/blogPosts.ts, where publishing a post meant
-- editing TypeScript and running a deploy, and behind an admin UI.
--
-- One table, two doors. The public read is unauthenticated but pinned to
-- status = 'published'; the admin path needs a session cookie and sees
-- everything. A draft is invisible because the query says so, not because the
-- UI hides it.

CREATE TABLE IF NOT EXISTS posts (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug           VARCHAR(160)  NOT NULL UNIQUE,
  title          VARCHAR(255)  NOT NULL,
  excerpt        TEXT          NOT NULL,
  category       VARCHAR(80)   NOT NULL,
  audience       VARCHAR(80)   NOT NULL,
  author         VARCHAR(120)  NOT NULL,
  featured_image VARCHAR(255)  DEFAULT NULL,
  read_time      VARCHAR(32)   DEFAULT NULL,
  source_label   VARCHAR(160)  DEFAULT NULL,
  source_href    VARCHAR(255)  DEFAULT NULL,
  -- Read whole, written whole, never queried into. A post_blocks table would
  -- add a join and an ordering column to answer a question nobody asks.
  blocks         JSON          NOT NULL,
  status         ENUM('draft','published') NOT NULL DEFAULT 'draft',
  published_at   DATETIME      DEFAULT NULL,
  reviewed_at    DATE          DEFAULT NULL,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- The shape of every public read: published rows, newest first.
  INDEX idx_posts_status_published (status, published_at DESC)
);

CREATE TABLE IF NOT EXISTS admin_users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  -- bcrypt. There is deliberately no column a plaintext password could live in.
  password_hash VARCHAR(255) NOT NULL,
  last_login_at DATETIME     DEFAULT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Editing prose in a browser with no undo is how a good post is lost to a stray
-- paste. A row per save is cheap and turns that from a catastrophe into a lookup.
CREATE TABLE IF NOT EXISTS post_revisions (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id    INT UNSIGNED NOT NULL,
  title      VARCHAR(255) NOT NULL,
  blocks     JSON         NOT NULL,
  saved_by   INT UNSIGNED DEFAULT NULL,
  saved_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_revision_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  -- The revision outlives the account that wrote it; losing an author must not
  -- lose the history.
  CONSTRAINT fk_revision_author FOREIGN KEY (saved_by) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_revisions_post (post_id, saved_at DESC)
);
