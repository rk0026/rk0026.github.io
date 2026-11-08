# Portfolio layout

English at `/`, Traditional Chinese at `/zh/`; Astro static site on GitHub Pages. Existing colours, Geist typography and saved light/dark themes remain unchanged.

Layout follows the structure of codewithsadee/vcard-personal-portfolio, not its colours or assets. Desktop: 1200px maximum shell with a sticky 275px profile sidebar and a right content panel. Below 1000px the profile moves above the content; contact details collapse into a native details element. Below 640px navigation sits at the bottom with safe-area padding.

Base.astro owns the shell. Sidebar.astro owns the portrait, identity, separately labelled current job, public contact links and résumé download. TopBar.astro keeps locale, clock and theme controls plus page links. Footer.astro contains only image attribution and copyright. Home no longer repeats the profile or contact list. Wispo remains a separate page. All existing page routes and note categories remain.

Verification: build plus browser checks at 1440 and 390 pixels, both themes, contact expansion and horizontal overflow. No copied testimonials, skill percentages or invented claims.
