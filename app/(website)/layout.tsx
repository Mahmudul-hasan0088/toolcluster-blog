import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "@/styles/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { urlForImage } from "@/lib/sanity/image";
import Script from "next/script";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.title || "Toolcluster Tutorials - Tech News, Reviews & Insights",
      template: "%s | Toolcluster Tutorials"
    },
    description:
      settings?.description ||
      "Stay updated with the latest tech news, reviews, and technical insights at Toolcluster Tutorials, your go-to source for everything tech-related.",
    keywords: [
      "Tech news",
      "Technology insights",
      "Product reviews",
      "Gadgets",
      "Tech trends",
      "Technical blog",
      "Tech reviews",
      "Software reviews",
      "Tech tutorials",
      "Industry news",
      "Toolcluster",
      "AI developments",
      "Cybersecurity",
      "Cloud computing",
      "Gadget reviews"
    ],
    authors: [{ name: "Toolcluster Tutorials" }],
    canonical: settings?.url || "https://toolcluster.vercel.app",
    openGraph: {
      images: [
        {
          url: urlForImage(settings?.openGraphImage)?.src || "/opengraph.jpeg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title:
        settings?.title || "Toolcluster Tutorials | Tech News, Reviews & Insights",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

const generateJsonLd = settings => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: settings?.title || "Toolcluster Tutorials",
  url: settings?.url || "https://toolcluster.vercel.app",
  description:
    settings?.description ||
    "Toolcluster Tutorials covers the latest trends in technology, offering insights, product reviews, and in-depth technical analysis to keep you informed on the latest in tech.",
  publisher: {
    "@type": "Organization",
    name: settings?.title || "Toolcluster Tutorials",
    logo: {
      "@type": "ImageObject",
      url: settings?.logo ? urlForImage(settings.logo)?.src : "/logo.png"
    }
  },
  author: {
    "@type": "Person",
    name: settings?.author || "Toolcluster Tutorials"
  },
  image: {
    "@type": "ImageObject",
    url: settings?.openGraphImage
      ? urlForImage(settings.openGraphImage)?.src
      : "/opengraph.jpeg",
    width: 1200,
    height: 630
  },
  keywords: [
    "tech blog",
    "technology reviews",
    "industry news",
    "gadgets",
    "AI developments",
    "cybersecurity trends"
  ],
  inLanguage: "en-US"
});

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  const jsonLd = generateJsonLd(settings);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, "scroll-smooth")}>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-6380030036040607"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6380030036040607"
          crossOrigin="anonymous"></script>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for blog posts"
          href="/rss/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleTagManager gtmId="GTM-W7DG9FQ8" />
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="relative mx-auto max-w-screen-lg overflow-x-hidden bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar {...settings} />
          <div className="mt-24">{children}</div>
          <Analytics />
          <SpeedInsights />
          <Toaster richColors position="top-center" closeButton expand={false} />
          <Footer {...settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 60;
