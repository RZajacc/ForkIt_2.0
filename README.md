# Fork It_2.0

### Version information:
Previous version of the project that you might find in my repository differs significantly from this one. Starting with styling being made with Bootstrap, and several functionailities (where some of them were not fully implemented). 
I kept it just as reminder of the work I did before, to appreciate the the progress, but nevertheles this version of is considered as only fully funtional one

### Description

Project is using [Spoonacular](https://spoonacular.com/) API to browse recipies from different cuisines, and dish types.

As an unregistered user you can see recipes cards, and make queries to a database to display more, hovewer if you want to see recipes details you need to register or login to your account.

After successfull registration or loggin in to your acoount you can also see a user dashboard with some basic account information and favourite recipes list. To add or remove a recipe from favourites you need to open relevant recipes details page and click a button add/remove from favourites. Each user can also change user-name, upload a new image, change password or delete account entirely. Deleting accound removes also user favourites, and comments. 

User can register or login with email and password. There is also an option to reset password if you have an account and forgot it. Upon register each user needs to validate email adress too. 

### Project requirements

Back-end part of the project is created with the use of [Firebase](https://firebase.google.com/). Therefore to make the project running its necessary to create account there and set up a new project with email and password authentication and also set up firestore and storage. Together with firebase, you'll need to create an account on [Spoonacular](https://spoonacular.com/) to get your API key. Lastly contact form works with EmailJS, so also there you wound need an account, and a email template set. In the end your .env file should look more or less like this:
```
 # FIREBASE
 VITE_APIKEY = ...your credentials...
 VITE_AUTHDOMAIN = ...your credentials...
 VITE_PROJECTID = ...your credentials...
 VITE_STORAGEBUCKET = ...your credentials...
 VITE_MESSAGINGSENDERID = ...your credentials...
 VITE_APPID = ...your credentials...

# SPOONACULAR
 VITE_SPOONACULARKEY = ...your credentials...

# EMAIL JS
VITE_SERVICE_ID=...your credentials...
VITE_TEMPLATE_ID=...your credentials...
VITE_PUBLIC_KEY=...your credentials...
```

If you want to take a look on the app without going through all this tedious configuration process visit take a look [here](https://forkitorleaveit.netlify.app/)😊

> [!NOTE]
> Main goal of the project is learning to code, so any tips are welcome!
