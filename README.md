[![Build Status](https://travis-ci.com/trackvid/frontend.svg?branch=master)](https://travis-ci.com/trackvid/frontend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ce61499396b34fb48eaa793645b91a64)](https://www.codacy.com/gh/trackvid/frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=trackvid/frontend&amp;utm_campaign=Badge_Grade)
# TRACKvid (frontend)

> This project was created while **EUvsVirus** hacathon

## Mockups

Created mockupis in figma: [Mockups](https://www.figma.com/file/FXrsqEjzTPEhxMRXmnC9S3/Trackvid?node-id=0%3A1)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Why?

### Inspiration
We want create a tool for people to allow them to check if they could be in close proximity with infected with covid-19 in future in every other deadly disease.
They could also check if in place where they want to go is safe and is do not have any cases at that moment.
### What it does
It allows users to track their movement and compare it with movement people with known infection to check if there was a chance to be near to the somebody with disease. If it was it alerts them to take additional precautions. Data is totally anonymous, so users are not exposed to data leak of their confidental information. IMPORTANT: Because we didn't have time to setup https to test our app in azure it is required to set flag --unsafely-treat-insecure-origin-as-secure in chrome to http://51.138.102.117/ . Fast link to that flag chrome://flags/#unsafely-treat-insecure-origin-as-secure
### How we built it
We built it with: ```javascript```, ```typesript```, ```vue```, ```lefleat```, ```java```, ```spring```, ```neo4j```
### Challenges we ran into
Functionality to leave browser awake when user blocks phone or changes app. Integration typescript with vuex, lefleat and there was some problem with application deployment on azure.
### Accomplishments that we're proud of
Integrating **graph database** to use it structure to perform fast search of hit cases and display all possible infection locations with description in **map**.
### What we learned
We get to know neo4j database and. We discovered how to use triangulation to discover user position, thanks to that device which runs the app does not need gps.
### What's next for Trackvid
We want to create an app whit the most dangerous paths, regions etc. . We want to do some optimization for matching the data. We have to add functionality to frontend to force browser to not sleep (currently, to track data browser has to be open). Currently view is adjusted for phones. On pc it can look clunky. And our next goal will be to make it fully responsive on all platforms. Unfortunatelly tracking our localization on demo app in azure may not work because we have time to add https support which is required. Our next will be to add https to azure. Currently to test our it is required to set flag --unsafely-treat-insecure-origin-as-secure in chrome to http://51.138.102.117/ . Fast link to that flag chrome://flags/#unsafely-treat-insecure-origin-as-secure
