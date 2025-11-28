// scores est une liste de deux listes (scores puis pseudos)

let scores=[[],[]];

function ajouterScore(score, pseudo){
    if (scores[0] == []) {
        scores[0].push(score);
        scores[1].push(pseudo);
    }
    else{
        trouve = false;
        l=scores[0].length;
        i=0;
        while (trouve == false & i<l) {
            if (scores[i]<score){
                scores[0].splice(i+1, 0, score);
                scores[1].splice(i+1, 0, pseudo);
                trouve = true
            }
        } 
        if (trouve == false){
            scores[0].push(score);
            scores[1].push(pseudo);
        }
    }
    updateTable();
}

function updateTable() {
        // Getting my element Table using it's ID
        const tableEl = document.querySelector('#tableScore');
        //remove everything from the table
        tableEl.innerHTML = '';

        scores[0].forEach(function (scorePseudo, index) {

            pseudo = scores[1][index];
            score = scorePseudo;


            // Creating a <tr> element, just like the CM n°3
            const tr = document.createElement('TR');pseudo
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
