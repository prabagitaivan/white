# white

### about

personal website 😁

### cli scripts

```bash
start       # start app in development mode
build       # build app for production
test        # test app with jest watch
deploy      # deploy app into zeit now
coverage    # test coverage and generating its report
lint        # format and lint code
```

### folder structure

```bash
.
├ public/           # serve public files
├ src/              # contain all main things
│ ├ components/     # common components
│ ├ layouts/        # main layouts / screens
│ │ └ components/   # local components
│ ├ libraries/      # global libraries or reusable methods
│ ├ reducers/       # list reducers and action
│ ├ sagas/          # list sagas - side effect
│ ├ styles/         # style related configuration, theme, etc
│ ├ app.js          # setup main listener, lifecycle and routers
│ ├ index.js        # setup main DOM and service worker
│ ├ setupTests.js   # setup test file
│ └ stores.js       # store configuration for redux
├ .env              # environment variables
└ now.json          # configuration file for zeit now
```

### version

use semantic version that increment based on features (layout, components, etc)

**major**.**minor**.**patch**

- major: breaking changes
- minor: add, update, or remove
- patch: patch or bugfix