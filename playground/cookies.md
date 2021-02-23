
### FROM A udemy student comment

This write-up assumes you've completed the sections associated with the task-manager app at least up to section #12 (Auth)

We'll be using cookies to store the JWT token on the frontend.

1. You'll need to install one module:

`npm i cookie-parser`

2. Create two folders, one called public outside the src directory and another called views inside the src directory.

3. Add the following code to your index.js file:

```js
const cookieParser = require('cookie-parser')
 
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
...
The express.urlencoded() middleware parses data sent via forms from the frontend for us. Similarly, the cookie-parser middleware parses cookies sent with the forms.
```

4. In the public folder add a file called index.html with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <a href="register.html">Register</a>
    <form method="POST" action="/users/login">
      <label for="email">Email</label>
      <input type="text" name="email" id="email" />
      <label for="password">Password</label>
      <input type="text" name="password" id="password" />
      <button>Login</button>
    </form>
  </body>
</html>
```

And also create a register.html file in the public folder with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <a href="/">Login</a>
    <form method="POST" action="/users">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" />
      <label for="email">Email</label>
      <input type="text" name="email" id="email" />
      <label for="password">Password</label>
      <input type="text" name="password" id="password" />
      <button>Register</button>
    </form>
  </body>
</html>
```

5. In the views folder, create a file called private.html with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <p>Congrats, you've successfully logged in or registered!</p>
  </body>
</html>
```



6. In the `router.post('/users', ...)` route, add the following code:

```js
const path = require('path')
 
router.post('/users', async (req, res) => {
    const user = new User(req.body)
 
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'))
    } catch (e) {
        res.status(400).send(e)
    }
})
```

7. In the router.post('/users/login', ...) route, add the following code:

```js
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'))
    } catch (e) {
        res.status(400).send()
    }
})
```

8. Add finally, change the line in the auth.js middleware from:

```js
const token = req.header('Authorization').replace('Bearer ', '')
To:

const token = req.cookies['auth_token']
```

9. Start up the server with node src/index.js and then go to localhost:3000 . Click on "Register" and create a new user. If everything goes well, you should see the contents of the "private.html" page. To confirm the token was created, open Chrome's DevTools and click on the "Application" tab. On the left-hand side, click on the "Cookies" drop-down and you should see the "auth_token" cookie listed under "localhost:3000".

Afterward, try logging in with the user you created.