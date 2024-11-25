"use client";
import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Container, Toolbar, Typography, Button, Grid } from "@mui/material";

export default function Home() {
  const handleSubmit = async () => {
    //submit a nutton and get a checkout session

    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
      if (checkoutSession.statusCode == 500){
        console.error(checkoutSession.message)
      }

      const stripe = await getStripe()
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      })

      if(error){
        console.warn(error.message)
      }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>FlashCard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* AppBar for Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login
              
            </Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Main Welcome Section */}
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          The easiest way to create flashcards from scratch.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }} gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
              <Typography variant="body1">
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
              <Typography variant="body1">
                Our AI intelligently breaks down your text into concise flashcards for studying.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
              <Typography variant="body1">
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          {/* Pricing Plan 1 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom >$5 / month</Typography>
              <Typography variant="body1" gutterBottom>
              Access to basic flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Basic</Button>             
            </Box>
          </Grid>

          {/* Pricing Plan 2 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom >Pro</Typography>
              <Typography variant="h6" gutterBottom >$10 / month</Typography>
              <Typography variant="body1" gutterBottom>
                {' '}
                Unlimited flashcarads and storagew with priority support</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Choose Pro</Button>             

            </Box>
          </Grid>

          {/* Pricing Plan 3 */}
          <Grid item xs={12} md={12}  
            >
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom >Enterprise Plan</Typography>
              <Typography variant="h6" gutterBottom >$10 / month</Typography>
              <Typography variant="body1">Custom plans for larger teams.</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Enterprise</Button>             

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}