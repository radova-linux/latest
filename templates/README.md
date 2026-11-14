# Content metadata standard

Every post is a static HTML file at `latest/<type>/<slug>/index.html`.
`<type>` is one of `agenda`, `article`, `news`, `security`.

## URL structure

| URL | File |
|---|---|
| `/latest/` | `latest/index.html` |
| `/latest/<type>/` | `latest/<type>/index.html` |
| `/latest/<type>/page/<number>/` | `latest/<type>/page/<number>/index.html` |
| `/latest/<type>/<slug>/` | `latest/<type>/<slug>/index.html` |

## How metadata is stored

Metadata goes in `<head>` as `<meta name="radova:<field>" content="...">`, one tag per field.
Leave out optional fields that have no value; never leave `content` empty.
Dates use ISO 8601 with the WIB offset: `2026-11-14T09:00:00+07:00`.
Lists (`tags`, `affected_versions`, `patched_versions`, `cve`) are comma-separated.

## Standard fields (all types)

| Field | Required | Example |
|---|---|---|
| `title` | yes | `Radova Latest is live` (also used for `<title>` and `<h1>`) |
| `slug` | yes | `radova-latest-is-live` (lowercase, `a-z0-9-`, same as folder name) |
| `date` | yes | `2026-11-14T09:00:00+07:00` (publication date) |
| `summary` | yes | One or two sentences |
| `tags` | yes | `release, community` |

## Agenda fields

| Field | Required | Values |
|---|---|---|
| `start_time` | yes | ISO 8601, `+07:00` |
| `end_time` | no | ISO 8601, `+07:00` |
| `location` | yes | Place name or `Online` |
| `register_url` | no | Absolute URL |
| `status` | yes | `scheduled` or `cancelled` |

## Security fields

| Field | Required | Values |
|---|---|---|
| `advisory_id` | yes | `RSA-YYYY-NNN`, e.g. `RSA-2026-001` |
| `severity` | yes | `low`, `medium`, `high`, `critical` |
| `affected_versions` | yes | e.g. `1.0, 1.1` |
| `patched_versions` | yes | e.g. `1.2`, or `none` while unpatched |
| `cve` | no | e.g. `CVE-2026-12345` |
| `status` | yes | `investigating`, `mitigated`, `resolved`, `informational` |
