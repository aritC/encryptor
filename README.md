# Encryptor

Encrypt your messages and get a shareable link for the same

Hosted at : https://encryptor.aritchanda.com/
NOT LIVE CURRENTLY AS THE EC2 MACHINE IS UNREACHABLE

## IDEA

The main thought about building this project was to create a tool which can be used to share secrets between users.

- Once the sender visits https://encryptor.aritchanda.com/ they can put in secret message and select view count for the same and encrypt it with a password. View count of "-1" is reserved to be used for unlimited views.

- Once the sender encrypts the message they will be provided with a unique link and the password which they can they share directly with the other party.

- The receiver can then access the link and use the password which was shared to them by the sender to access the secret.

This way the secret sender has some control on the way the secret is handled by the receiver rather than just leaving it completely up to the receiver to access the secret in a secure manner.

## DESIGN

This project uses Angular for the frontend and NodeJs as the API server. NodeJs then connects to MySQL db to store and update data. Apart from this a cron job is setup daily which uses the purge.sh which deletes all the expired records weekly to keep the space usage in check.

## TODO LISTS

- [x] Install SSL certs.
- [ ] Move code to Prisma ORM.
- [ ] Ability for Sender to select Date Time for expiry as well.
- [ ] Setup CI/CD
- [ ] UI Improvements.
