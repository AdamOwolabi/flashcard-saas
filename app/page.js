"use client";
import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { 
  Box, 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  Stack,
  alpha
} from "@mui/material";
import { 
  AutoAwesome, 
  Speed, 
  CloudSync, 
  Star,
  Check
} from "@mui/icons-material";

export default function Home() {
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!checkoutSession.ok) {
        const errorText = await checkoutSession.text();
        console.error('Server error:', errorText);
        throw new Error(`Server error: ${checkoutSession.status}`);
      }

      const checkoutSessionJson = await checkoutSession.json();
      console.log('Checkout session JSON:', checkoutSessionJson);

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Head>
        <title>FlashcardSaaS - AI-Powered Learning</title>
        <meta name="description" content="Transform your study materials into intelligent flashcards with AI" />
      </Head>

      {/* Modern AppBar */}
      <AppBar position="static" elevation={0} sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary'
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <AutoAwesome sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                color: 'text.primary',
                fontSize: '1.4rem'
              }}>
                FlashcardSaaS
              </Typography>
            </Box>
            <SignedOut>
              <Button 
                color="inherit" 
                href="/sign-in"
                sx={{ mr: 1, textTransform: 'none', fontWeight: 500 }}
              >
                Sign In
              </Button>
              <Button 
                variant="contained" 
                href="/sign-up"
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2
                }}
              >
                Get Started
              </Button>
            </SignedOut>
            <SignedIn>
              <Button 
                variant="outlined" 
                href="/generate"
                sx={{ 
                  mr: 2, 
                  textTransform: 'none', 
                  fontWeight: 500,
                  borderRadius: 2
                }}
              >
                Create Flashcards
              </Button>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Chip 
                  label="✨ AI-Powered Learning" 
                  sx={{ 
                    alignSelf: 'flex-start',
                    backgroundColor: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
                <Typography variant="h2" sx={{ 
                  fontWeight: 800, 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 2
                }}>
                  Transform Text into
                  <Box component="span" sx={{ 
                    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block'
                  }}>
                    Smart Flashcards
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.9,
                  fontSize: '1.25rem',
                  lineHeight: 1.6,
                  maxWidth: '500px'
                }}>
                  Leverage the power of AI to instantly convert your study materials into intelligent, personalized flashcards that accelerate learning.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    href="/generate"
                    sx={{ 
                      backgroundColor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    Start Creating Free
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: alpha('#ffffff', 0.1)
                      }
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                display: { xs: 'none', md: 'block' }
              }}>
                {/* Placeholder for illustration - you can add an image here */}
                <Box sx={{
                  width: '100%',
                  height: 400,
                  backgroundColor: alpha('#ffffff', 0.1),
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px dashed ${alpha('#ffffff', 0.3)}`
                }}>
                  <Typography variant="h6" sx={{ opacity: 0.7 }}>
                    🎯 Hero Illustration
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: 'text.primary'
          }}>
            Why Choose FlashcardSaaS?
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Experience the future of learning with our cutting-edge AI technology
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              p: 4,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                borderColor: 'primary.main'
              }
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <AutoAwesome sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                AI-Powered Generation
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Our advanced AI analyzes your content and creates optimized flashcards that enhance retention and understanding.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              p: 4,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                borderColor: 'primary.main'
              }
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                backgroundColor: 'success.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <Speed sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Lightning Fast
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Generate comprehensive flashcard sets in seconds, not hours. Spend more time learning, less time creating.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              p: 4,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                borderColor: 'primary.main'
              }
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                backgroundColor: 'info.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <CloudSync sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Sync Everywhere
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Access your flashcards across all devices with seamless cloud synchronization. Study anywhere, anytime.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: 'text.primary'
            }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto'
            }}>
              Choose the perfect plan for your learning needs
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                position: 'relative',
                height: '100%',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Starter
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Perfect for students
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Free
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Forever
                  </Typography>
                </Box>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">5 flashcard sets</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Basic AI generation</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Mobile access</Typography>
                  </Box>
                </Stack>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  size="large"
                  href="/sign-up"
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  Get Started
                </Button>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                position: 'relative',
                height: '100%',
                border: '2px solid',
                borderColor: 'primary.main',
                transform: 'scale(1.05)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <Chip 
                  label="Most Popular" 
                  sx={{ 
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                  Pro
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  For serious learners
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    $10
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    per month
                  </Typography>
                </Box>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Unlimited flashcard sets</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Advanced AI features</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Priority support</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Export to multiple formats</Typography>
                  </Box>
                </Stack>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={handleSubmit}
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  Upgrade to Pro
                </Button>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                position: 'relative',
                height: '100%',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Enterprise
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  For organizations
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Custom
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    pricing
                  </Typography>
                </Box>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Custom integrations</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Dedicated support</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Advanced analytics</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Team management</Typography>
                  </Box>
                </Stack>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  size="large"
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  Contact Sales
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1a1a1a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AutoAwesome sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                  FlashcardSaaS
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.6, mb: 3 }}>
                Revolutionizing the way you learn with AI-powered flashcards. 
                Transform any content into effective study materials.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'grey.400', ml: 1 }}>
                  Trusted by 10,000+ students
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Product
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Features
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Pricing
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  API
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  About
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Blog
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Careers
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Support
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Help Center
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Contact
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Status
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Privacy
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Terms
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  Security
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            mt: 6, 
            pt: 4, 
            borderTop: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2
          }}>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              © 2024 FlashcardSaaS. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                Cookie Policy
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
