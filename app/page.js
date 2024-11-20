"use client";
import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Container, Toolbar, Typography, Button, Grid } from "@mui/material";

export default function Home() {
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
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
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
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
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
              <Typography variant="h6">Easy Text Input</Typography>
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
              <Typography variant="h6">Smart Flashcards</Typography>
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
              <Typography variant="h6">Accessible Anywhere</Typography>
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
              <Typography variant="h6">Basic Plan</Typography>
              <Typography variant="body1">Great for individuals starting out.</Typography>
            </Box>
          </Grid>

          {/* Pricing Plan 2 */}
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
              <Typography variant="h6">Pro Plan</Typography>
              <Typography variant="body1">Advanced features for professionals.</Typography>
            </Box>
          </Grid>

          {/* Pricing Plan 3 */}
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
              <Typography variant="h6">Enterprise Plan</Typography>
              <Typography variant="body1">Custom plans for larger teams.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
