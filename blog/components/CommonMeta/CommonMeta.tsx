import Head from 'next/head'

export default function CommonMeta({ title = "OotaCode", description = "プログラミング学習について発信しています" }) {

  return (
    <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${process.env.SITE_URL}/ogp_large.png`} />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@Icjtx472UVjO195" />
        <meta name="twitter:title" content="プログラミング学習についてまとめています。" />
        <meta name="twitter:description" content="Web制作,Web開発のコードブログです。" />
        {/* <meta name="twitter:image" content="" /> */}
    </Head>
  )
}