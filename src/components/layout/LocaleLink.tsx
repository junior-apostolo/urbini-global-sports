import { forwardRef } from 'react'
import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'
import { useLocalizedHref } from '@/lib/i18n/LocaleContext'

/** Locale-aware drop-in replacement for react-router's Link — prefixes internal `to` paths with the current locale. */
export const LocaleLink = forwardRef<HTMLAnchorElement, LinkProps>(function LocaleLink({ to, ...props }, ref) {
  const href = useLocalizedHref(typeof to === 'string' ? to : to.pathname ?? '/')
  return <Link ref={ref} to={typeof to === 'string' ? href : { ...to, pathname: href }} {...props} />
})

/** Locale-aware drop-in replacement for react-router's NavLink. */
export const LocaleNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function LocaleNavLink(
  { to, end, ...props },
  ref,
) {
  const basePath = typeof to === 'string' ? to : (to.pathname ?? '/')
  const href = useLocalizedHref(basePath)
  return (
    <NavLink
      ref={ref}
      to={typeof to === 'string' ? href : { ...to, pathname: href }}
      end={end ?? basePath === '/'}
      {...props}
    />
  )
})
