# Web Harmonium

A modern virtual harmonium you can play in the browser with mouse, computer keyboard, or MIDI device. Uses the **same real harmonium sample** and audio engine logic as the original [Web Harmonium by Rajaraman Iyer](https://rajaramaniyer.github.io/webharmonium.html). All settings are saved in **localStorage** — no backend required.

## Features

- **Real harmonium sample** — `harmonium-kannan-orig.wav` with convolution reverb
- **Exact keyboard mapping** — `` ` `` `q` `w` `e` `r` `t` `y` `u` `i` `o` `p` `[` `]` `\` and black keys `1` `2` `4` `5` `7` `8` `9` `-` `=`
- **Controls** — volume, reverb, transpose (−11 to +11), octave (0–6), additional reeds
- **MIDI support** — USB MIDI keyboard (Chrome/Edge), including volume CC
- **Compatible localStorage** — uses the same keys as the original (`webharmonium.volume`, etc.)

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Web Audio API (sample playback + convolution reverb)
- localStorage

## Quick Start

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** and click a key to start audio.

Your volume, reverb, transpose, and other settings are remembered automatically between visits.

## Keyboard Shortcuts

| White keys | `` ` `` `q` `w` `e` `r` `t` `y` `u` `i` `o` `p` `[` `]` `\` |
| Black keys | `1` `2` `4` `5` `7` `8` `9` `-` `=` |

## Deploy to Netlify

1. Push this repo to GitHub
2. In [Netlify](https://app.netlify.com), create a new site from the repo
3. Build settings (from `netlify.toml`):
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`
4. Deploy — no environment variables needed

## Project Structure

```
web-harmonium/
├── client/
│   ├── src/
│   │   ├── audio/       # Tone.js engine & keyboard layout
│   │   ├── components/
│   │   ├── hooks/
│   │   └── storage/     # localStorage helpers
│   └── public/
├── netlify.toml
└── README.md
```

## License

MIT
