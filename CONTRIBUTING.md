# How to contribute

## Table of contents

- [Report a bug](#report-a-bug)
- [Request a feature](#request-a-feature)
- [Submit Pull Requests](#submit-pull-requests)
- [Notes on issues and PRs](#notes-on-issues-and-prs)

## Report a bug

Before submitting issue, please make sure the bug was not already reported.
Then [create a issue with the issue template](https://github.com/pocka/bitcolor/issues/new?template=bug_report.md&labels=bug).

## Request a feature

Before submitting issue, please make sure the feature was not already requested.
Then [create a issue with the issue template](https://github.com/pocka/bitcolor/issues/new?labels=enhancement&template=feature_request.md).

Including real world usecases is very helpful and will make the process more effective.

## Submit Pull Requests

We have the pre-commit hook that format source code with tslint and prettier, but sometimes it does not work well (especially if you are using GUI git client).
In that case, please run `format` command (`yarn format` or `npm run format`, also `fmt` alias is available) to format all the source code before submitting a PR.
For the files outside the `src/` directory, you can do `npx prettier --write path/to/file` to format these.

After you create a PR and all status checks passed, maintainer will check the PR soon.

## Notes on issues and PRs

### About issue/PR template

Do not remove any section! If you have nothing to write in the section, keep it blank.

### "I feel my issue/PR is ignored!"

Once you submit an issue or PR, and nothing happened (add to projects, assign someone, reply, set labels, etc) for a week,
you can mention to maintainer (**@pocka**) on the issue or email to <pockawoooh@gmail.com>.

As mainteiner also a human, they sometime forgets replying or triaging.

### Stale issues and PRs

For the issues and PRs that have no activity for more than six months, we close the issue as stale.
If you don't want the issue to be marked as stale, please participate in the discussion (comments only include `+1` are not allowed though).

### Can I include meme on a comment?

Yes, sure :sunglasses:. But be aware of not to violating [CODE_OF_CONDUCT](/CODE_OF_CONDUCT.md).
