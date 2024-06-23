const butInstall = document.getElementById('buttonInstall'); // Get the install button

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => { // When the install prompt is ready
    window.deferredPrompt = event; // Save the event to use it later
    butInstall.classList.toggle('hidden', false); // Show the install button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => { // When the install button is clicked
    const promptEvent = window.deferredPrompt; // Get the saved event
    if (!promptEvent) {
        return; // If the event is not present, return
    }
    promptEvent.prompt(); // Show the install prompt
    window.deferredPrompt = null; // Reset the deferredPrompt
    butInstall.classList.toggle('hidden', true); // Hide the install button
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => { // When the app is installed
    window.deferredPrompt = null; // Reset the deferredPrompt
});
