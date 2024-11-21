import { SignIn } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
            return <Container maxWidth="100vw" >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{
                            flexGrow: 1,
                        }}>
                            Flashcard SaaS
                        </Typography>
                        <Button color="inherit">
                            <Link href = "/sign-in" passHref>Log in</Link>
                        </Button>
                        <Button color="inherit">
                            <Link href = "/sign-up" passHref>Sign Up</Link>
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent ="center" 
                    //sx={{ mt: 2}}
                >
                <Typography variant="h4" gutterBottom > Sign In </Typography>
                <SignIn />
                </Box>
            </Container>
}