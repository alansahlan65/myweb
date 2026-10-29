# Alan Sahlan

Product designer based in Bandung, Indonesia. This is the source for my personal site: selected product work, the path that got me here, and the things I keep coming back to.

## Pages

Home presents four product projects (Paylecta, Aurelia, PawFriend, Munchpal), my design experience, and a way to get in touch.

About covers my background, experience, and skills, then the Shelf: albums, games, films, and a book whose artwork opens on hover, focus, or tap.

## Interaction notes

The sidebar collapses into a 72px icon rail as you scroll and expands again at the top. Contact opens a modal with email, WhatsApp, and Instagram, plus a button that copies the address. Motion runs on Lenis smooth scrolling with the easing tokens in `src/app/globals.css`, and it backs off under reduced motion and reduced transparency.

## Stack

Next.js 16 App Router, React 19, TypeScript, Lenis, Base UI, Phosphor and Lucide icons, Geist and Caveat.

## Running it

```bash
npm install
npm run dev      # http://127.0.0.1:3000
npm run build
npm run typecheck
npm test         # Playwright
```

## Documentation

`DESIGN.md` covers layout, type, color, and motion decisions. `CONTEXT.md` holds the vocabulary used across the site. `docs/interaction-spec.md` records the approved interaction limits.

## Elsewhere

- Email: [alansahlanwork@gmail.com](mailto:alansahlanwork@gmail.com)
- LinkedIn: [muhammadsahlanshadiq](https://www.linkedin.com/in/muhammadsahlanshadiq/)
- Instagram: [alannshln](https://www.instagram.com/alannshln/)

The code, copy, and artwork here are personal work. No license is granted for reuse.
