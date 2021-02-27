export {}

declare global {
  const DEPLOYMENT_ENV: 'dev' | 'staging' | 'production'
  const KV: KVNamespace
}
