export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 ease-out"
      style={{ backgroundColor: 'var(--page-bg, #ffffff)' }}
    />
  )
}
