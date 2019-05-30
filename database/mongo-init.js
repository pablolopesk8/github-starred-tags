/** Init file to create user, database and schema**/
conn = new Mongo();
db = conn.getDB("apigithub");

db.createUser(
    {
        user: "admin_apigithub",
        pwd: "Xyz@789",
        roles: [{ role: "readWrite", db: "apigithub" }]
    }
);

/** create users collection with a schema validator **/
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["githubUser"],
            additionalProperties: true,
            properties: {
                githubUser: {
                    bsonType: "string",
                    description: "string required"
                },
                repositories: {
                    bsonType: "object",
                    additionalProperties: true,
                    properties: {
                        starred: {
                            bsonType: "array",
                            minItems: 0,
                            items: {
                                bsonType: "object",
                                additionalProperties: false,
                                required: ["githubId", "name", "url"],
                                properties: {
                                    githubId: {
                                        bsonType: ["number", "string"],
                                        description: "string required"
                                    },
                                    name: {
                                        bsonType: "string",
                                        description: "string required"
                                    },
                                    url: {
                                        bsonType: "string",
                                        description: "string required"
                                    },
                                    fullName: {
                                        bsonType: ["string", "null"],
                                        description: "string not required"
                                    },
                                    description: {
                                        bsonType: ["string", "null"],
                                        description: "string not required"
                                    },
                                    language: {
                                        bsonType: ["string", "null"],
                                        description: "string not required"
                                    },
                                    tags: {
                                        bsonType: "array",
                                        description: "array of tags for the repository. not required",
                                        minItems: 0,
                                        items: {
                                            bsonType: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
