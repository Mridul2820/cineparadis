import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListner = () => {
    const [user, setUser] = useState(null)

    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        const listner = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                
            } else {
                setUser(null);
            }
        });

        return () => listner();
    }, [firebase])

    return { user }
}

export default useAuthListner
