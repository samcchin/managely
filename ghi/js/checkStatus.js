// Get the cookie out of the cookie store
const payloadCookie = cookieStore.get('jwt_access_payload') // FINISH THIS
if (payloadCookie) {
    // The cookie value is a JSON-formatted string, so parse it
    const encodedPayload = JSON.parse(payloadCookie.value);

    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(encodedPayload)

    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload)

    // Print the payload
    console.log(payload);

    // Check if "events.add_conference" is in the permissions.
    // If it is, remove 'd-none' from the link
    if (      .includes('events.add_conference')){
        const conferenceNavTag = document.getElementById('nav-conference')
        conferenceNavTag.classList.remove('d-none')
    }

    if (   .includes('events.add_location')){
        const locationNavTag = document.getElementById('nav-location')
        locationNavTag.classList.remove('d-none')
    }
    // Check if "events.add_location" is in the permissions.
    // If it is, remove 'd-none' from the link

}
