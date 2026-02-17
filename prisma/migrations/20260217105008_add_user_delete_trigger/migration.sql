-- This is an empty migration.
CREATE OR REPLACE FUNCTION delete_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO deleted_users(email, role)
  VALUES (OLD.email, OLD.role)
  ON CONFLICT (email) DO NOTHING;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER store_deleted_user
AFTER DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION delete_user();
