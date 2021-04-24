# Setup

npm i bcrypt express nodemon dotenv jsonwebtoken cookie-parser

grab jwt secret from https://passwordsgenerator.net/

# JWT

JWT is one of the safest ways to authenticate HTTP requests. In a JWT flow, the token itself contains the data. The server decrypts the token to authenticate the user only. No data stored on the server.

JWT tokens are included in the Authorization HTTP header as part of the bearer authentication scheme. Header for jwt describes
algorithm used to encrypt payload from user.

JWT tokens are digitally signed by the issuer (server doing the authentication), they can be validated without talking to the server again

https://stackoverflow.com/questions/59703739/bcrypt-authentication-and-jwt-authorization

# Why HTTP cookies

send the json web token in a http-only cookie
regular cookies and localstorage can be read by
javascript which hackers can access via cross-side scripting
(utilizing javascript to gain access to private user information)

# Registration

We store hash in db, but chose to encrypt user object id
in mongo (\_id) with jwt to authenticate users, cookie used to store token so that user can continue to make valid request to server

# Why Hashing

Hashing with bcrypt is useful to track login attempts, and login user
. Dont encrypt because if database goes down, password could be
decrypted.
Hashing for storing passwords (bcrypt)
Encrypt for session storage (jwt, cookies)

# For the Future

Currently for security i only have route guards through the auth middleware.
In the future i would love to include user permission roles like admin, chefs, etc.
