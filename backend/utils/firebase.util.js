import initializeApp from 'firebase/app';
import getStorage from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE,
	appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default  storage ;
