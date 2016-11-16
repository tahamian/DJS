# Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install GIT
brew update
brew install git

# Install node
brew update
brew install node

# Clone REPO
git clone ruby -e "https://gitlab.cas.mcmaster.ca/velechva/DJS.git"
cd DJS/src

# NPM Install
npm install --save express args command-line-args cookie-parser express-handlebars jsdoc mocha omxdirector play-sound player socket.io ws

# Create run file
echo "node server.js" > run.sh
chmod 777 run.sh