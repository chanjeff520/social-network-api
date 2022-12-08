# __social-networking-api__
With noSQL
## Link to Deployed Application

[Click Here!](https://chanjeff520.github.io/portfolio-with-react/)

## Technology

- JavaScript: Programming Language used to create the application
- Node.js: To run JavaScript without the browser and to run the application
- npm: To install necessary modules and packages for this project 
- MongoDB: To create the database
- Mongoose: To create the schema for the database
- express: To create the server and routes
- Git: For version control to track changes to source code
- GitHub: To host the repository
- insomnia: To test the routes

## Description



## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Code Snippets](#code-snippets)
- [Author](#author-links)


## Installation

  Dependencies needed: npm, mongoDB, mongoose, nodemon, node.js<br>
  Installation : (only follow this installation if this application was downloaded from GitHub)
   - install node.js via (https://nodejs.org/en/download/)
   - In the terminal, do 'npm install' package.json file. Make sure to do this within the directory with index.js.
   - Lastly install inquirer and mysql by 'npm i express' and 'npm i mongoose'. Again, do this within the directory with index.js

## Usage
1) To run the application, type 'npm start' in the terminal.
2) To test the routes, use insomnia to test the routes. The routes should be in the routes folder.

## Credits

- UC Berkeley Extension for providing the starter code.

## License

MIT License

## Code Snippets

```js
//get all user or create new user
router.route('/').get(getUsers).post(createUser);

//get a single user, delete a user, or update a user
router.route('/:user_id').get(getSingleUser).delete(deleteUser).put(updateUser);

/* ------------------------ Friend Routes -------------------------------- */

//add or remove a friend from the friendlist in the user model
router.route('/:user_id/friends/:friend_id').post(addFriend).delete(removeFriend);
```

The code above is the routes for the user model. The first route is to get all the users or create a new user. The second route is to get a single user, delete a user, or update a user. The third route is to add or remove a friend from the friendlist in the user model. <br>

```js
    //get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thought_id})
        .select('-__v')
        .then(async (thought) => {
            !thought 
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json({
                thought,
                reaction_count: await Thought.reactionCount
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
```

This code above is the getSingleThought function. This function is to get a single thought. The function will find a thought by the thought_id. If the thought is not found, it will return a 404 status. If the thought is found, it will return the thought and the reaction count. The reaction count is a virtual that is created in the thought model. It is the number of reactions that are in the thought model. <br>
```js

## Author Links

  You can reach me on
  GitHub: [__chanjeff520__](https://github.com/chanjeff520) <br>
  LinkedIn: [__Jeff chan__](https://www.linkedin.com/in/jefflchan/),<br>
  Email:  __chanjeff520@gmail.com__