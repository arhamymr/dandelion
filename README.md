oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g oclif-hello-world
$ dandelion COMMAND
running command...
$ dandelion (--version)
oclif-hello-world/0.0.0 darwin-x64 node-v16.13.1
$ dandelion --help [COMMAND]
USAGE
  $ dandelion COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dandelion hello PERSON`](#dandelion-hello-person)
* [`dandelion hello world`](#dandelion-hello-world)
* [`dandelion help [COMMAND]`](#dandelion-help-command)
* [`dandelion plugins`](#dandelion-plugins)
* [`dandelion plugins:inspect PLUGIN...`](#dandelion-pluginsinspect-plugin)
* [`dandelion plugins:install PLUGIN...`](#dandelion-pluginsinstall-plugin)
* [`dandelion plugins:link PLUGIN`](#dandelion-pluginslink-plugin)
* [`dandelion plugins:uninstall PLUGIN...`](#dandelion-pluginsuninstall-plugin)
* [`dandelion plugins update`](#dandelion-plugins-update)

## `dandelion hello PERSON`

Say hello

```
USAGE
  $ dandelion hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ dandelion hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/oclif/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `dandelion hello world`

Say hello world

```
USAGE
  $ dandelion hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ dandelion hello world
  hello world! (./src/commands/hello/world.ts)
```

## `dandelion help [COMMAND]`

Display help for dandelion.

```
USAGE
  $ dandelion help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dandelion.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `dandelion plugins`

List installed plugins.

```
USAGE
  $ dandelion plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dandelion plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `dandelion plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dandelion plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ dandelion plugins:inspect myplugin
```

## `dandelion plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ dandelion plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ dandelion plugins add

EXAMPLES
  $ dandelion plugins:install myplugin 

  $ dandelion plugins:install https://github.com/someuser/someplugin

  $ dandelion plugins:install someuser/someplugin
```

## `dandelion plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ dandelion plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ dandelion plugins:link myplugin
```

## `dandelion plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ dandelion plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dandelion plugins unlink
  $ dandelion plugins remove
```

## `dandelion plugins update`

Update installed plugins.

```
USAGE
  $ dandelion plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
