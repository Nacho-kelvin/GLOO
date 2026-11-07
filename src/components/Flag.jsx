// Country flag (accurate SVGs from the MIT-licensed flag-icons set, copied to /images/flags). Always shown beside the country's name, so the image itself is decorative.
export const FLAGS = { Kenya: 'ke', Uganda: 'ug', Rwanda: 'rw', Zimbabwe: 'zw', Senegal: 'sn', Romania: 'ro', Zambia: 'zm', 'Democratic Republic of the Congo': 'cd', 'Republic of the Congo': 'cg' }

export default function Flag({ country, className = '' }) {
  const code = FLAGS[country]
  if (!code) return null
  return <img className={`flag ${className}`.trim()} src={`/images/flags/${code}.svg`} alt="" width="28" height="21" loading="lazy" decoding="async" />
}
