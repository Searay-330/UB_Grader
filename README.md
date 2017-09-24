# UB_Grader

CSE 442 project.


ubuntu linux install instructions

first install nodejs
```
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
```
make sure to follow nodejs version 8 install instructions
make sure you have npm version 5.3.0
then install mongodb
```
https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu
```

thats it for prereqs 

now clone the repo
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
inside of keys js you need to put your google oauth keys
example:
```
module.exports = {
googleClientID:'randomstring.apps.googleusercontent.com',
googleClientSecret: 'secret key',
cookieKey: 'randomstring'
}
```
```
npm install 
sudo service mongod start
npm start
```

and that should have you up and running on localhost:8000


