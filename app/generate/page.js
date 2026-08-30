'use client';
import { useUser } from '@clerk/nextjs';
import { db } from '../../firebase';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    TextField,
    CardContent,
    Dialog,
    Card,
    CardActionArea,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    CircularProgress,
    LinearProgress,
    Snackbar,
    Alert,
    Stack
} from '@mui/material';
import { writeBatch, doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
    const router = useRouter();

    const handleSubmit = async () => {
        if (!text.trim()) {
            setSnack({ open: true, message: 'Please enter some text first.', severity: 'warning' });
            return;
        }
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            });
            if (!response.ok) throw new Error('Failed to generate flashcards');
            const data = await response.json();
            setFlashcards(data);
            setSnack({ open: true, message: 'Flashcards generated!', severity: 'success' });
        } catch (error) {
            console.error('Error generating flashcards:', error);
            setSnack({ open: true, message: 'Generation failed. Please try again.', severity: 'error' });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const saveFlashcards = async () => {
        if (!name.trim()) {
            setSnack({ open: true, message: 'Enter a collection name.', severity: 'warning' });
            return;
        }
        if (!user) {
            setSnack({ open: true, message: 'You must be signed in.', severity: 'error' });
            return;
        }
        try {
            const batch = writeBatch(db);
            const userDocRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                if (collections.find((f) => f.name === name)) {
                    setSnack({ open: true, message: 'Name already exists.', severity: 'warning' });
                    return;
                } else {
                    collections.push({ name, id: name });
                    batch.set(userDocRef, { flashcards: collections }, { merge: true });
                }
            } else {
                batch.set(userDocRef, { flashcards: [{ name, id: name }] });
            }
            const colRef = collection(userDocRef, name);
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef);
                batch.set(cardDocRef, flashcard);
            });
            await batch.commit();
            setSnack({ open: true, message: 'Saved successfully!', severity: 'success' });
            handleClose();
            router.push('/flashcards');
        } catch (e) {
            console.error(e);
            setSnack({ open: true, message: 'Save failed.', severity: 'error' });
        }
    };

    if (!isLoaded) return <Box sx={{ p: 6 }}>Loading...</Box>;
    if (!isSignedIn) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography>Please sign in to generate flashcards.</Typography></Box>;

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg,#f5f7fa 0%,#e4ecf7 40%,#dfe9f3 100%)',
            py: { xs: 6, md: 10 },
        }}>
            <Container maxWidth="lg">
                {/* Hero / Input Panel */}
                <Paper elevation={4} sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 4,
                    maxWidth: 1000,
                    mx: 'auto',
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(255,255,255,0.9)'
                }}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                Generate Flashcards
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 680 }}>
                                Paste any topic or text block below and let FlashcardSaaS create a study‑ready set in seconds.
                            </Typography>
                        </Box>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste or type your content here..."
                            fullWidth
                            multiline
                            minRows={8}
                            variant="outlined"
                            InputProps={{
                                sx: {
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    fontFamily: 'inherit'
                                }
                            }}
                        />
                        {isGenerating && <LinearProgress />}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={isGenerating}
                                size="large"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2
                                }}
                            >
                                {isGenerating ? 'Generating...' : 'Generate Flashcards'}
                            </Button>
                            {flashcards.length > 0 && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    onClick={() => { setFlashcards([]); setFlipped([]); }}
                                    sx={{ textTransform: 'none', fontWeight: 500, borderRadius: 2 }}
                                >
                                    Clear
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Paper>

                {/* Generated Flashcards */}
                {flashcards.length > 0 && (
                    <Box sx={{ mt: 8 }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 3 }} spacing={2}>
                            <Typography variant="h4" fontWeight={600}>Preview</Typography>
                            <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}>
                                Save Collection
                            </Button>
                        </Stack>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card elevation={3} sx={{
                                        borderRadius: 3,
                                        height: 260,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }
                                    }}>
                                        <CardActionArea sx={{ height: '100%' }} onClick={() => handleCardClick(index)}>
                                            <CardContent sx={{ p: 0, height: '100%' }}>
                                                <Box sx={{
                                                    perspective: '1000px',
                                                    height: '100%',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '100%',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        inset: 0,
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2.5,
                                                        boxSizing: 'border-box',
                                                        textAlign: 'center',
                                                        fontSize: '0.95rem'
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                        backgroundColor: 'grey.100'
                                                    }
                                                }}>
                                                    <div>
                                                        <div>
                                                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                                                {flashcard.front}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                (tap to flip)
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                                                {flashcard.back}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                (tap to flip)
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>

            {/* Save Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Give your new collection a descriptive name so you can find it later.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Collection Name'
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards} variant='contained'>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snack.open}
                autoHideDuration={3000}
                onClose={() => setSnack({ ...snack, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snack.severity} variant='filled' sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
