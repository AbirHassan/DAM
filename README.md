# DAM
Senior Design Project: Design-A-Map. Software to be used for helping with Urban Planning and creating maps to be used in games and other creative mediums.

## notes
dictionary of types:
```javascript
{ roads: [road1.png, road2.png],
	background_tiles: [background_tiles1.png, background_tiles2.png],
	buildings: [...]
}
```

to "save" a canvas:
* click a save button
* save button will:
	- generate a serialized form of the canvas
	- also get the current name of the canvas
	- then will make a db query by username & current name of the canvas
	- replace the entry with the current serialized form

to "create" a canvas:
* click create button

to "reupload" a canvas:
* click on user profile which will have thumbnails of all the canvas by the user
* click on a canvas,
	- will redirect to the homepage but pass in a parameter (edit=true mb)
	- in the req object, will also pass in the serialized form
* homepage will 


## to start
- if you're running the application for the first time, run `npm install` to download all the necessary node modules
- to start the project, run `npm start`
- the project should be running on `localhost:3000`

