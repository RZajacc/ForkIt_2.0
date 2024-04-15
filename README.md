# Fork It

### Description

Project is using [Spoonacular](https://spoonacular.com/) API to browse recipies from different cuisines, and dish types.

As an unregistered user you can see recipes cards, and make queries to a database to display more, hovewer if you want to see recipes details you need to register or login to your account.

After successfull registration or loggin in to your acoount you can also see a user dashboard with some basic account information and favourite recipes list. To add or remove a recipe from favourites you need to open relevant recipes details page and click a button add/remove from favourites.

User can login in several ways:

- Login/Password
- Google
- Github
- Facebook

Keep in mind that all listed above will create a seperate account (even if email used for registration is the same).

###Project requirements
Back-end part of the project is created with the use of [Firebase](https://firebase.google.com/). Therefore to make the project running its necessary to create account there and setting up authentication providers same as listed here. Also some configuration is required. You should use your google credentials as an environmental variable. Together with firebase, you'll need to create an account on [Spoonacular](https://spoonacular.com/) to get your API key. In the end your .env file should look more or less like this:

```
 VITE_APIKEY = ...your credentials...
 VITE_AUTHDOMAIN = ...your credentials...
 VITE_PROJECTID = ...your credentials...
 VITE_STORAGEBUCKET = ...your credentials...
 VITE_MESSAGINGSENDERID = ...your credentials...
 VITE_APPID = ...your credentials...

 VITE_SPOONACULARKEY = ...your credentials...
```

### Watch it live

Project is deployed on Nettlify. Since it's my first attempt to do so, not everything is working like its supposed to be but I'm working on improvements.

List of things that requires attention after deployment:

- [ ] User authentication with Google/Github/Facebook, popup doesn't open
- [ ] After refreshing the page, or moving to a wrong path, instead of my error page, netlify error is displayed...:unamused:

If you want to take a look visit take a look [here](https://forkitorleaveit.netlify.app/)

> [!NOTE]
> Main goal of the project is learning to code, so any tips are welcome!
