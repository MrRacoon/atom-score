
# Building an Atom package for rewarding/punishing vim usage.

How can I measure my editing habits?

*Erik Sutherland*

---

Who is this guy
===============

![me](https://avatars2.githubusercontent.com/u/2682113?v=3&s=466)

*Erik Sutherland* ***/(Mr)?Racoon/***

* **Education** PSU BA-CS & BA-Psyc

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
