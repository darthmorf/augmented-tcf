# About Contributing to ATCF
Hey there 👋! It's awesome of you to want to contribute!

Whether you have an *awesome* idea for a *really cool* feature that you want to suggest, or have gone the extra mile and
already made that *even **more** awsome* feature, this document serves as your trusty side-kick to getting that feature
the attention it deserves. 😎

## Table of Contents
- [Feedback](#feedback)
  * [Suggesting a Feature](#suggesting-a-feature)
  * [Reporting a Bug](#reporting-a-bug)
- [Development](#development)
  * [Build Commands](#build-commands)
  * [Directory Structure](#directory-structure)

---

# Feedback

## Suggesting a Feature
So, you have an *amazing feature ✨* that you want to see implemented? Well then, let's waste no time! There are two
ways to suggest a feature: either [create an issue][new_issue] **(highly preferred)**, or message Everest.

The preferred method of suggesting a feature is to [create an issue][new_issue] with all the juicy details about your
feature, including what it does and how it might be implemented--remember, specifics are helpful when implementing your
feature!

The alternative method, in the case where you don't have a GitHub account or need the feature request to be private
(ex. moderation tools) then a secondary method of feature request would be to [send Everest a message][everest_message].
In most cases, though, Everest will just end up submitting your idea as an issue as per the preferred method.

## Reporting a Bug
Have you found a bug 🐛😱? Fear not! Simply [submit an issue][new_issue] with details on the bug (i.e. reproduction
steps, description of the issue, etc.) and feel safe knowing that the bug will soon be caught (hopefully).

If you can't submit an issue, feel free to [send Everest a message][everest_message] instead.

---

# Development

## Build Commands
'Building' ATCF is quite simple, as the whole process is facilitated using [webpack][webpack]. All building of ATCF
source *should* be done using the npm scripts, each runnable by doing `npm run SCRIPT_NAME`.

- `build:dev`: Builds a development version of ATCF, in which no minfication nor zipping of the built assets are done.
- `build:prod`: Builds a **production** version of ATCF to be submitted to various WebExtension distributors, i.e. the
  Chrome Webstore and AMO.
- `watch`: Similar to `build:dev`, except this will rebuild when it detects a source file has been modified.
- `lint`: Lints the source to make sure the style of the source is consistent and no compile errors occur.

## Directory Structure
The point of this section is to explain the overarching directory structure of the ATCF repostiory. The point isn't to
explain every individual file and directory, but instead help you understand what files go where, and where you might
be able to find a certain file.

- `dist/`: Although it's missing from the git repository, this is where the generated extension files go. This directory
  should, therefore, **never** really be shared. It's not harmful to do so, just unnecessary.
  * `extension/`: Upon 'compiling' files with `webpack` (via the [build commands](#build-commands)), all the output
    files will be in this subdirectory.
  * `extension.zip`: Upon compiling a production build of ATCF, the files in the aforementioned `extension/`
    subdirectory will be archived into a single file for distribution.
- `src/`
  * `static/`: Files in this directory will be directly copied to the `static/` directory within the extension. The
    point is that files in this directory are simply files that will be utilized by ATCF, but don't need to be compiled,
    i.e. fonts or image files (icons, for example).
  * `shared/`: Shared code lives in this directory, accessible to both background and content script processes.
  * `background/`: Code here will be run in the background process/context within the add-on/extension.
  * `main/`: Code here is the main, juicy bits of ATCF run in the content script process/context within the
    add-on/extension.
- `webpack/`: Files within this directory are just utility files used in ATCF's [webpack](https://webpack.js.org)
  configuration.



[everest_message]: https://forums.terraria.org/index.php?conversations/add&to=Everest
[new_issue]: https://github.com/clavin/augmented-tcf/issues/new
[webpack]: https://webpack.js.org/
