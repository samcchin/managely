const payloadCookie = cookieStore.get('jwt_access_payload')
if (payloadCookie) {
    const encodedPayload = JSON.parse(payloadCookie.value);
    const decodedPayload = atob(encodedPayload)
    const payload = JSON.parse(decodedPayload)


    console.log(payload);

    if (payload.pemissions.includes('events.add_conference')){
        const conferenceNavTag = document.getElementById('nav-conference')
        conferenceNavTag.classList.remove('d-none')
    }

    if (payload.permissions.includes('events.add_location')){
        const locationNavTag = document.getElementById('nav-location')
        locationNavTag.classList.remove('d-none')
    }


}
