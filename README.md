Udacity Project #1: Image Processing API

Dependencies used:
1. Express: To create endpoints.
2. Sharp: to deal with image resizing.
3. Joi: to validate inputs.
4. Jasmine, and its dependencies used for unit testing.

This application is capable of resizing images from images/original folder, and cache It to images/cached.

Application scripts:
"npm build": will build the application to .js format.
"npm test": will test the application using jasmine, than will proceed to build the applicatopn.
"npm lint", "npm lint-fix": used for linting .ts code.
"npm prettier": used to apply prettier to .ts code.

Endpoints:

[GET] http://localhost:3000/image?height=200&width=200&name=imageNameWithoutExtension

    "name": Image Name (String),
    "height": Image Height (Int),
    "width": Image Width (Int)

Functions:
joi: used to validate values entered thrpugh browser

It will return one of the following conditions:
1. New found image: will resize It and display It along with some information.
2. previously resized image: will display It through the cached images.
3. will display error If process not went through.

Modifications made:
1. Working endpoint has been provided into README.md file.
2. Application is now serving resized image every time, If not found It will do resize and provide.
3. Errors are handled through Joi, It will display an error and send a status code of 400 or 404.
5. Tests for the endpoint has been added.
6. Test for image processing function has been added.