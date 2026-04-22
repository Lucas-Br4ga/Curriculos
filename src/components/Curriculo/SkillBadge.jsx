export default function SkillBadge({ nome, match = false }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
        match
          ? 'bg-green-50 text-green-700 border-green-200'
          : 'bg-gray-100 text-gray-500 border-gray-200 opacity-70'
      }`}
    >
      {match && <span className="mr-1">✓</span>}
      {nome}
    </span>
  )
}
