# Techmely CLI

## Generate

```bash
techmely gen [TEMPLATE] [OPTIONS]
```

```bash
techmely gen ddd --type be,fe
```

### Domain driven BE template

```bash
techmely gen ddd --type be
```

### Domain driven FE template

```bash
techmely gen ddd --type fe
```

### Migration file

```bash
techmely gen migration --type ts
```

## Third Party App

## Performance

```bash
techmely performance [OPTIONS]
```

```bash
--debug [boolean] [default]
--no-cache [boolean]
--throttle [boolean]
--request [number]
--port [number]
--headers [Map]
--excludes test,api,config,heath,ping,blog*
--includes index,about,xxx
--view [mobile,desktop]
--outdir # Path to save the contents of the client and reports to.
```

## Release

```bash
techmely release:docs
techmely release:api
techmely release:app
techmely release:web
```

## Test

```bash
techmely test --stack ts,react # runs test suite (unit & e2e)
techmely test:coverage --stack dart # runs test coverage
techmely test:types --stack ts # runs typecheck
```

## Docs

Start docs

```bash
techmely docs
```

### Release packages

## List
Lists all available commands

## Setup Work Env

```bash
techmely setup:oh-my-zsh
```

## Migrate

```bash
techmely migrate:
```

## Lint

```bash
techmely lint .
techmely lint --apply .
```

## Format

```bash
techmely format .
```

## Changelog

```bash
techmely changelog
```

## Toolkit

## Help

## Version
