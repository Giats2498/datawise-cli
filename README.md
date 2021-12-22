<img src="https://www.datawise.gr/theme/Datawise/assets/images/logo.png" width="200" height="41">

datawise-cli: Node.JS CLI
=================================

<!-- toc -->
* [🗒 Description](#-description)
* [🚀 Getting Started Tutorial](#-getting-started-tutorial)
* [✨ Features](#-features)
* [📌 Requirements](#-requirements)
* [🏗 Usage](#-usage)
* [🔨 Commands](#-commands)
<!-- tocstop -->

# 🗒 Description

This is a cli for building templates and controllers for React.js and Next.js. This cli is based on [reactcoregk](https://github.com/karyofyllis/reactcoregk) and it can build templates and controllers in Javascript and Typescript.

# 🚀 Getting Started

Install package with command `npm install datawise-cli`.
Initialize tempalte with command `npx datawise-cli init`.

# ✨ Features

* **CLI Generator** - Run a single command to scaffold out a fully functional template or controller and get started quickly. See [Usage](#-usage) below.
* **Super Speed** - The overhead for running a datawise CLI command is almost nothing. [It requires very few dependencies](https://github.com/Giats2498/datawise-cli/blob/main/package.json) (only 6 dependencies). Also, only the command to be executed will be required with node. So large the CLI with many commands will load equally as fast as a small one with a single command.
* **Documentation** - By default you can pass `--help` to the CLI to get help such as flag options and argument information.
* **Configuration** - Datawise-cli can create or remove all of basic configurations like (framework,language,path) of project with a single command `npx datawise-cli framework set -react`.
* **TypeScript (or not)** - Everything in the core of datawise-cli is written in Javascript and the generator can build fully configured TypeScript or plain JavaScript templates and controllers. By virtue of static properties in TypeScript the syntax is a bit cleaner in TypeScript—but everything will work no matter which language you choose.
* **Autocomplete path** - If you run `npx datawise-cli path set` automatically shows you some of paths in your project to help you initialize templates or controllers faster and without errors.

# 📌 Requirements

Currently, Node 12.20+ is supported. We support the [LTS versions](https://nodejs.org/en/about/releases) of Node.

# 🏗 Usage

Creating a Controller:

```sh-session
$ npx datawise-cli ctrler crt

? Select framework (Use arrow keys)
> React
  Next
Framework is set: React

? Select language (Use arrow keys)
> Javascript
  Typescript
Framework is set: Javascript

? Select a target directory for your template: (Use arrow keys or type to search)
> .\src\store
  .\
Path is set: .\src\store

? Give name for controller
test
```

```
my-app
├── src
│   └── store
│       ├── @core
│       │    ├── endpoint.js
│       │    ├── entityType.js
│       │    └── schema.js
│       ├── test
│       │    ├── actions.js
│       │    ├── module.js
│       │    ├── reducer.js
│       │    └── saga.js
│       ├── actions.js
│       ├── index.js
│       ├── reducers.js
│       └── sagas.js
│       
...
└──
```

# 🔨 Commands

<!-- commands -->
* [`datawise-cli init`](#datawise-cli-init)
* [`datawise-cli framework [COMMAND]`](#datawise-cli-framework-command)
* [`datawise-cli lang [COMMAND]`](#datawise-cli-lang-command)
* [`datawise-cli path [COMMAND]`](#datawise-cli-path-command)
* [`datawise-cli ctrler [COMMAND]`](#datawise-cli-ctrler-command)


## `datawise-cli init`

Generate a new template

```
USAGE
  $ datawise-cli init 

COMMANDS
  -
DESCRIPTION
  Initialize the template
```

## `datawise-cli framework [COMMAND]`

Manage framework in project

```
USAGE
  $ datawise-cli framework [COMMAND]

COMMANDS
  set [Options]       Set framework in project
    Options:
    -r,--react        Set React as framework
    -n,--next         Set Next as framework
  show                Show the saved framework
  remove              Remove framework

DESCRIPTION
  Manage framework in project
```

## `datawise-cli lang [COMMAND]`

Manage language in project

```
USAGE
  $ datawise-cli lang [COMMAND]

COMMANDS
  set [Options]       Set language in project
    Options:
    -js,--javascript  Set Javascript as language
    -ts,--typescript  Set Typescript as language
  show                Show the saved language
  remove              Remove language

DESCRIPTION
  Manage language in project
```

## `datawise-cli path [COMMAND]`

Manage path in project

```
USAGE
  $ datawise-cli lang [COMMAND]

COMMANDS
  set [Options]       Set path in project
    Options:
    -p, --path <path> Set config path
  show                Show the saved path
  remove              Remove path

DESCRIPTION
  Manage path in project
```


## `datawise-cli ctrler [COMMAND]`

Create or remove controller

```
USAGE
  $ datawise-cli ctrler [COMMAND]

COMMANDS
  crt [Options]       Create controller in project
    Options:
    -n, --name <name> Set name
    -p, --path <path> Set config path
  rm [Options]       Create controller in project
    Options:
    -n, --name <name> Set name
    -p, --path <path> Set config path

DESCRIPTION
  Create or remove controller
```