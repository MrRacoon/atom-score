# atom-score package

[![dependencies Status](https://david-dm.org/MrRacoon/atom-score/status.svg)](https://david-dm.org/MrRacoon/atom-score)
[![Build Status](https://travis-ci.org/MrRacoon/atom-score.svg?branch=master)](https://travis-ci.org/MrRacoon/atom-score)

## Motivation

A plugin for the Atom editor, to provide instant feedback during to your workflow.

It's hard to break habits. And it's fun to play games. Let's build a system to keep track of your coding habits, and try to sway you into better habits with points.

For instance:

> You want to learn to be more vigilant about keeping code folds 'folded'

so if I **give 2 points** for closing folds, and **take 2 points** every time a fold is opened. The developer should eventually learn to close every fold they open right?

TBO, I don't actually know the answer to that. That's why I built this experiment :)

I'm compiling achievements and adding points to atom commands. Out of the gate, it's mostly all personal preference (you need to have [vim-mode][vimmode]). But I hope that soon I can have a profile system of sorts. And let the developer pick and choose the habits they want to hone.

## Setup

Currently, this package is undergoing rapid development. I don't feel it's mature enough at the moment to go on the atom package site. Until then you can play with the early stuff with:

```
git clone https://github.com/mrracoon/atom-score.git
cd atom-score
apm link
```

## Contributions

Pull requests always welcome.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

[vimmode]: https://github.com/atom/vim-mode
