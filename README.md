
# hello-world
Weekend wealth is an App. that gives students the ability to acquire abundant knowledge on conventional subjects offered in secondary schools as well as vocational skills. This is an initiative of community.andela.com/c/ag-25-team’s project.

(a) COVID-19 affected the closure of schools in 2020 while syllabuses designed by the government could not be covered accordingly and this caused the mass failure of students who sat in that year external Senior School Certificate Examinations (SSCE). How can we keep students busy every weekend and connect them to volunteer facilitators? Similarly, some countries are battling with insurgency and banditry, which usually force some schools in the affected areas to close down any time they feel their lives are being threatened. How could the affected students be aware of our proposed App. and then take an advantage of it to connect to volunteer facilitators every weekend?  

(b) Non-exposure of students to the timely vocational skills/trade subjects, has contributed to persistent unemployment among the students. Thus, online short video stimulations on vocational skills should be introduced to the students.   

 
## Set-Up

- Clone repo.
- Create `.env` file into the root location of this app.
- Populate the `.env` as follows.

```bash
NODE_ENV=<environment>
PORT=<port number>
JWT_SECRET=<your jwt secret>

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
 
 Check folder named **Doc** fo documentatios.
 
 --- more update to come ---
 
