import { firebase } from "@react-native-firebase/database";

export const database = firebase
  .app()
  .database(
    "https://assignmentapp-1356f-default-rtdb.firebaseio.com/"
  );
