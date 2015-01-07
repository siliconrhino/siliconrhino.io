#!/bin/bash -eux

# Update package list
apt-get update

# Install curl
apt-get install -y curl

# Install nodejs
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs

# Install git
apt-get install -y git

# Install global prerequisits
npm install -g grunt-cli
npm install -g bower
gem install bundler --no-ri --no-rdoc
gem install scss-lint --no-ri --no-rdoc
