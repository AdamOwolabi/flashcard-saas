'use client'

import { useUser } from "@clerk/nextjs";
import {useEffect, usedState} from 'react'

import { collection, CollectionReference, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"
import {useRouter} from 'next/navigation'


export default function Flashcards() {
    comst [isLoaded, isSignedIn, user] = useUse()
    const [flashcardsx, setFlashcard, user] = useState([])


    useEffect(() => {
        async function getFlashcards() {
            if(!user) return
            const docRef = doc(collection(db, 'user'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collection = docSnap.data().Flashcards || []
              setFlashcards(collection)
            }else{
                await setDoc(docRef, {flashcards: []})
            }
        }
    }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        )
        }
    })

}