# UB_Grader


Ubuntu linux install instructions

1-First install nodejs
```
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
```
Make sure to follow nodejs version 8 install instructions
Make sure you have npm version 5.3.0

2-Install mongodb
```
https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu
```

Those are the two prerequisites.

Now clone the repo.
```
git clone https://github.com/Theknickerbocker/UB_Grader.git
```
```
cd UB_Grader
git checkout dev
```
```

npm install
mkdir server/config
touch server/config/keys.js
```
Make sure you you have your own Google OAuth 2.0 API keys. Inside of keys.js you need to put your googleClientID and googleClientSecret  keys. The cookieKey is completely arbritrary and can be any random string. 

Example:
```
module.exports = {
googleClientID:'randomstring.apps.googleusercontent.com',
googleClientSecret: 'secret key',
cookieKey: 'randomstring'
}
```
Also be sure to create a OAuth 2.0 Client ID and in which http://localhost:8000 is added to your authorized Javascript origins and that http://localhost:8000/api/auth/google/callback is added to your authorize redirect URIs.

Lastly, you'll need to have Tango set up locally and the directions to do so can be found at https://github.com/daviddob/Tango/wiki

Then you can run the following commands in your terminal:

```
npm install 
sudo service mongod start
npm start
```

That should have you up and running on localhost:8000.

Please use the following login credentials to see the view of a sample student registered for a course:

Email: studentone.442@gmail.com
Password: cse442fall2017

Note: You can also directly visit http://challenger.adhishchugh.com/ to view a live version of the prototype and login with the above credentials, if you wish to avoid all the setup.


