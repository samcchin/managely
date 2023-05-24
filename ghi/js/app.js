function createCard(name, description, pictureUrl) {
    return `
      <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        console.error('Something went wrong, got an error in the response!')
      } else {
        const data = await response.json();
        const conferenceRow = document.getElementById('conference-row');

        let columnCount = 0;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const html = createCard(title, description, pictureUrl);

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
      console.log(e)

    }

  });
