-- db/schema.sql
DROP DATABASE IF EXISTS bookmarks_dev;
CREATE DATABASE bookmarks_dev;

\c bookmarks_dev;

CREATE TABLE bookmarks (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT,
 category TEXT,
 description TEXT,
 is_favorite BOOLEAN
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,
 content TEXT,
 rating NUMERIC,
 CHECK (rating >= 0 AND rating <= 5),
 bookmark_id INTEGER REFERENCES bookmarks (id)
 ON DELETE CASCADE
);

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username TEXT UNIQUE,
 admin BOOLEAN DEFAULT false,
 verified BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS users_bookmarks;

CREATE TABLE users_bookmarks (
 id SERIAL PRIMARY KEY,
 created TIMESTAMP DEFAULT NOW(),
 bookmark_id INTEGER,
 user_id INTEGER,
 UNIQUE (bookmark_id, user_id)
);