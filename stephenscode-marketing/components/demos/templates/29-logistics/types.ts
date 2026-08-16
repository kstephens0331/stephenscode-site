export interface NavOptions {
  /** Tracking number to pre-load on the Track page */
  tracking?: string
  /** Quote calculator service key to preselect: ground | air | ocean */
  service?: string
  /** Service Areas region name to preselect */
  region?: string
  /** Contact form subject to prefill */
  subject?: string
}

export type Navigate = (page: string, options?: NavOptions) => void
