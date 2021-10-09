import { useContext, createContext, useState, useEffect } from 'react'
import { firestore, auth } from '../firebase'
import { v4 } from 'uuid';
import firebase from "firebase/app";

const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); //holds info about current user
    const [loading, setLoading] = useState(true)

    async function signUp(email, password, meta) {
        try {
            const createUserRef = await auth.createUserWithEmailAndPassword(email, password);
            // Get user UID and make doctor profile
            const userUid = createUserRef?.user?.uid;
            const createDoctorProfileRef = await firestore.collection("doctors").doc(userUid).set(meta);
        } catch(e) {
            console.log(e);
            alert(e);
        }

    }

    async function createInvite() {
        // Creates inviteId using UUID library
        var inviteId = v4();
        inviteId = inviteId.toString().replaceAll("-", "");
        // Sets expiration date
        var inviteExpiry = new Date(Date.now() + (3600 * 1000 * 24)); // 24 hours 
        const firestoreInvExp = firebase.firestore.Timestamp.fromDate(inviteExpiry);
        try {
            const doctorId = currentUser.uid;

            await firestore.collection("invites").doc(inviteId).set({
                doctorId: doctorId,
                validUntil: firestoreInvExp
            });

        } catch (e) {
            console.log(e);
            alert(e);
        }
        return inviteId;
    }

    async function pullAlerts() {
        const tempData = [];
        const patientCollection = await firestore.collection("patients")
        const alerts = patientCollection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                patientCollection.doc(doc.id).collection("notificationHistory").get().then((querySnapshot) => {
                    querySnapshot.forEach((notif) => {
                        var alertDate = new Date(notif.data().notificationTime.seconds * 1000);
                        alertDate = alertDate.toString();
                        tempData.push(
                            {
                                alert: notif.data().notificationTitle,
                                givenName: doc.data().givenName,
                                surName: doc.data().familyName,
                                id: doc.id,
                                time: alertDate.substring(0, 15) + " at " + alertDate.substring(16, 21) + " Hours"
                            });

                    });
                });
            });
        });
        return tempData;
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function updateDisplayName(displayName) {
        return currentUser.updateProfile({displayName});
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function sendPasswordResetEmail(email) {
        return auth.sendPasswordResetEmail(email);
    }

    const value = {
        currentUser,
        signUp,
        createInvite,
        pullAlerts,
        login,
        logout,
        updateDisplayName,
        updatePassword,
        sendPasswordResetEmail
    }

    useEffect(()=>{
        // Callback that will automatically setUser when user state changes (e.g. user logs in)
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            // Firebase will automatically search through
            // localStorage to see if you have the right tokens
            // to automatically login.
            // Do not render sign up form while this async process is occurring
            setLoading(false);
        })

        return unsubscribe;  // auth.onAuthStateChanged(...) returns an unsubscribe method
    },[]);

    return (
        <AuthContext.Provider  value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
