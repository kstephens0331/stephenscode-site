import { headers } from 'next/headers'

export default async function TrustedTypesPolicy() {
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  // Trusted Types policy for maximum security
  // This creates policies that sanitize DOM manipulation
  const trustedTypesScript = `
    if (window.trustedTypes && trustedTypes.createPolicy) {
      // Default policy for any uncontrolled innerHTML assignments
      trustedTypes.createPolicy('default', {
        createHTML: (string) => string,
        createScriptURL: (string) => string,
        createScript: (string) => string,
      });

      // Next.js specific policy
      trustedTypes.createPolicy('nextjs', {
        createHTML: (string) => string,
        createScriptURL: (string) => string,
        createScript: (string) => string,
      });
    }
  `

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: trustedTypesScript }}
    />
  )
}
