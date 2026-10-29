# Issue tracker: GitHub

Issues and specs live in GitHub Issues. Use the `gh` CLI.

Resolve the repository from `git remote -v`, or use a repository explicitly supplied by the user.

## Operations

- Create issues with `gh issue create`. For multiline bodies, write the text to a temporary file and use `--body-file`.
- Read tickets with `gh issue view <number> --comments`, including labels.
- List tickets with `gh issue list`, using state and label filters.
- Comment with `gh issue comment`.
- Change labels with `gh issue edit --add-label` or `--remove-label`.
- Close completed tickets with `gh issue close`.

“Publish to the issue tracker” means create a GitHub issue.
“Fetch the relevant ticket” means read the issue and its comments.

## Pull requests as a triage surface

PRs as a request surface: no.

## Wayfinding

- Keep the effort map in one issue labelled `wayfinder:map`.
- Link child tickets as sub-issues. If unavailable, use a task list in the map and a `Part of #<map>` reference in each child.
- Label child types `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- Record blockers using native issue dependencies. If unavailable, use a `Blocked by:` line with issue references.
- Choose open, unassigned children with no open blockers, in map order.
- Claim a ticket by assigning it to the driving developer before work.
- Resolve by commenting with the answer, closing the ticket, and adding a brief answer and link to the map.
