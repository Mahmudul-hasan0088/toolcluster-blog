import GoogleAdSense from '@/components/google-adsense'

export default function AdExample() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Website Content</h1>
            <p className="mb-4">This is some example content on your website.</p>

            <GoogleAdSense
                client="ca-pub-6380030036040607"
                slot="8412192778"
                format="auto"
                responsive={true}
                style={{ display: 'block', minHeight: '250px', maxWidth: '100%' }}
                className="my-4 bg-muted"
                layout="in-article"
                layoutKey="-6t+ed+2i-1n-4w"
                testMode={process.env.NODE_ENV === 'development'}
            />

            <p className="mt-4">More content after the ad...</p>
        </div>
    )
}