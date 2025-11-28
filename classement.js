let scores = [];

updateTable()

function updateTable() {
        // Getting my element Table using it's ID
        const tableEl = document.querySelector('#tableScore');
        //remove everything from the table
        tableEl.innerHTML = '';

        scores.forEach(function (scorePseudo) {

            pseudo = scorePseudo[0]
            score = scorePseudo[1]


            // Creating a <tr> element, just like the CM n°3
            const tr = document.createElement('TR');
            // Creating a <td> element, just like the CM n°3
            const td1 = document.createElement('TD');
            // Creating a <td> element, just like the CM n°3
            const td2 = document.createElement('TD');
            // Creating a <span> element, just like the CM n°3
            const span1 = document.createElement('span');
            // setting the span content with my number
            span1.innerHTML = pseudo;
            // Creating a <span> element, just like the CM n°3
            const span2 = document.createElement('span');
            // setting the span content with my number
            span2.innerHTML = score;

            // Here we go again, adding span to my td, button to my td, td to tr, and finally tr to table, yay!
            td1.appendChild(span1);
            tr.appendChild(td1);
            td2.appendChild(span2);
            tr.appendChild(td2);
            tableEl.appendChild(tr);
        });
    }