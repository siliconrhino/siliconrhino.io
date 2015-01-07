# Silicon Rhino

This is the *[Silicon Rhino](http://yeoman.io)* site

## I've spotted an issue!

While we wish we were perfect (and try our hardest to be), we are human and make mistakes. If you find an issue on our site, this is the place to fix it. Fork us, fix it and send a pull request.


## How do I make a contribution?

This site is made using [Jekyll](https://github.com/mojombo/jekyll/) and the mighty fine [Yeoman.io](http://yeoman.io) generater for Jekyll sites, [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb).

### Preferred (only works on linux and OSX)

To get started:

**1\.** Clone the repository:

```bash
git clone git@github.com:SiliconRhino/siliconrhino.io.git
cd siliconrhino.io
```

**2\.** Install all modules and needed tools

```bash
npm install
gem install bundler
gem install scss-lint
bundle install
bower install
```

You're now all set!

### Alternative (mainly Windows)

**1\.** Clone the repository:

```bash
git clone git@github.com:SiliconRhino/siliconrhino.io.git
cd siliconrhino.io
```

**2\.** Spin up a virtual machine

```bash
vagrant up
```

**3\.** Remote into the machine

Using [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) or some other SSH client, access the vagrant box that has just been spun up. It's usually `127.0.0.1` on port `2222`.

**4\.** Navigate to project root

```bash
cd /vagrant
```

**5\.** Install all modules and needed tools

```bash
sudo npm install
sudo bundle install
sudo bower install
```

**6\.** Start testing
You should run all grunt commands from the `/vagrant` location on the virtual machine. `grunt serve` will usually default to `127.0.0.1:8888`.

## I want to deploy my changes

Only a select few get to deploy changes to our site, sorry. But even if you aren't you might be interested to know how we do it.

Since we used generator-jekyllrb to create our site, check out their instructions in the  [usage section in the generator's README](https://github.com/robwierzbowski/generator-jekyllrb/blob/a6b7f84df446378195b9b638509c5d7890fa130d/README.md#grunt-workflow). It's really quite easy to do.

Copyright (c) Silicon Rhino
