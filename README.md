# LUMIA STREAM DUCK HUNT

[Play the game](http://duck.lumiastream.com)

This is a fork from the great Duck Hunt JS by MattSurabian to demonstrate how to use Lumia Stream's Games Glow SDK within a game

## Working With This Repo

-   You must have [nodejs](https://nodejs.org/) installed.
-   Clone the repo into a directory of your choice
-   `cd` into that directory and run `npm install`
-   Use `npm start` to start a local webserver which will make the site available at http://localhost:8080/. Cross origin errors prevent this project from being accessed in the browser with the `file://` protocol. This will also trigger automatic builds and reloads of the page when changes are detected in the `src` directory.
-   If you want to manually cut a build of the application code run `npm run build`

## Working With Audio and Visual Assets

This repo ships with committed dist files to make it easy for developers to get up and running. If you really want to get into some leet haxing and change the way
this game looks and sounds then you'll need to work with audio and image sprites. The following tasks make that possible:

-   To rebuild audio assets use `npm run audio` (there is a hard dependency on [ffmpeg](https://ffmpeg.org/download.html) to run this task)
-   To rebuild image assets use `npm run images` (there is a hard dependency on [texturepacker](https://www.codeandweb.com/texturepacker/download) to run this task)

## Bugs

Please report bugs as [issues](https://github.com/lumiastream/Lumia-DuckHunt/issues).

## Contributing

Pull requests are welcome! Please ensure code style and quality compliance with `npm run lint` and include any built files.
