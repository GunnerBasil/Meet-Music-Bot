# Meet Music Bot

![Logo](src/img/logo-smol.png)

This is a wip bot for Google Meet. Eventually, it *should* be able to actually have the functionality to play songs and things of that nature, but as of writing, the only functionality that has been added is joining the Meet.

## How to use

Grab a copy of the files, and make a new file called `creds.json`. Add some text to specify the credentials that should be used to log in to the account. It should look something like this:

```json
{
    "email": "email@email.email",
    "password": "PasswordGoesHere"
}
```

Once you have that file, you can run `npm start`  or `node index.js` to start the bot. In your meet link, get the stuff after the url, like `https://meet.google.com/zof-bmwf-esk` would mean that the "id" that the bot should join would be `zof-bmwf-esk`.

## Other things to note

### The account doesn't join :(

If the account has 2FA or the meet has a admit only thing, then the bot will fail. It won't display that it failed or anything, since this is just a beta for now and won't have checks for that until I actually get around to9 implemeting them

### Your code sucks, can I improve it?

Go ahead and contribute something, then make a pull request. If it'll help the state of the code, I'll go ahead and merge it.

### It opens a Chrome window.

Chromium. Also yes, I have it set in the index.js to open a puppeteer instance with the gui. If you want to make it headless (not open the window), change the value to not use a gui. in index.js, find this line of code, or where it intialises the browser constant, and change headless to `true`

```js
const browser = await puppeteer.launch({
    headless: false,
    args: ['--use-fake-ui-for-media-stream']
});
```