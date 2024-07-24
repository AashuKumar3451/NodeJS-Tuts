const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require("./models/person");

// Configuring Passport as a middleware function
passport.use(new localStrategy(async (username, password, done)=>{
    try {
      // console.log("Provided credentials: ", username, password);
      const user = await person.findOne({username: username});
      if(!user){
          done(null,false,"Incorrect username");
      }
      let isPassMatch = await user.comparePass(password);
      if(isPassMatch){
        done(null,user);
      }
      else{
        done(null,false,"Incorrect Password");
      }
    } catch (error) {
        return done(error);
    }
  }));

module.exports = passport;