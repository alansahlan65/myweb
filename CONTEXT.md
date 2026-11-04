# Alan Sahlan's personal website

The vocabulary for Alan Sahlan's personal website and the work and interests it presents.

## Language

**Home**:
The portfolio entry page introducing Alan and presenting selected projects, design experience, and contact information.

**About**:
The personal background and interests page, labelled "Know me better" in the navigation.

**Project**:
A piece of Alan's product-design work presented in the portfolio. The initial selection is Paylecta, Aurelia, PawFriend, and Munchpal.

**Project preview**:
The image that introduces a Project in Home's selected-work section. Its name and arrow reveal on hover, keyboard focus, or touch.

**Projects page**:
A dedicated page for Alan's portfolio projects, distinct from Home's selected-work section.

**Shelf**:
The collection of favorite music, games, films, and books on the About page.

**Alan character**:
The pixelated figure depicting Alan in the sidebar, distinct from the Blob buddy.

**Blob buddy**:
The small blue face beside Alan's identity, distinct from the Alan character.

**Compact rail**:
The 72px desktop sidebar with icon-only navigation and actions, collapsed from its 208px expanded width. The shell keeps its expanded outer width, so the main column absorbs the freed 136px and grows to the left while its right edge stays put. Applies above 1000px only; the mobile header and menu are separate.

**Theme**:
The site's light or dark appearance, chosen by the visitor or inherited from the system. Every color comes from a token that has a light and a dark value.

**Theme toggle**:
The 44px Moon and Sun button that switches the Theme. It sits in the rail footer on desktop and in the mobile identity row below 1001px, and keeps the chosen Theme across reloads.

**Stored theme**:
A visitor's explicit Theme choice, saved in `localStorage` under `theme`. When absent, the site follows the system preference, including later changes.

**Contact modal**:
The contact-choice dialog for reaching Alan through his available communication channels.

**Contact channel**:
A way to reach Alan, such as email, Instagram, or WhatsApp.
