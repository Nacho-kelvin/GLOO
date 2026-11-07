// All page copy lives here so it is easy to review and edit. Nothing here claims an active service that does not exist yet.
export const NAV = [
  ['/about', 'About'], ['/safe-landing', 'Safe Landing'], ['/tourism-to-africa', 'Tourism to Africa', 'Tourism'],
  ['/protection-and-justice', 'Protection & Justice', 'Justice'], ['/womens-health', "Women's Health & Impact", "Women's Health"],
  ['/events', 'Events'], ['/stories-from-afar', 'Stories From Afar', 'Stories'], ['/beyond-the-borders', 'Beyond the Borders', 'Beyond'],
  ['/opportunities', 'Opportunities'], ['/get-involved', 'Get Involved'], ['/contact', 'Contact'],
]
export const SECTORS = [
  ['/safe-landing', 'Safe Landing', 'From surviving to thriving: practical information for Africans living in or visiting Romania.'],
  ['/tourism-to-africa', 'Tourism to Africa', 'Discover African countries through culture, food, music, landscapes and local experiences.'],
  ['/protection-and-justice', 'Protection & Justice', 'Responsible information and checked referrals for Africans facing injustice.'],
  ['/womens-health', "Women's Health & Impact", 'Our long-term vision for affordable, accessible care for women and girls.'],
]
export const COUNTRIES = [
  // [name, teaser, link to a published profile?]
  ['Kenya', 'Capital: Nairobi. From Mount Kenya to the Indian Ocean: our first full profile.', '/beyond-the-borders/kenya'],
  ['Uganda', 'Capital: Kampala. Often called the Pearl of Africa.'],
  ['Rwanda', 'Capital: Kigali. The land of a thousand hills.'],
  ['Zimbabwe', 'Capital: Harare. Shares Victoria Falls, Mosi-oa-Tunya, with Zambia.'],
  ['Democratic Republic of the Congo', 'Capital: Kinshasa. Not the same country as the Republic of the Congo.'],
  ['Republic of the Congo', 'Capital: Brazzaville. Not the same country as the Democratic Republic of the Congo.'],
  ['Senegal', 'Capital: Dakar. Home of teranga, the Wolof word for hospitality.'],
  ['Romania', 'Capital: Bucharest. Where the HomeAFar community began.'],
]
export const VALUES = [
  ['Belonging', 'People deserve connection and a place where they feel welcome.'],
  ['Dignity', 'Every person should be treated with respect and fairness.'],
  ['African identity and diversity', "Celebrating the continent's many cultures, histories, languages and experiences."],
  ['Opportunity', 'Making information, relationships and pathways to growth easier to reach.'],
  ['Solidarity and justice', 'Taking concerns about injustice seriously and helping people find appropriate support.'],
  ['Creativity and participation', 'Building experiences that bring people together.'],
  ['Accountability', 'Communicating honestly about activities, funding, partners and results.'],
  ['Sustainable impact', 'Developing long-term initiatives carefully, with community needs at the centre.'],
]
// Generic content pages. Each page picks the blocks it needs, so the four pages do not share one layout:
//   status      short honest label shown in the hero
//   sections    long-form text beside the sidebar ([heading, paragraphs, asList?])
//   cardSets    icon cards ({ eyebrow, title, intro, cols, items: [[icon, title, text, tag?]] }); icon names are mapped in pages/ContentPage.jsx
//   compare     two lists side by side ({ title, left: { title, items }, right: { title, items } })
//   resources   external links to public bodies ({ eyebrow, title, intro, links: [[label, url, text]] }); only links that have been checked
//   faq         page-specific questions; cta = closing band
// Nothing here claims an active service that does not exist yet.
export const PAGES = {
  'safe-landing': { title: 'Safe Landing', lead: 'From surviving to thriving.', img: 'hands', pos: 'center 50%', status: 'First-weeks guide', band: ['signpost', 'Arriving somewhere new should not mean starting over alone.'],
    side: 'matter', related: ['/opportunities', '/protection-and-justice', '/get-involved'],
    notice: 'General information to help you get started, not legal advice. Rules change, so always confirm with the official authority. We do not publish housing listings or promise accommodation.',
    sections: [
      ['Landing well in Romania', ['Safe Landing is HomeAFar\u2019s practical corner for Africans arriving in, living in or visiting Romania, so a new start feels less like starting over alone.', 'Begin with the checklist below, use the official sources further down the page, and ask us anything you cannot find.']],
      ['Your first-weeks checklist', [
        'Keep your passport, visa and entry documents safe, and keep copies on your phone and on paper.',
        'Staying longer than your visa allows? Apply to the General Inspectorate for Immigration (IGI) to extend your right of stay before your visa expires.',
        'Your Romanian residence permit carries a personal numeric code (CNP). Banks, clinics and offices will ask for it.',
        'Find out how health insurance works for you: through your employer, your university or the National Health Insurance House (CNAS).',
        'Save 112 in your phone. It is the single emergency number for police, ambulance and fire.',
        'Learn a few words of Romanian: Bun\u0103 ziua (good day), Mul\u021bumesc (thank you), V\u0103 rog (please).',
        'Come to a HomeAFar gathering and meet people who have made the same move.',
      ], true],
      ['Finding a place to stay, safely', ['Housing scams target newcomers everywhere. Never pay a deposit for a room you have not seen or to a landlord you cannot verify, ask for a written contract, and keep a receipt for every payment.', 'Unsure about an offer? Ask us. We will share what we know, or tell you where to check.']],
    ],
    cardSets: [
      { eyebrow: 'Who it is for', title: 'Built for three kinds of journey', cols: 3, items: [
        ['briefcase', 'Professionals living in Romania', 'African professionals living and working in Romania.'],
        ['compass', 'Newcomers', 'Africans newly arriving in Romania.'],
        ['plane', 'Visitors', 'Africans visiting Romania for tourism, work, study or events.'],
      ] },
      { eyebrow: 'Growing step by step', title: 'What is here now, and what comes next', intro: 'Safe Landing grows one checked resource at a time. Every resource is labelled as informational, referred or formally verified, so you always know how much checking it has had.', cols: 3, items: [
        ['book', 'First-weeks checklist', 'The practical basics above: documents, permits, health insurance, emergencies and a few first words.', 'Live'],
        ['shield', 'Official sources', 'Direct links to the Romanian public bodies that set the rules.', 'Live'],
        ['users', 'Ask the community', 'Send us your question and we will point you in the right direction.', 'Live'],
        ['home', 'Safe-housing tips', 'How to spot a scam and what to check before you pay.', 'Live'],
        ['handshake', 'Trusted referrals', 'People and organisations we have checked first.', 'Coming next'],
        ['map', 'Visitor guidance', 'For Africans visiting Romania for tourism, work, study or events.', 'Coming next'],
      ] },
    ],
    resources: { eyebrow: 'Official information', title: 'Check the rules with the authority', intro: 'These are public bodies, not HomeAFar services. Rules and procedures change, so check them with the authority itself.', links: [
      ['General Inspectorate for Immigration (IGI)', 'https://igi.mai.gov.ro/en/', 'Romania\u2019s immigration authority, part of the Ministry of Internal Affairs: residence and work permits, asylum and integration programmes.'],
      ['National Health Insurance House (CNAS)', 'https://cnas.ro/', 'Romania\u2019s public health insurance body (Casa Na\u021bional\u0103 de Asigur\u0103ri de S\u0103n\u0103tate): who is insured and how.'],
      ['Study in Romania', 'https://studyinromania.gov.ro/', 'The official portal for international students: universities, programmes and admission.'],
    ] },
    faq: [
      ['Can HomeAFar find me somewhere to live?', 'We do not publish housing listings or promise placements. We can share tips for avoiding scams and tell you what we know about an offer.'],
      ['Where should I start?', 'With the first-weeks checklist on this page and the official sources linked below it. Anything else, ask us through the contact page.'],
      ['How will I know a resource can be trusted?', 'Each resource will be labelled as informational, referred or formally verified.'],
    ],
    cta: { title: 'Tell us what you most need to know', text: 'Ask a question now, or subscribe to hear as new guides and checked referrals are added.', actions: [['/contact', 'Ask a question'], ['/get-involved#subscribe', 'Subscribe for updates', true]] } },

  'tourism-to-africa': { title: 'Tourism to Africa', lead: 'See Africa through a richer, more diverse lens.', img: 'sunsetTree', pos: 'center 60%', status: 'Starting with Kenya', band: ['kigali', 'Africa is not one story.', '35% 24%'], side: 'table', related: ['/beyond-the-borders', '/events', '/stories-from-afar'],
    notice: 'Our first country guide, Kenya, is live. We link only to reputable tourism operators, official tourism boards and local businesses.',
    sections: [
      ['A different way to look at Africa', ['Africa is not one story. This page is where HomeAFar will celebrate the continent as a place to visit and learn about, through its culture, food, music and landscapes.', 'The journey starts in Kenya: our first full Beyond the Borders profile covers the Maasai Mara, Mount Kenya, the Swahili coast, food, music and a few words of Kiswahili. More countries follow, each once its facts are checked.']],
    ],
    cardSets: [
      { eyebrow: 'What you will find here', title: 'Five strands of Tourism to Africa', cols: 3, items: [
        ['compass', 'Country guides and cultural features', 'Guides that introduce each country through its culture, starting with Kenya.', 'Kenya live'],
        ['food', 'Heritage, food and traditional cuisine', 'The history and the flavours behind each place, from ugali to pilau.', 'Kenya live'],
        ['globe', 'Music, arts and landscapes', 'The sounds, creative traditions and scenery that make each country distinct.', 'Kenya live'],
        ['pin', 'Local experiences', 'Local experiences and tourism-related opportunities.', 'Coming next'],
        ['handshake', 'Travel partnerships', 'Curated experiences with partners we have checked.', 'Coming later'],
      ] },
    ],
    compare: { eyebrow: 'Our approach', title: 'How we will handle travel', left: { title: 'What we will do', items: ['Link only to reputable tourism operators and local businesses.', 'Celebrate culture, food, music and landscapes.', 'Publish country guides only after their facts are checked.'] },
      right: { title: 'What we do not do yet', items: ['Sell trips or take bookings.', 'Recommend operators we have not checked.', 'Promise itineraries or partnerships that do not exist.'] } },
    resources: { eyebrow: 'Plan a visit', title: 'Official tourism information', intro: 'An official tourism board, not a HomeAFar service. Check visa and entry rules with the official authorities before you travel.', links: [
      ['Magical Kenya (Kenya Tourism Board)', 'https://magicalkenya.com/', 'Kenya\u2019s official tourism website: destinations, safaris, the coast, culture and travel planning.'],
    ] },
    faq: [
      ['Can I book a trip through HomeAFar?', 'Not at the moment. Travel partnerships and curated experiences are something we may build later, and we will link only to reputable operators and local businesses.'],
      ['Where should I start?', 'With Kenya, our first full country guide. More countries follow one by one; subscribe to hear when each new one is published.'],
      ['I know a place well. Can I contribute?', 'We would like to hear from you. Share your story or ask us a question and we will get back to you.'],
    ],
    cta: { title: 'Begin the journey in Kenya', text: 'Read our first country guide, then follow the series as it travels across the continent.', actions: [['/beyond-the-borders/kenya', 'Explore Kenya'], ['/get-involved#subscribe', 'Subscribe for updates', true]] } },

  'protection-and-justice': { title: 'Protection & Justice', lead: 'Standing with Africans who face injustice.', img: 'scales', pos: 'center 62%', status: 'Information and referrals only', band: ['strength', 'Standing with Africans who face injustice.'], side: 'phoneBox', related: ['/safe-landing', '/contact', '/get-involved'],
    notice: 'HomeAFar does not provide legal representation, emergency services or guaranteed protection. In an emergency in Romania, call 112.',
    sections: [
      ['Referrals', ['Verified referral resources will be listed here after each has been checked. We will not list a service we have not reviewed.']],
      ['Your privacy', ['Please do not send detailed accounts of an incident through the general contact form. Use it to ask for a safe way to be put in touch.']],
    ],
    compare: { eyebrow: 'Our role', title: 'What this page is, and is not', left: { title: 'What we aim to do', items: ['Help people understand where they can seek appropriate help for discrimination, exploitation, injustice or unfair treatment.', 'Point to credible organisations and professional support.'] },
      right: { title: 'What HomeAFar does not do', items: ['Provide legal representation.', 'Provide emergency services.', 'Guarantee protection.'] } },
    resources: { eyebrow: 'Public bodies in Romania', title: 'Where discrimination can be reported', intro: 'This is a public body, not a HomeAFar service or referral. Verified referral resources will be added here after each one has been checked.', links: [
      ['National Council for Combating Discrimination (CNCD)', 'https://www.cncd.ro/', 'Romania\u2019s national anti-discrimination body (Consiliul Na\u021bional pentru Combaterea Discrimin\u0103rii).'],
    ] },
    faq: [
      ['Can HomeAFar give me legal advice or represent me?', 'No. HomeAFar does not provide legal representation. We aim to help you understand where to seek appropriate help.'],
      ['What should I do in an emergency?', 'In an emergency in Romania, call 112. HomeAFar does not provide emergency services.'],
      ['Can I tell HomeAFar what happened to me?', 'Please do not send detailed accounts through the general contact form. Use it to ask for a safe way to be put in touch.'],
    ],
    cta: { title: 'Need a safe way to get in touch?', text: 'Write to us without details of the incident and ask for a safe way to be put in touch.', actions: [['/contact', 'Contact us'], ['/safe-landing', 'About Safe Landing', true]] } },

  'womens-health': { title: "Women's Health & Impact", lead: 'A long-term vision for care that is affordable, accessible and respectful.', img: 'women', pos: 'center 40%', status: 'Long-term vision', band: ['joy', 'Care that is affordable, accessible and respectful.', 'center 55%'], related: ['/about', '/get-involved', '/contact'],
    notice: 'HomeAFar is not a hospital, clinic or medical provider, and this page is not medical advice. Please see a qualified professional for care.',
    sections: [
      ['Early research directions', ['Nanyuki and Embu, Kenya, have been identified as places of interest for future research into women\'s health needs. No research or service delivery has started. We will announce research only once its scope, methods, permissions and partners are confirmed.']],
      ['Current activity', ['There are no active medical programmes, partnerships or services. Please do not share health details through our website forms.']],
    ],
    cardSets: [
      { eyebrow: 'Long-term ambitions', title: 'What we hope to build toward', cols: 4, items: [
        ['heart', 'Reproductive and genital health awareness', 'Including HPV, endometriosis, adenomyosis, uterine fibroids and PCOS.', 'Long-term'],
        ['users', 'Gender-based violence awareness', 'Awareness, and safe, confidential spaces.', 'Long-term'],
        ['sprout', 'Early pregnancy support', 'Support without shame or blame.', 'Long-term'],
        ['pin', 'Care closer to home', 'Affordable, community-based care closer to where people live.', 'Long-term'],
      ] },
    ],
    resources: { eyebrow: 'Trusted health information', title: 'Learn more from the World Health Organization', intro: 'General information from an international health body. It is not medical advice from HomeAFar: please see a qualified professional for care.', links: [
      ['WHO fact sheet: Endometriosis', 'https://www.who.int/news-room/fact-sheets/detail/endometriosis', 'An overview of what endometriosis is, how it is diagnosed and how it is managed.'],
    ] },
    faq: [
      ['Does HomeAFar provide medical care?', 'No. HomeAFar is not a hospital, clinic or medical provider, and there are no active medical programmes, partnerships or services.'],
      ['Where is HomeAFar looking at women\'s health needs?', 'Nanyuki and Embu, Kenya, have been identified as places of interest for future research. No research has started.'],
      ['Can I send health details through the website?', 'Please do not. Our forms are not a place for medical information.'],
    ],
    cta: { title: 'Help shape what comes next', text: 'Members, volunteers and partners shape what HomeAFar becomes. Come and talk to us.', actions: [['/get-involved', 'Get involved'], ['/contact', 'Contact us', true]] } },
}

// Facts below come only from content already published on this site; do not add figures that cannot be verified.
export const STATS = [
  ['1', 'community event held', 'Passport Picnic, 30 August 2026'],
  ['5', 'countries represented', 'at our first event'],
  ['4', 'focus areas', 'being built step by step'],
  ['8', 'countries in our series', 'starting with Kenya'],
]
export const JOURNEY = [
  ['November 2024', 'The journey begins', 'Founder Murugi Njiru moves from Kenya to Romania and starts to see what community could look like.'],
  ['30 August 2026', 'Passport Picnic', 'Our first community event: a cultural potluck with games in Tineretului Park, Bucharest.'],
  ['Now', 'Growing the community', 'Our first country profile, Kenya, is live, alongside a Safe Landing guide for newcomers and trusted opportunity sources.'],
]
export const FAQ = [
  ['Who is HomeAFar for?', 'HomeAFar is for Africans connecting across borders, starting with African experiences in Romania and Eastern Europe: people who live, work, study or travel here, and friends who want to be part of the community.'],
  ['Do you offer housing, legal help or medical care?', 'Not directly. Safe Landing shares a first-weeks guide and official sources, Protection & Justice points to public bodies, and Women\'s Health & Impact is a long-term vision. We will only list resources after we have checked them. In an emergency in Romania, call 112.'],
  ['How do I take part?', 'Choose the route that suits you on the Get Involved page: become a member, volunteer, partner with us or subscribe to updates. You can also write to us from the Contact page.'],
  ['Can I share my story?', 'Yes. Stories From Afar is built around consent: nothing is published without the storyteller\'s approval. Send a short summary and we will contact you.'],
  ['How are opportunities chosen?', 'Every listing shows its source link and, where relevant, a closing date. We list opportunities only after checking them.'],
  ['What happens to the details I send?', 'We use them only to reply to you, handle your application or registration, or send updates you asked for. You can ask us to export or delete them at any time. Read the privacy notice for details.'],
]
export const TOPICS = ['Culture & history', 'Languages', 'Food & music', 'Fashion', 'Tourism', 'Economy', 'Contemporary life']
export const OPP_TYPES = ['Scholarships', 'Jobs', 'Internships', 'Volunteering', 'Training', 'Business', 'Creative collaborations']
export const FOOTER_NAV = {
  Explore: [['/about', 'About'], ['/events', 'Events'], ['/stories-from-afar', 'Stories From Afar'], ['/beyond-the-borders', 'Beyond the Borders'], ['/opportunities', 'Opportunities']],
  'Our work': [['/safe-landing', 'Safe Landing'], ['/tourism-to-africa', 'Tourism to Africa'], ['/protection-and-justice', 'Protection & Justice'], ['/womens-health', "Women's Health & Impact"]],
  Connect: [['/get-involved', 'Get involved'], ['/contact', 'Contact'], ['/privacy', 'Privacy']],
}
// Leadership. Titles are as supplied by HomeAFar. The team photograph is PH.team (community-indoors).
export const LEADERS = [
  ['Murugi Njiru', 'Chief Executive Officer', 'Founded HomeAFar and leads its direction, events, storytelling concepts and community growth.'],
  ['Eunice Wangui', 'Events and Experiences Lead', 'Leads HomeAFar\u2019s events and experiences.'],
  ['Charles Marcell', 'Co-founder, Technical Co-Founder & Director of Strategy, Creative & Technology', 'Builds meaningful partnerships and community connections, and contributes to strategy, digital and technology direction.'],
]
export const IG = 'https://www.instagram.com/home.a.far/'
export const EMAIL = 'homeafar26@gmail.com'
// Social platforms HomeAFar uses. Facebook has no verified URL in the project, so it is shown as plain text until one is supplied (set `href`).
export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', handle: '@home.a.far', href: IG },
  { id: 'facebook', label: 'Facebook', handle: 'Home AFar', href: null },
]
// Passport Picnic participants were connected to these countries (from the event description on this site).
export const PICNIC_COUNTRIES = ['Kenya', 'Republic of the Congo', 'Rwanda', 'Senegal', 'Zambia']
// Which illustration represents each focus area on the homepage tiles.
export const SECTOR_IMG = { '/safe-landing': 'matter', '/tourism-to-africa': 'sunsetTree', '/protection-and-justice': 'scales', '/womens-health': 'women' }

// SAMPLE QUOTES: written to show the testimonial design. Replace each with a real guest's words (and their permission) before launch.
// [quote, first name, country (must exist in components/Flag.jsx)]
export const VOICES = [
  ['I came on my own and left with a group chat full of new friends. It was the first afternoon in Bucharest that truly felt like home.', 'Wanjiru', 'Kenya'],
  ['The potluck table was a map of Africa. I tasted chapati and thi\u00e9boudienne on the same plate and heard five languages in one conversation.', 'Awa', 'Senegal'],
  ['The passport game broke the ice in minutes. By the end of the day, nobody there was a stranger.', 'Eric', 'Rwanda'],
]
