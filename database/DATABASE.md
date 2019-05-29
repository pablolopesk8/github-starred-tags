# Database

This file describe the configurations used in Mongo database creation.

## Docker

Docker is configured in docker-compose because isn't required special configurations.  
The service is started with auth configurations, to improve security.  
The exposed port is 3002.  
Is set the /data/db inside the container to make backups "automatically", putting the data inside the host machine.  
Is set a script to run in the first initialization of docker. This script is responsible to create the database and collection for the system. The script is in [mongo-init](mongo-init.js).

## Schema

The schema set the configuration of collection **users**. There are only one required property for user and enable additional properties. Inside the user, there is the **repositories** and inside repositories there is **starred**. Other properties are possible for **repositories**, but for **starred** are required githubId, name and url.  
The complete definitions there are in [mongo-init](mongo-init.js).

## Dump and Restore

If it's necessary to make manual dump for database, you can run

```bash
mongodump -p 3002 -d apigithub -c users -o <path_to_output_dump>
```

If it's necessary to make manual restore for database, you can run
```bash
mongorestore <path_where_database_dumped>
```

## Reference

The following docs was used as reference:  
[Validation Schema](https://www.mongodb.com/blog/post/mongodb-36-json-schema-validation-expressive-query-syntax)  
[Scripts for Database](https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/)  
[Mongo in Docker](https://hub.docker.com/_/mongo)
