## Agent skills

### Required skills for every task

Load these two skills before starting any work in this repo.

`graphify` first. A graph already exists at `graphify-out/` (built 2026-10-29), so skip the build pipeline and go straight to `graphify query "<question>"` for anything about how the code works, what calls what, or where something lives. Read `graphify-out/GRAPH_REPORT.md` for the god nodes and community map. Rebuild only when the graph has drifted from the source, using `graphify . --update`.

`unslop` second. It applies to every piece of writing this agent produces: replies, commit messages, docs, code comments, and UI copy. No em dashes, no bolded label and colon lists, no "not just X but Y", no puffery.

### Issue tracker

Use GitHub Issues via `gh`. Before issue operations, read `docs/agents/issue-tracker.md`.

### Triage labels

Use the five canonical triage labels. Before triaging, read `docs/agents/triage-labels.md`.

### Domain docs

Use root `CONTEXT.md` and `docs/adr/`. Before exploring the project, read `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
