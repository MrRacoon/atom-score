
# Building an Atom package for rewarding/punishing vim usage.

How can I measure my editing habits?

*Erik Sutherland*

---

Who is this guy
===============

![me](https://avatars2.githubusercontent.com/u/2682113?v=3&s=466)

*Erik Sutherland* ***/(Mr)?Racoon/***

* **Education** PSU BA-CS & BA-PSYCH

* **Job** Frontend Developer, Nike

* **CAT** Former Claw-1

* **Hobbies** FP, Drumming, cartographing

* **Languages** ES6/JS, Haskell, Clojure

* [github](https://github.com/MrRacoon)

---

# What was used

* [d3](https://d3js.org)

* [FP](http://ramdajs.com)

* [Redux](https://github.com/reactjs/redux)

* [Lenses](https://github.com/calmm-js/partial.lenses)

---

# Atom packages

*Start With* with `package-generator:create-package` and name your package
*something cool like `docblokr`, or `activate-power-mode`, or `atom-score`

- Source `lib/**/*`

    - Entry point `lib/$PACKAGE_NAME.js`

- Styling `styles/*.{less,css}`

- Key bindings `keymaps/*.{json,cson}`

- Menu entries `menus/*.{json,cson}`

- Tests `spec/*-spec.js`

---

# Entry point

`lib/$PACKAGE_NAME.js`

Atom is going to run this file first, so everything you do must branch from this
file.

* Make your HTML elements
* Create your Redux stores
* Charge your flux capacitor

---

# Styles, menus, and bindings

* read automatically
* they're just configurations anyway
* Tests are run on demand `window:run-package-specs`
