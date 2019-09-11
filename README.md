# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!


---

# Changes I Made

## Fix a bug
I tracked down the bug to the fact that directions were ordered left to right, but `crash` was a direction "to the left"
of `left`. So turning left again from a crash state put the skier in a direction that didn't exist. The quickest
solution to this problem would be to just add an additional check when turning left to prevent turning left when
crashed. The more comprehensive solution that I implemented was to track the crashed state separately from direction.
This meant that the existing boundary checks when turning left and right were sufficient.

## Write unit tests
I wrote 2 unit tests to verify each of the boundary conditions (left and right) when changing direction. I wrote some
more tests for the skier jump and collision detection code as well. I'm more familiar with unit tests using
mocha/sinon/chai, so I'm not sure if there's a better way in jest to handle function mocking. But it seemed familiar
enough overall. Running tests with the `--watch` flag definitely helps. As I went through later and made changes to code
that I had tested, I knew right away when I had broken something, and I also knew right away when it was working again.

## Extend existing functionality
In addition to keeping track of crashed state, I added another flag to keep track of whether the skier was jumping or
not. I included the various images for the jump animation as an array constant, `SKIER_JUMP_ASSETS`. Animation timing is
controlled by another constant, `SKIER_JUMP_TIME`. The jump ramp asset was also added and included as a possible
obstacle, generated with equal chance as any other obstacle on the map. When the skier detects a collision, the asset
type of the obstacle is checked. If it's a jump ramp, the skier is put into a jumping state, and an animation counter
is started to progress through each animation step. After the last step is completed, the skier is no longer in a
jumping state. If a rock or jump collision is detected while in a jumping state, the collision is ignored. In addition,
while in a jumping state, the skier can not change directions, and the skier's speed is increased. The speed increase
was made after adding the rhino. Since the rhino has a top speed slightly higher than that of the skier, so the skier
will have to use jumps in order to stay ahead of the rhino after a while. I wrote some unit tests for the collision
detection function for the skier to ensure all cases were working.

## Build something new
I started by making a rhino class, extending from Entity, just like the Skier. I had intended to spawn the Rhino at the
beginning of the game, but hidden and not moving. So I added the functionality to Entity to be hidden (skip drawing). It
turned out to be easier and simpler to just spawn the rhino off screen and have him slowly increase his speed so he
would eventually catch up to the skier. The Rhino has 3 modes: chasing, eating, and celebrating. He starts in chase
mode, moving at his current speed directly toward the skier, toggling between the 2 running animation pictures. The main
game loop triggers the rhino to detect his own collision with the skier, just like the skier detects his own collisions
with any obstacles. Once the rhino collides with the skier, he enters eating mode, also triggering the skier to hide
and setting the skier's mode to eaten. A skier in an eaten state can't move, effectively ending the game. Once the rhino
plays through the eating animation, it enters celebrate mode, where it stands and shakes the ski poles in victory. While
building out the rhino, I made a number of other changes to keep the code sane. I pulled the boundary generation code
used for collision detection up to the entity level so it could be used by the skier, rhino, and obstacles alike. This
likely wouldn't work well in a game with tighter, more complex boundary detection. But for this game in its current
state, it works wonderfully, and makes the code that uses it much easier to understand. I also refactored the skier to
use a similar mode property to keep track of the mode that it's in. The skier is effectively a more complex state
machine than the rhino, but it still works. As more features are added to the game, this structure might become
insufficient. But for now, it works well enough. Somewhere along the line, after encountering an intermittent error
when reloading the page, 

## Documentation
In addition to this section of the readme, some other details can be found in the commit messages. As far as providing
a way to run the code, I considered setting up a full deployment pipeline. But considering the hours I've put into this
over the last 2 late nights, trying to keep up with work, scheduling interviews and other coding projects like this one
while still being present for my family, I'm just going to pass on that. Since the requirements above give the option to
just run the code locally, `npm install && npm run dev` and open http://localhost:8080/ in the browser will have to
suffice. If I were to spend a couple more hours, I'd probably create a project on Gitlab, create a bucket on AWS S3, set
up a build process using webpack, add a gitlab-ci.yml configuration file to the project, add the aws credentials to the
configuration, and hook up a trigger on a commit/merge to master that would execute unit tests, run the build process
and upload the artifacts to the S3 bucket. I'd then copy the link to the html file and paste it here. Here's the github
repo at least: https://github.com/toddmcneill/ceros-ski

## Bonus
As mentioned above, rather than take a few more hours over the next couple days to improve this, I'm just wrapping it
up without any of the bonus features. I'll list how I'd approach implementing some of them though. Think of these as
design document rough drafts.

#### Provide a way to reset the game once it's over
In `Game.js > handleKeyDown`, I'd check if the skier had been eaten.
I'd add a case to the switch for another key code that would reset the game. Possibly display text using `ctx.fillText`
to tell the user how to restart the game. As well, text could be displayed at the start of the game to tell the user how
to play. At this point, it may make sense to store game state (running, finished), rather than checking the state of the
skier. The skier and rhino positions, speed, and direction reset, the `obstacles` array cleared out, and a call made to
`placeInitialObstacles`, and change game state to `running`.

#### Provide a way to pause and resume the game
Building on the idea of the game state, I'd also add a paused state. A keystroke (maybe esc) would toggle the state of
the game between paused and running. In `Game.js > run`, I'd wrap `this.updateGameWindow()` in a conditional so it would
not run when the game is paused. The game could not be paused if it's in a finished state.

#### Add a score that increments as the skier skis further
Since the skier manages his own speed (increasing during jumps, etc), it makes sense to keep track of a distance-based
score at the skier level. `Skier` would have a `distanceTraveled` property that could be accessed by the game. Part of
`drawGameWindow` would access the distance travelled and display that distance as text in a corner of the screen. Since
all displacement of a skier happens now through `moveSkier`, that would be the ideal place to update `distanceTraveled`.

#### Increase the difficulty the longer the skier skis
I suppose I actually did this one. The rhino starts much slower than the skier. It increases its speed over time until
it is faster than the skier unless the skier is regularly taking jumps. Code similar to what is in `Rhino.js > move`
could be used in `ObstacleManager.js > placeNewObstacle` to slowly increase the rate that obstacles spawn and decrease
the gap between them. The skier could similarly be made faster over time, and therefore more difficult to control as
well. Along with this, a skier could only have a certain number of crashes before not being able to get back up. I would
add a `crash` function that checks that property on the skier to determine if all the "lives" have been used up and end
the game if they have. This would mean there are 2 ending states to the game, so the `EATEN` mode probably would need to
be made more generic.

#### Deploy the game to a server so that we can play it without having to install it locally
I went into detail on this above, under the `Documentation` section.

#### Write more unit tests for your code
Unit test coverage is pretty sparse. Ideally, most of the application would have coverage. As with many things on this
project, it has potential to require a lot more time than I'm prepared to spend. But the test coverage of the
`checkIfSkierHitObstacle` function should give an idea of what I'd like the tests to look like.

#### Write more consistent game timing.
Each game loop tick is controlled by `requestAnimationFrame`. This makes the game screen size, refresh rate, and
processor speed dependent. (For example, it runs much slower on my 1440p, 144Hz monitor than on my 1080p 60Hz monitor.)
I would rework this system to deliver a more consistent experience. I would still use `requestAnimationFrame` to redraw,
but all movement calculations and animations would be time-based. So rather than 20 frames between each step in the jump
animation, using something like 300 milliseconds would give a much more consistent experience.

#### Place obstacles more consistently.
Browser size heavily influences the density of object placement. Since objects are placed at particular intervals
instead of at a partifular density, a large screen makes the game much easier. Instead of a simple 1/CHANCE calculation
of an obstacle appearing on the side of the screen the skier is moving toward, the chance would scale based on the
length of that screen edge. Also, if you head back and forth over the same section of mountainside, more obstacles are
placed each time a particular section is reshown. This can lead to increasingly-denser sections if they are retraced.
This could be solved by dividing the canvas into a grid. As a grid cell comes into view (or shortly before it does), it
is populated with obstacles. Some data structure (maybe just a 2-dimensional array) stores which grid cell shave been
populated with obstacles so they're not repopulated again. In conjunction with a game reset feature, this could allow
the player to replay the exact same map.

#### Performance optimization over a long game.
Obstacles are never removed. I'm not sure if this has a significant performance impact. I disabled collisions and ran a
game for quite a while. The `obstacles` array just keeps filling up. I didn't notice any kind of meaningful memory
increase or performance slowdown over a few minutes. I thought I would. So this would definitely be an optimization to
do only if there were a measurable impact on performance or memory usage. But if this were a problem, objects that were
outside the viewport could be removed. This would be done in `updateGameWindow` by calling
`obstacleManager.cleanUpObstacles`, a new function that would iterate over elements in the `obstacles` array and remove
them if their position were outside the game window. 

#### Add style checking to the code.
I could use a package like eslint or standard to ensure consistent code style. I found myself with a few stylistic
habits that differed from the existing code. I don't end lines with semicolons, I use 2 space tabs, and I don't start
and `else` block on a new line. However, when it comes to readability, I believe that consistency is more important than
using any particular style. So I strive to make my code match what's already around it. A linter would ensure that
kind of consistency across a team of more than one person.

#### Update vulnerable packages.
Running `npm audit` reveals a number of high severity vulnerabilities, all seemingly related to prototype pollution.
Before general availability, it would be irresponsible to not upgrade the affected packages which seem to have all been
patched. It just takes time to test and validate the changes. With a full suite of automated tests though, it would be
trivial to safely upgrade those packages.

## Kid-Approved
My 5-year-old daughter played it and approves. She screeched with surprise when she crashed and the rhino finally caught
up to her.