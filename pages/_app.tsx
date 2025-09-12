import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import '../src/i18n' // initialize i18next
import '../src/index.css'
import '../src/App.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
