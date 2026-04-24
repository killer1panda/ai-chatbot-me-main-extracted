const DEFAULT_APP_URL = 'http://localhost:3000'

const normalizeUrl = (url: string) => url.replace(/\/$/, '')

export const getAppUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (!configuredUrl) {
    return DEFAULT_APP_URL
  }

  return normalizeUrl(configuredUrl)
}
