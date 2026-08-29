'use client'
// CHANGELOG (2026-08-29): Fixed multiple bugs that made this page crash or render wrong:
// - `searchParams.entries('session_id')` returned an iterator, not the id — now uses `.get('session_id')`.
// - `setSession(sessionData)` referenced an undefined variable (the fetch result was named `session`).
// - <Box> was rendered but never imported (ReferenceError on the paid-success branch).
// - `sw={{...}}` typo for `sx`, and `(error)` rendered as literal text instead of `{error}`.
// - Guarded against a null session before reading `payment_status`.
// - Wrapped the useSearchParams consumer in <Suspense>, required by Next 15 for prerendering.

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const ResultContent = () => {
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                setLoading(false)
                return
            }

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error?.message || 'Failed to retrieve checkout session')
                }
            } catch (err) {
                setError('An error occurred')
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if (error || !session) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">
                    {error || 'No checkout session found.'}
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            {session.payment_status == 'paid' ? (
                <>
                    <Typography variant='h6'>
                        Thank you for purchasing
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='h6'>
                            Session ID: {session_id}
                        </Typography>
                        <Typography variant='body1'>
                            We have received your payment. You will receive an email with the order details shortly.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant='h6'>
                        Payment Failed
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='body1'>
                            Your payment was not successful, please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    )
}

const ResultPage = () => (
    <Suspense
        fallback={
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        }
    >
        <ResultContent />
    </Suspense>
)

export default ResultPage
