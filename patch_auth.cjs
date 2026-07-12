const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const anchor = 'const [users, setUsers] = useState<UserAccount[]>([]);';
const patch = `
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        setIsFirebaseSyncing(true);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.customOppositions) setCustomOppositions(data.customOppositions);
            if (data.officialExams) setOfficialExams(data.officialExams);
            if (data.deletedOppositions) setDeletedOppositions(data.deletedOppositions);
          }
        } catch (error) {
          console.error("Error fetching from Firebase", error);
        } finally {
          setIsFirebaseSyncing(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFirebaseLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Firebase Login Error", error);
      alert("Error al iniciar sesión con Google");
    }
  };

  const handleFirebaseLogout = async () => {
    try {
      await signOut(auth);
      // Optional: Clear local data on logout if you want
    } catch (error) {
      console.error("Firebase Logout Error", error);
    }
  };

  const syncToFirebase = async () => {
    if (!firebaseUser) return;
    setIsFirebaseSyncing(true);
    try {
      await setDoc(doc(db, "users", firebaseUser.uid), {
        email: firebaseUser.email,
        customOppositions,
        officialExams,
        deletedOppositions,
        lastSync: new Date().toISOString()
      }, { merge: true });
      alert("Progreso guardado en la nube correctamente.");
    } catch (error) {
      console.error("Firebase Sync Error", error);
      alert("Error al sincronizar con la nube.");
    } finally {
      setIsFirebaseSyncing(false);
    }
  };

  const [users, setUsers] = useState<UserAccount[]>([]);
`;

const replaced = content.replace(anchor, patch);
fs.writeFileSync('src/App.tsx', replaced);
console.log('Patched App.tsx with auth state');
