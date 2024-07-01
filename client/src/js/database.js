import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { // content is a string that will be stored in the database
  const jateDb = await openDB('jate', 1); // open the database with the name 'jate' and version 1 to store the content
  const tx = jateDb.transaction('jate', 'readwrite'); // create a transaction with the object store 'jate' and readwrite permissions
  const store = tx.objectStore('jate'); // get the object store 'jate' from the transaction
  const request = store.put({id: 1, value: content}); // put the content in the object store with the key 1 and the value of the content
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value) // log the content that was stored in the database if it was successful
    : console.log('Data not found in the database'); // log that the content was not stored in the database if it was not successful

  return result && result.value; // return the content that was stored in the database if it was successful
};

// logic for a method that gets all the content from the database
export const getDb = async () => { // get all the content from the database and return it
  console.log('GET from the database'); // log that the database is being accessed to get the content
  const jateDb = await openDB('jate', 1); // open the database with the name 'jate' and version 1 to get the content
  const tx = jateDb.transaction('jate', 'readonly'); // create a transaction with the object store 'jate' and readonly permissions to get the content
  const store = tx.objectStore('jate'); // get the object store 'jate' from the transaction to get the content
  const request = store.get(1); // get the content from the object store with the key 1 and store it in a request
  const result = await request; // wait for the request to be completed and store the result in a variable to be returned
  result
    ? console.log('Data retrieved from the database', result.value) // log the content that was retrieved from the database if it was successful
    : console.log('Data not found in the database'); // log that the content was not retrieved from the database if it was not successful

  return result && result.value; // return the content that was retrieved from the database if it was successful
};

initdb(); // initialize the database when the file is loaded
