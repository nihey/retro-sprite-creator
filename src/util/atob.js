export default function atob_ (string) {
  if (typeof window !== 'undefined') {
    return atob(string)
  }

  return Buffer.from(string, 'base64').toString('binary')
}
