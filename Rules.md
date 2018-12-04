**Final Project: Classic Arcade Game**
Download the Final Project Zip file from Udacity.

- The starter project has a single `HTML` file, coupled with `CSS`, `JS` and `Images directory`. 
- The files we most interested in updating are the `style.css`, `index.html`, and `app.js`, depending on what changes we are would like to make.
- You may also consider update `engine.js` if you are interested in changing your assets.
- Be careful though, making a mistake in `engine.js` can cause your entire project to stop working.

**Project Requirements**

##Player Movements:
- The Player can not move off screen.
- The Player should only be able to move 1 '_block_' at a time.

##Enemy Movements:
- The enemy should reset to their starting point upon disappearing off the canvas.
- Enemies should move at an appropriate speed, not too fast and not too slow.

##Collision:
- Enemy-player collisions happen logically (not too early or too late).
- Enemy-player collision resets the game.
- Collisions occur when an `enemy sprite` and `player sprite` share the same `x` and `y` coordinates.

##Levels:
- You should create levels. 
- Players `start at level 1`, and each time your player successfully `crosses` to the `water`, the - `level increases`.
- With `each level increase`, the `speed` at which the enemies move should `increase`. 
- The `current level` should - always be `displayed` at the top of the page.
- If a player `collides` with an `enemy`, they `revert` back to `level 1`.
- You should `track`, `maintain` and `display` the `highest level obtained` in a single session.

##Comments:
- Comments are present and effectively explain longer code procedures.
- As a rule of thumb: describe what all custom functions and object methods do.

##Submission:
- The solution should be submitted as `.zip` file that includes the `HTML`, `JS` and `CSS` files.
- The `.zip` file should contain your `first` and `last name`.
- Your `.zip` file should be uploaded, `no later than Friday`, `November 23rd`, 2018 @ `11:30 AM`
- Projects submitted `late` will be immediately `penalized 10%`, plus an additional 10% for each additional 24hour period.

##TIPS:
- HTML5 Canvas Position
- The position of the elements (both Enemies and Players) are determined by `X` and `Y` coordinates. 
- Play around with these coordinates to determine where your Enemies should start.

##Determining the Enemy and Player positions:
- Looking at the Enemy.prototype.render function, what can we determine about positioning our each of our Enemy Objects? 
- You can see it will use our defined `x` and `y` coordinates, and the image to properly position our player and enemies.

##Moving the Characters:
- Games are built with frames. 
- Many small movements of a over the course of many frames makes it seem like objects are moving. 
- We need to determine the how big (or small) this movement must be, from the left to right of the canvas. 
- Think of this as the speed of your enemy and player. 
- Every few hundred milliseconds the Udacity engine.js file will call the update method that we write, so determining movement and collisions should happen inside this method.