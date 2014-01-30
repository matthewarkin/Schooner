#a SailsJs, User Example App
This app integrates passport-local, sailsjs v0.10, mongodb, and email activations


##api/controllers/AuthController.js

###login
handles user logins

###logout
handles user logouts

##api/controllers/UserController.js

##create
creates a user, expects firstName, lastName, email, password, username fields to be passed to it via post
sends email to the `email` person with an activation link

##activate
activates a user given its id and activationToken

##api/models/User.js
the user model, things to note here is toJSON, and beforeCreate

##api/policies/authenticated.js
passport policy for authentication

##api/services/crypto.js
all the cryptographic helpers and such needed for auth/user creation

##api/services/nodemailer.js
email wrapper for nodemailer

##api/services/passport.js
passport definitions for authentication

##config/passport.js
inject passport into express middleware

##config/nodemailer.js
nodemailer configurations, auth information for your email service

##config/policies.js
blocks off specific routes/controllers/actions

##config/routes.js
defines routes for login logout create activate

##config/user.js
useractivation true/false

##views/email/email.ejs
the html email template thats sent to users for activation