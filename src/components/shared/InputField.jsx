export default function InputField({
  label,
  id,
  error,
  textarea = false,
  className = '',
  ...props
}) {
  const base =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
    'disabled:bg-gray-50 disabled:text-gray-500 ' +
    (error ? 'border-red-400 focus:ring-red-500 ' : '')

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea id={id} className={base + ' resize-none'} {...props} />
      ) : (
        <input id={id} className={base} {...props} />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
