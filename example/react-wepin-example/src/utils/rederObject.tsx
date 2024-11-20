export const renderObject = (obj: any, depth = 0) => {
  if (typeof obj !== 'object' || obj === null) {
    return <span>{obj?.toString() || 'N/A'}</span>
  }

  const entries = Object.entries(obj)

  return (
    <ul className="nested-list" style={{ paddingLeft: `${depth * 15}px` }}>
      {entries.map(([key, value]) => (
        <li key={key} className="nested-item">
          <strong className="nested-key">{key}:</strong>{' '}
          {typeof value === 'object' && value !== null ? (
            renderObject(value, depth + 1)
          ) : (
            <span className="nested-value">{value?.toString() || 'N/A'}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
