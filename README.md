## Set-Up

- Clone repo.
- Create `.env` file into the root location of this app.
- Populate the `.env` as follows.

```bash
NODE_ENV=<environment>

PGUSER_PR=<pg user>
PGPASSWORD_PR=<db password>
PGHOST_PR=<db host>
PGDATABASE_PR=<db-name>
PGPORT_PR=<db-port>
```

## Operation

- Run `npm install` to install all app dependencies.
- Run `db-migrate up` to run database migrations.
- Run `db-migrate reset` to reset the database.
 
 --- more update to come ---