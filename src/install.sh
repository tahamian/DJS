# Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install GIT
brew update
brew install git

# Install node
brew update
brew install node

# Clone REPO
git clone "https://gitlab.cas.mcmaster.ca/velechva/DJS.git"
cd DJS/src

# Install Node Packages
npm install

# Create run file
echo "node server.js" > run.sh
chmod 777 run.sh
