➡️ Task 1: Set up DynamoDB Tables
We need one table called ConnectionsTable:

Partition Key: connectionId (string)

Additional attributes: userId, username, profileImage

Simple guide:

Open AWS Console → DynamoDB → Tables → Create Table

Table name: ConnectionsTable

Partition key: connectionId (String)

No sort key

Default settings (on-demand capacity)

✅ Tell me when you're done (or if you want I can give you exact screenshots to click).


ConnectionsTable
├── connectionId (Partition key) [String]
├── userId (String) [Optional Attribute]
├── username (String) [Optional Attribute]
├── profileImage (String) [Optional Attribute]
