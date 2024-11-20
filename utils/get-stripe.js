import { loadStripe } from "@stripe/stripe-js";


let stripePromise

const getStripe = () =>{
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KE)
    }

    return stripePromise
}

export default getStripe