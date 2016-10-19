# atom-score package

[![dependencies Status](https://david-dm.org/MrRacoon/atom-score/status.svg)](https://david-dm.org/MrRacoon/atom-score)
[![Build Status](https://travis-ci.org/MrRacoon/atom-score.svg?branch=master)](https://travis-ci.org/MrRacoon/atom-score)

## Motivation

A stat game for motivating the user to [vim-mode][vimMode] better/harder.

Commands like h,j,k,l have served me very well. But I feel like there is
something better out there for me if I can only find the motivation to move past
them. So I built a random loot generator. The level of the loot that I find
depends on how well I'm doing with certain habits that I would like to reinforce
or extinguish.

For instance h,j,k,l carry negative weight. They drop my score *and* reset my
streak. ^u, and ^d are carry a positive weight. They extend my score and streak.
My goal is to always be near the high score (loot is better around there, and
terrible near zero) and to keep my streak (which only makes the loot better). As
a fun catch, the higher your score is when you are around zero, the much worse
the loot gets. You need to stay away from zero.

## Early Access

This package is not available yet on the [atom package site][atomPackages].
But it's easy to get setup if you wanna play around with it. Use:

```
git clone https://github.com/mrracoon/atom-score.git
cd atom-score
apm link
```

## Credit

Thank you [game-icons.net][gameIcons] for a ton of really great icons.

[vimMode]: https://github.com/atom/vim-mode
[gameIcons]: http://game-icons.net/about.html#authors
[atomPackages]: https://atom.io/packages
