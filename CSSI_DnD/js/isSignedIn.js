import { displayName } from '../Firebase/initializeFirebase.js';

/// Return true if there is an user currently signed in, false otherwise
function isSignedIn() {
  return displayName != null;
}