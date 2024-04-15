import { Timestamp } from "firebase/firestore";


// * Helper function to format date
export const formatDate = (date: Timestamp | Date): string => {
    if (date instanceof Timestamp) {
        return new Date(date.seconds * 1000).toLocaleString();
    } else {
        return new Date(date).toLocaleString();
    }
}