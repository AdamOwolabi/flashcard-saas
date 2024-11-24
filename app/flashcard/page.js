'use client'

import { useUser } from "@clerk/nextjs"
import {use, useEffect, useState} from 'react'
import { collection, CollectionReference, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {db} from '@firebase'
import {useSearchParams} from 'next/navigation'

export default function Flashcard(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])


    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if(!search || user) return
            const docRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(docRef)
            const flashcard = []

          docs.forEach((doc) => {
            flashcards.push({id: doc.id, ...doc.data()})
          })
          setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
      }))
    }

}