'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'

interface GoogleAdSenseProps {
  client: string
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  layout?: string
  layoutKey?: string
  responsive?: boolean
  style?: React.CSSProperties
  className?: string
  testMode?: boolean
}

const ADSENSE_SCRIPT_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const loadAdSenseScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${ADSENSE_SCRIPT_URL}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = ADSENSE_SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load AdSense script'))
    document.head.appendChild(script)
  })
}

export default function GoogleAdsense({
  client,
  slot,
  format = 'auto',
  layout,
  layoutKey,
  responsive = true,
  style = {},
  className = '',
  testMode = false,
}: GoogleAdSenseProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadAd = async () => {
      try {
        await loadAdSenseScript()
        if (isMounted) {
          setIsLoaded(true)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'))
        }
      }
    }

    loadAd()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (isLoaded && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({})
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize ad'))
      }
    }
  }, [isLoaded])

  if (error) {
    return (
      <Card className={`p-4 text-center text-muted-foreground ${className}`} style={style}>
        <AlertCircle className="mx-auto mb-2 h-6 w-6 text-destructive" />
        <p>Ad failed to load. Please disable your ad blocker and refresh the page.</p>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className={`flex items-center justify-center p-4 ${className}`} style={style}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    )
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={responsive}
      data-adtest={testMode ? 'on' : 'off'}
    />
  )
}