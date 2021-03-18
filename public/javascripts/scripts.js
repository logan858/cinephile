let roles = document.querySelectorAll(".role")
let names = document.querySelectorAll(".names")
let flex = document.querySelector(".flex")
let allFilms = document.querySelectorAll(".films")

for(let i = 0; i < roles.length; i++) {
    roles[i].addEventListener("click", function() {
    turnOff()
    setTimeout(() => {
    if(roles[i].id === "director") {
        for (j of names) {
            if(j.classList.contains("dname")) {
                j.style.display = "block";
                flex.style.opacity = "1"
            }
        }
    } else if(roles[i].id === "editor") {
        for (j of names) {
            if(j.classList.contains("ename")) {
                j.style.display = "block";
                flex.style.opacity = "1"
            }
        }
    } else if(roles[i].id === "cinematographer") {
        for (j of names) {
            if(j.classList.contains("cname")) {
                j.style.display = "block"
                flex.style.opacity = "1"
            }
        }
    } else if(roles[i].id === "writer") {
        for (j of names) {
            if(j.classList.contains("wname")) {
                j.style.display = "block";
                flex.style.opacity = "1"
            }
        }
        
    } else if(roles[i].id === "composer") {
        for (j of names) {
            if(j.classList.contains("coname")) {
                j.style.display = "block";
                flex.style.opacity = "1"
            }
        }
    }
}, 800)}
)}

function turnOff() {
    flex.style.opacity = "0"
    setTimeout(displayOff, 700)
}
function displayOff() {
    for(iter of names) {
        iter.style.display = "none"
    }
}

function turnOffFilms(x) {
    x.style.opacity = "0"
}

for(let i of names) {
    i.addEventListener("click", function(event) {
        let target = event.target.nextElementSibling
        if(target !== null && target.classList.contains("films")) {
            let styles = getComputedStyle(target).display
            if(styles === "none") {
                target.style.display = "block"
                setTimeout(function() {
                    target.style.opacity = "1"
                }, 100)        
            } else {
                target.style.opacity = "0"
                setTimeout(function() {
                    target.style.display = "none"
                }, 500)
            }
        }
})}

for(let i of allFilms) {
    i.addEventListener("click", function(event) {
        let filmDetails = document.getElementById("film-details")
        let target = event.target.nextElementSibling.nextElementSibling.innerHTML;
        let modifiedTarget = target.replace(/'|{|}|/g, "")
        let newSplit = modifiedTarget.split(",\n")
        for(j = 0; j< newSplit.length; j++) {
            newSplit[j] = newSplit[j].split(":")
        }

        if(filmDetails.style.opacity == "1") {
            filmDetails.style.opacity = "0"
            setTimeout(function() {
                filmDetails.style.opacity = "1"
                let firstBox = document.querySelector(".film-details-box-one")
                let secondBox = document.querySelector(".film-details-box-two")
                let thirdBox = document.querySelector(".film-details-box-three")
                let fourthBox = document.querySelector(".film-details-box-four")
                firstBox.innerHTML = newSplit[1][1]
                secondBox.innerHTML = "Title: " + newSplit[1][1] + 
                                    "<br>Release Date: " + newSplit[2][1] +
                                    "<br>Runtime: " + newSplit[3][1] +
                                    "<br>Directing: " + newSplit[5][1] +
                                    "<br>Editing: " + newSplit[6][1] +
                                    "<br>Cinematography: " + newSplit[7][1] +
                                    "<br>Writing: " + newSplit[8][1] +
                                    "<br>Composer: " + newSplit[9][1];
                thirdBox.innerHTML = "<img src='https://image.tmdb.org/t/p/w185" + newSplit[10][1].replace(" ", "") + "'>";
                fourthBox.innerHTML = newSplit[4][1]
            }, 500)
        } else {
        filmDetails.style.opacity = "1"
        let firstBox = document.querySelector(".film-details-box-one")
        let secondBox = document.querySelector(".film-details-box-two")
        let thirdBox = document.querySelector(".film-details-box-three")
        let fourthBox = document.querySelector(".film-details-box-four")
        
        firstBox.innerHTML = newSplit[1][1]
        secondBox.innerHTML = "Title: " + newSplit[1][1] + 
                            "<br>Release Date: " + newSplit[2][1] +
                            "<br>Runtime: " + newSplit[3][1] +
                            "<br>Directing: " + newSplit[5][1] +
                            "<br>Editing: " + newSplit[6][1] +
                            "<br>Cinematography: " + newSplit[7][1] +
                            "<br>Writing: " + newSplit[8][1] +
                            "<br>Composer: " + newSplit[9][1];
        thirdBox.innerHTML = "<img src='https://image.tmdb.org/t/p/w185" + newSplit[10][1].replace(" ", "") + "'>";
        fourthBox.innerHTML = newSplit[4][1]
        }
    })
}