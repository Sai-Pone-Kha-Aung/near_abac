import Link from 'next/link';

// Minimal inline styles to avoid loading full CSS bundle
const NotFound = () => {
    return (
        <html lang="en">
            <head>
                <title>404 - Page Not Found</title>
                <meta name="robots" content="noindex" />
            </head>
            <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    backgroundColor: '#d1d5db',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Page not found.</p>
                        <Link href="/" style={{ color: '#374151', textDecoration: 'underline' }}>
                            Go to Home
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default NotFound;