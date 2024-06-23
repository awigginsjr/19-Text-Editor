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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { // content to add to the database
  console.log('PUT to the database'); // log message to console
  const jateDB = await openDB('jate', 1); // open the jate database
  const tx = jateDB.transaction('jate', 'readwrite'); // create a transaction
  const store = tx.objectStore('jate'); // get the object store
  const request = await store.put({ id: 1, value: content }); // add the content to the object store
  const result = await request; // wait for the request to complete
  console.log('The date is now saved in the database', result.value); // log message to console
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { // get all content from the database
  console.log('GET from the database'); // log message to console
  const jateDB = await openDB('jate', 1); // open the jate database
  const tx = jateDB.transaction('jate', 'readonly'); // create a transaction
  const store = tx.objectStore('jate'); // get the object store
  const request = store.getAll(); // .getAll() the content from the object store
  const result = await request; // wait for the request to complete
  console.log('The content from the database is', result); // log message to console
  return result.value; // return the result
};

initdb(); // initialize the database when the module is loaded
