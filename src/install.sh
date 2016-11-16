# Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install GIT
brew update
brew install git

# Clone REPO
git clone ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
cd DJS/src

# NPM Install
npm install --save express args chao command-line-args cookie-parser express-handlebars jsodoc mocha omxdirector play-sound player selenium-webdriver socket.io ws

# Create run file
echo "node server.js" > run.sh
chmod 777 run.sh