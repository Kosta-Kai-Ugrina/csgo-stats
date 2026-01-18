# csgo-stats

Tiny web app that shows stats for a pre-recorded game between Na'Vi and
Vitality.

Everything in this app uses data from `NAVIvsVitaGF-Nuke.txt`

## Selling points I'm happy about

### Vertically sliced app

app/ talks to features/ and shared/, and features/ talk to shared/ and never
with other features in the folder. This increases separation of concerns and
makes handling any feature easier because it is, by rule, not coupled in any way
to the other features.

You as a developer only need to know the code of that feature and what it uses
from the shared/ folder, which is also segregated by folder as much as possible.

### SSR goodness

Much of the app's components are server-side rendered (SSR) to show the power of
Next.js server-side (server-only) functionality.

This enables the developer to write normal TS functions without having to wrap
everything behind a route, which is good because HTTP routes/API endpoints are
harder to read and bring no upside (except that they're the only way to get
something from the server if the component is client-side)

### Components act like normal DOM elements

all components extend suitable HTML attributes, so the developer looking to
modify styles never had to enter the component to be manipulated, but only its
parent container, which is usually in app/page.tsx. No need to mentally handle
10 files in your head for styling; only one.

## Running the app locally

```bash
npm i
npm run dev
```

You'll need to add a .env file in the project root and add a STEAM_API_KEY for
this app to work.

Here's one on the house to ease your pain:

STEAM_API_KEY=169EA6BB8E3CE4C9C28125535204E23A

(I know this is crazy unsafe. I'll remove it later.)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
