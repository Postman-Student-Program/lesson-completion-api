CREATE USER lesson_comp_user;
ALTER USER lesson_comp_user SUPERUSER;

-- Create prod DB
DROP DATABASE IF EXISTS lesson_comp_prod;
CREATE DATABASE lesson_comp_prod;
\c lesson_comp_prod;
-- Need this extension to use uuid_generate_v4() function in db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER DATABASE lesson_comp_prod OWNER TO lesson_comp_user;
GRANT ALL PRIVILEGES ON DATABASE lesson_comp_prod TO lesson_comp_user;
