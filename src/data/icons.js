// Icons that belong to shared data in content.js (kept here so content.js stays plain text). All icons are lucide-react.
import { House, HandHeart, Globe, TrendingUp, Scale, Palette, BadgeCheck, Leaf, HeartPulse, Plane, Home, Users, HeartHandshake, Handshake, Mail } from 'lucide-react'

export const VALUE_ICONS = {
  Belonging: House, Dignity: HandHeart, 'African identity and diversity': Globe, Opportunity: TrendingUp,
  'Solidarity and justice': Scale, 'Creativity and participation': Palette, Accountability: BadgeCheck, 'Sustainable impact': Leaf,
}
export const SECTOR_ICONS = { '/safe-landing': Home, '/tourism-to-africa': Plane, '/protection-and-justice': Scale, '/womens-health': HeartPulse }
// The four ways to take part, each pointing at its section on the Get Involved page.
export const WAYS_IN = [
  ['/get-involved#member', Users, 'Become a member', 'Join the community and be part of what we build together.'],
  ['/get-involved#volunteer', HeartHandshake, 'Volunteer', 'Lend your time and skills to events, content and community care.'],
  ['/get-involved#partner', Handshake, 'Partner with us', 'Organisations, businesses and creators: let us explore working together.'],
  ['/get-involved#subscribe', Mail, 'Subscribe', 'Be first to hear about events, stories and opportunities.'],
]

// One icon per page, shown in the menu, the footer and each page's header badge.
import { Info, LifeBuoy, CalendarDays, MessagesSquare, Earth, Briefcase, Sparkles, Lock, House as HouseIcon } from 'lucide-react'
export const ROUTE_ICONS = {
  '/': HouseIcon, '/about': Info, '/safe-landing': LifeBuoy, '/tourism-to-africa': Plane, '/protection-and-justice': Scale, '/womens-health': HeartPulse,
  '/events': CalendarDays, '/stories-from-afar': MessagesSquare, '/beyond-the-borders': Earth, '/beyond-the-borders/kenya': Earth, '/opportunities': Briefcase,
  '/get-involved': HandHeart, '/contact': Mail, '/privacy': Lock,
}
export const routeIcon = (path) => ROUTE_ICONS[path] || Sparkles
