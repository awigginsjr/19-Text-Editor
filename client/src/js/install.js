const butInstall = document.getElementById("buttonInstall"); // get the install button element by its id

// Add an event listener to listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => { // listen for the beforeinstallprompt event
    window.deferredPrompt = event; // store the event in the deferredPrompt variable
    butInstall.classList.toggle('hidden', false); // remove the hidden class from the install button
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => { // listen for a click event on the install button
  const promptEvent = window.deferredPrompt; // get the deferredPrompt variable

  if (!promptEvent) { // check if the promptEvent is not null
   return; // return if the promptEvent is null
  }

  promptEvent.prompt(); // prompt the user to install the app
  window.deferredPrompt = null; // set the deferredPrompt variable to null
  butInstall.classList.toggle('hidden', true); // add the hidden class to the install button
});

// Add an event listener to listen for the appinstalled event
window.addEventListener('appinstalled', (event) => { // listen for the appinstalled event
  window.deferredPrompt = null; // set the deferredPrompt variable to null
  console.log('App was installed', event); // log that the app was installed
}); 