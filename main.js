const centerArea = document.getElementById('centerarea');
const outerCenter = document.getElementById('outercenter');
const closeButton = document.getElementById('closebutton');

function importHtmlToArea(htmlFile, idToImportTo) {
  fetch(htmlFile)
    .then(response => response.text())
    .then(data => {
        document.getElementById(idToImportTo).innerHTML = data
    })
    .catch(error => console.error('Error loading content:', error))
}
function unloadHtmlFromArea(idToUnloadFrom) {
  idToUnloadFrom.innerHTML = ""
}

function transformOrbitButton(button,angle,offset) {
    var unit = 'cqh'
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowWidth<windowHeight) {
        unit = 'cqw'
    } else {
        unit = 'cqh'
    }
    button.style.transform = `rotate(${angle}deg) translateY(${offset}${unit})`
}

function createOrbitButton(text,angle,offset,where) {
    let newButton = document.createElement('button')
    newButton.classList.add("floatbutton","custombutton")
    newButton.innerText = text
    transformOrbitButton(newButton,angle,offset)
    where.appendChild(newButton)
    window.addEventListener('resize', function() {
        transformOrbitButton(newButton,angle,offset)
    });
    return newButton;
}

function orbitButtonClicked(htmlFile,idToImportTo) {
    importHtmlToArea(htmlFile,idToImportTo)
    var lastVisibiliy = centerArea.style.visibility
    centerArea.style.visibility = "visible"
    if (lastVisibiliy == "visible") {
        centerArea.classList.add("centeranimplink")
        centerArea.addEventListener('animationend', () => {
            centerArea.classList.remove("centeranimplink")
        }, { once: true });
    }
    centerArea.classList.add("centeranimin")
    centerArea.addEventListener('animationend', () => {
        centerArea.classList.remove("centeranimin")
    }, { once: true });
}


createOrbitButton("Test",0,-47,outerCenter).addEventListener('click', function() {
    orbitButtonClicked("test.html","textimport")
});

closeButton.addEventListener('click', function() {
    centerArea.classList.remove("centeranimin","centeranimplink")
    centerArea.classList.add("centeranimout")
    centerArea.addEventListener('animationend', () => {
        centerArea.classList.remove("centeranimout")
        centerArea.style.visibility = "hidden"
        unloadHtmlFromArea("textimport")
    }, { once: true });
});