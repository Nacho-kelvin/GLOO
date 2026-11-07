# What HomeAFar still needs to supply

The site deliberately publishes no invented facts. These are the gaps, by page. Nothing below appears as a visible placeholder on the live site.

## Please review before publishing (links added in this update)
Each link was checked to exist and to be the body described. HomeAFar should confirm it is happy to point to them.
- Safe Landing: General Inspectorate for Immigration (https://igi.mai.gov.ro/en/)
- Protection & Justice: National Council for Combating Discrimination (https://www.cncd.ro/)
- Women's Health & Impact: WHO endometriosis fact sheet (https://www.who.int/news-room/fact-sheets/detail/endometriosis)
Links live in `src/data/content.js` (`resources` blocks).

## Content to supply
- **Safe Landing:** checked housing information, referral partners, newcomer guides, visitor accommodation guidance. Define what "informational", "referred" and "formally verified" mean.
- **Tourism to Africa:** reviewed operators or official national tourism boards (only Kenya's was verified in this pass; add a balanced set), first country guides.
- **Protection & Justice:** reviewed referral organisations and a safe contact route for sensitive cases.
- **Women's Health & Impact:** confirmed research scope, partners and permissions for Nanyuki and Embu; further reviewed health-information links.
- **Stories From Afar:** first consented stories; translation and caption workflow.
- **Beyond the Borders:** checked country profiles (8 are in preparation).
- **Opportunities / Events:** real listings and future event details.
- **Brand files (not in the zip I received):** logo, favicons, `og-image.jpg`, flag SVGs and the Passport Picnic invitation poster under `public/images/`. Keep your existing copies.

## How to add content
Edit `src/data/content.js`. Content pages take optional blocks: `cardSets`, `compare`, `resources`, `faq`, `cta`. New icon names must be added to the `ICONS` map in `src/pages/ContentPage.jsx`.
