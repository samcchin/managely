window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conference/';

    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        console.log(data)
        const selectTag = document.getElementById('conference');
        for (let conference of data.conferences){
            const option = document.createElement('option');
            option.value = conference.id;
            option.innerHTML = conference.name;
            selectTag.appendChild(option)
        }

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        conferenceUrl = ''
    })
    }
})
