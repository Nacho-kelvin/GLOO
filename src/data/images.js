// Image registry. Each entry: P(folder under /images, file base, available widths, alt text, optional default object-position).
// Files are /images/<folder>/<base>-<width>.webp.
// "selected/real" holds HomeAFar's own photographs (from the supplied "images" set).
// "selected/stock" holds curated Unsplash photographs (free licence). They set the mood and are not captioned as HomeAFar events or people.
// Anything else in public/images is legacy: scripts/audit-images.mjs lists files that nothing below references.
const P = (dir, b, w, alt, pos) => ({ dir, b, w, alt, pos })
const PORT = (p) => ({ ...p, portrait: true }) // 3:4 photographs: shown whole in the slideshow instead of being cropped

export const PH = {
  // Real HomeAFar photographs
  group: P('selected/real', 'community-group-wide', [480, 800, 1200, 1600], 'Members of the HomeAFar community smiling and posing together in the park', 'center 55%'),
  passports: P('selected/real', 'passport-picnic-chalkboards', [480, 800, 1200, 1600], 'Six participants holding Passport Picnic chalkboards in the park', 'center 40%'),
  chat: PORT(P('selected/real', 'passport-picnic-chatting', [480, 800, 1200], 'Participants chatting in the park at Passport Picnic')),
  activity: PORT(P('selected/real', 'passport-picnic-activity', [480, 800, 1200], 'Participants gathered around an activity on the grass')),
  passport: PORT(P('selected/real', 'passport-picnic-passport', [480, 800, 1200], 'A participant holding up her Passport Picnic passport')),
  portrait: PORT(P('selected/real', 'community-portrait', [480, 800, 1200], 'A community member with the Kenyan flag painted on her cheek, in the park', 'center 45%')),
  team: P('selected/real', 'community-indoors', [480, 800, 1200, 1600], 'Members of the HomeAFar community seated together indoors', 'center 45%'),
  // Passport Picnic invitation (existing file, kept as it was)
  poster: PORT(P('photos', 'passport-picnic-invitation', [480, 800], 'Passport Picnic invitation: 30 August 2026, 2 to 6 pm, Tineretului Park, Bucharest')),

  // Curated stock photographs (Unsplash)
  scales: P('selected/stock', 'justice-scales', [480, 800, 1200, 1600], 'Brass scales of justice in a law office', 'center 62%'),
  signpost: P('selected/stock', 'signpost-distances', [480, 800, 1200, 1600], 'A signpost pointing to cities around the world, with distances in kilometres', 'center 50%'),
  kigali: P('selected/stock', 'kigali-evening', [480, 800, 1200, 1600], 'Fireworks above a convention centre and hotel in Kigali at night', '35% 24%'),
  hands: P('selected/stock', 'hands-on-trunk', [480, 800, 1200, 1600], 'Hands resting together along a tree trunk', 'center 50%'),
  story: P('selected/stock', 'everyone-has-a-story', [480, 800, 1200, 1600], 'A wall that reads Everyone has a story, with a leather sofa below'),
  matter: P('selected/stock', 'you-are-not-alone', [480, 800, 1200, 1600], 'Signs on a fence that read Don\u2019t give up, You are not alone and You matter'),
  women: P('selected/stock', 'women-smiling', [480, 800, 1200, 1600], 'Four young women laughing together', 'center 40%'),
  sunsetTree: P('selected/stock', 'sunset-tree', [480, 800, 1200, 1600], 'A tree silhouetted against a setting sun over distant hills', 'center 60%'),
  joy: P('selected/stock', 'sunset-celebration', [480, 800, 1200, 1600], 'Friends with raised arms silhouetted against a sunset over water', 'center 55%'),
  strength: P('selected/stock', 'community-is-strength', [480, 800, 1200, 1600], 'A red billboard reading Community is strength'),
  phoneBox: P('selected/stock', 'red-phone-box', [480, 800, 1200, 1600], 'A red phone box with a help point inside, beside a white wooden building', 'center 40%'),
  puzzle: P('selected/stock', 'puzzle-pieces', [480, 800, 1200, 1600], 'Jigsaw pieces on a table, some already fitted together', 'center 55%'),
  arrow: P('selected/stock', 'orange-arrow', [480, 800, 1200, 1600], 'An orange lit arrow on a dark brick wall pointing down and to the left', '70% 55%'),
  cafe: P('selected/stock', 'cafe-window', [480, 800, 1200, 1600], 'A calm room with armchairs and tall windows looking onto trees', 'center 50%'),
  table: P('selected/stock', 'shared-table', [480, 800, 1200, 1600], 'A table seen from above with coffee, a bagel and pastries to share', 'center 50%'),
  phone: P('selected/stock', 'vintage-telephone', [480, 800, 1200, 1600], 'A vintage telephone on a dark blue shelf', 'center 55%'),
  sunrise: P('selected/stock', 'friends-sunrise', [480, 800, 1200, 1600, 2400], 'Silhouettes of six friends with raised arms against a golden sunrise over misty hills', 'center 62%'),
  dream: P('selected/stock', 'follow-that-dream', [480, 800, 1200, 1600], 'A bicycle beside a street sign that reads Follow that dream, among palm trees', 'center 22%'),
}

// Names kept so older pages and the slideshow list keep working
PH.pp1 = PH.passports
PH.pp2 = PH.group
PH.pp3 = PH.chat
PH.pp4 = PH.activity
PH.pp6 = PH.passport
PH.authenticHome = PH.group

export const BRAND = { logo: '/images/brand/homeafar-logo-132.webp' } // 132px WebP (about 5 KB) for the 40-44px header and footer logo; the full PNG stays for search-engine data

// Width / height of each photograph, so full-bleed images can tell the browser how wide a file they really need.
const RATIO = {
  'community-group-wide': 1.333,
  'community-indoors': 1.333,
  'community-portrait': 0.75,
  'passport-picnic-activity': 0.75,
  'passport-picnic-chalkboards': 1.333,
  'passport-picnic-chatting': 0.75,
  'passport-picnic-passport': 0.75,
  'cafe-window': 0.75,
  'community-is-strength': 1.333,
  'everyone-has-a-story': 0.96,
  'follow-that-dream': 0.667,
  'friends-sunrise': 1.5,
  'hands-on-trunk': 0.662,
  'justice-scales': 0.667,
  'kigali-evening': 1.0,
  'orange-arrow': 1.5,
  'red-phone-box': 1.0,
  'shared-table': 0.667,
  'signpost-distances': 0.667,
  'sunset-celebration': 1.778,
  'sunset-tree': 0.682,
  'vintage-telephone': 1.5,
  'women-smiling': 1.5,
  'you-are-not-alone': 1.5,
  'passport-picnic-invitation': 0.708,
}

// `sizes` for a photo that covers a box `vh` tall and the full screen width (object-fit: cover). A landscape photo has to be
// wider than the screen to fill a tall box; a portrait one does not. Getting this right stops phones downloading oversized files.
export const coverSizes = (p, vh) => `max(100vw, ${Math.ceil(vh * (RATIO[p.b] || 1.5))}vh)`

export const imgSrc = (p, w) => `/images/${p.dir}/${p.b}-${w}.webp`
export const imgSrcSet = (p) => p.w.map((w) => `${imgSrc(p, w)} ${w}w`).join(', ')
