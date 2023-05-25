function createCard(name, description, pictureUrl, starts, ends,location) {
    const startDate = new Date(starts).toLocaleDateString();
    const endDate = new Date(ends).toLocaleDateString();

    return `
      <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">${startDate}-${endDate}</div>
      </div>
    `;
  }


function createAlert(){
    return `
    <div class="alert alert-danger" role="alert">
    Something went wrong, got an error in the response!
    </div>`
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const alertHtml = createAlert();
        const conferenceRow = document.getElementById('conference-row');
        conferenceRow.innerHTML = alertHtml;
      }
      else {
        const data = await response.json();
        const conferenceRow = document.getElementById('conference-row');

        let columnCount = 0;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const location = details.conference.location.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = details.conference.starts;
            const ends = details.conference.ends;
            const html = createCard(title, description, pictureUrl,starts,ends,location);

            if (columnCount % 3 === 0) {
                const row = document.createElement('div');
                row.classList.add('row', 'mb-3');
                conferenceRow.appendChild(row);
              }
            // Create column and append card to it
            const column = document.createElement('div');
            column.classList.add('col');
            column.innerHTML = html;

            // Append column to the current row
            const currentRow = conferenceRow.lastElementChild;
            currentRow.appendChild(column);

            columnCount++;
          }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
      const alertHtml = createAlert();
      const conferenceRow = document.getElementById('conference-row');
      conferenceRow.innerHTML = alertHtml;

    }

  });


