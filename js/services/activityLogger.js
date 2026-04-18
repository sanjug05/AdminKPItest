import { db } from '../config/firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export class ActivityLogger {
  constructor(userId, userEmail, userRole) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.userRole = userRole;
  }
  
  async log(action, entityType, entityId, details = {}) {
    try {
      await addDoc(collection(db, 'activityLogs'), {
        timestamp: serverTimestamp(),
        userId: this.userId,
        userEmail: this.userEmail,
        userRole: this.userRole,
        action: action, // CREATE, UPDATE, DELETE, LOGIN, EXPORT
        entityType: entityType, // SHOWROOM, DEALER, PHASE
        entityId: entityId,
        details: details,
        userAgent: navigator.userAgent
      });
    } catch(e) {
      console.error('Failed to log:', e);
    }
  }
}
