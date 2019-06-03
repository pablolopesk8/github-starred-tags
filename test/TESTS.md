# Tests descriptions

## Endpoints tests

### GET /:user/repos/starred?tags=tag1,tag2 <https://api.github.com/users/{{githubUser}}/starred>

1. User passed as parameter (intern: 400 - user is required)
2. User doesn't exists: (github : 404 - message: Not found) (intern: 404 - user doesn't exists in github)
3. User exists and doesn't has starred (nelobrizola): (github: 200 - empty array) (intern: 204)
4. User exists and has starred: (github: 200 - array of repos) (inter: 200 - array of repos)
5. If passed tags, doesn't has respositories filtered by tags: (intern: 204)
6. If passed tags, has starred: (inter: 200 - array of repos)

### POST /:user/:repoId/tags - Request: [ "api", "blueprint" ]

1. Passed none tags: 400 - at least one tag is required
2. User doesn't exists in database: 404 - User doesn't exists in database
3. Repository doesn't exists in database: 404 - Repository doesn't exists in database
4. Inserted all tags correctly: 200 - array of tags
5. Error on inserting one of tags: 500 - error inserting tags

### DELETE /:user/:repoId/tags - Request: [ "api", "blueprint" ]

1. Passed none tags: 400 - at least one tag is required
2. User doesn't exists in database: 404 - User doesn't exists in database
3. Repository doesn't exists in database: 404 - Repository doesn't exists in database
4. Deleted all tags correctly: 200 - array of tags
5. Error on inserting one of tags: 500 - error inserting tags

## Service tests

### DB Service

1. Verify if connected correctly

> It doesn't possible to test if not connected, because it's doesn't possible to change the values of constants that configure the connection

### Users model

1. Verify if githubUser is required
2. Verify, if exists repositories -> starred, if is required githubId, name and url
3. Verify if is possible to create only with githubUser
4. Verify if is possible to create with githubUser and other properties
5. Verify if is possible to create with repositories, but without starred
6. Verify if is possible to create with repositories -> starred, with the required attributes
