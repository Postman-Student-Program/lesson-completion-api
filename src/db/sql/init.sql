CREATE USER lesson_comp_dev;
ALTER USER lesson_comp_dev SUPERUSER;

-- Create test DB
DROP DATABASE IF EXISTS lesson_comp_api_test;
CREATE DATABASE lesson_comp_api_test;
\c lesson_comp_api_test;
-- Need this extension to use uuid_generate_v4() function in db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER DATABASE lesson_comp_api_test OWNER TO lesson_comp_dev;
GRANT ALL PRIVILEGES ON DATABASE lesson_comp_api_test TO lesson_comp_dev;

-- Create dev DB
DROP DATABASE IF EXISTS lesson_comp_api_dev;
CREATE DATABASE lesson_comp_api_dev;
\c lesson_comp_api_dev;
-- Need this extension to use uuid_generate_v4() function in db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER DATABASE lesson_comp_api_dev OWNER TO lesson_comp_dev;
GRANT ALL PRIVILEGES ON DATABASE lesson_comp_api_dev TO lesson_comp_dev;