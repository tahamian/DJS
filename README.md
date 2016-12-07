# DJS
---

Tired of the DJ playing songs that nobody can jam to?

DJS is an easy-to-use webapp that lets people vote for the next song to play
at an event.

Team Name: DJ-Node
Team Members:
* Victor Velechovsky
* Amandeep Panesar
* Taha Main

## Installation on MacOS

DJS is easy to install on Mac via the following terminal commands

```bash
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

# Make Music Directory
mkdir music

# Create run file
echo "node server.js" > run
chmod 777 run.sh
```

## Installation on Linux

DJS can be installed on Linux as well, with the following commands:

```bash
sudo apt-get update

# Install GIT
sudo apt-get install git

# Install Curl
sudo apt-get intall curl

# Install NodeJS
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs

# Install mplayer
sudo apt-get install mplayer

# Clone REPO
git clone "https://gitlab.cas.mcmaster.ca/velechva/DJS.git"
cd DJS/src

# Install Node Packages
npm install

# Create run file
echo "node server.js" > run
chmod 777 run.sh
```

## Testing

The testing environment requires all npm dev dependencies as well as:
* Firefox
* Geckodriver
* Selenium-Webdriver

Tests can be run with:

```bash
cd src

npm test
```

## Contributing

Feel free to contribute by creating pull requests.

## License

Copyright (c) <2016> <DJS>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
