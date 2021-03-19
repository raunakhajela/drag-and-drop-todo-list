console.log("succesfully linked");

//=================================================================
// below code is to add drag and drop in the website
//=================================================================
const draggables = document.querySelectorAll('.listItem');
// console.log(draggables);
const container = document.querySelector('.displayNotes')
    // console.log(container)
let positionObj = { offset: Number.NEGATIVE_INFINITY }

function distanceBetweenItemPositionAndDroppedPosition(item, droppedPosition) {
    const rect = item.getBoundingClientRect();
    return (droppedPosition - (rect.top + rect.height / 2));
}

draggables.forEach(item => {
    // console.log(item.childNodes[3].innerText);
    item.addEventListener('dragstart', (e) => {
        // console.log("dragstart event has been fired");
        e.target.classList.add('dragging');
    })
    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        // console.log("dragend event has been fired too");
    })
})

container.addEventListener('dragover', (e) => {
    e.preventDefault()
})
container.addEventListener('drop', (e) => {
        e.preventDefault();
        // console.log("items has been dropped")
        const newDraggables = Array.from(document.querySelectorAll('.listItem:not(.dragging'));
        positionObj = { offset: Number.NEGATIVE_INFINITY }
        newDraggables.forEach(item => {
            let offset = distanceBetweenItemPositionAndDroppedPosition(item, e.clientY);
            if (offset < 0 && offset > positionObj.offset) {
                positionObj.offset = offset;
                positionObj.element = item;
            }
        })
        const dragging = document.querySelector('.dragging');
        container.insertBefore(dragging, positionObj.element)
        console.log(positionObj.element);
    })
    //=================================================================
    // drag and drop code ends here
    //=================================================================

let noOfNotes = 5;
updateNoOfNodes(noOfNotes);
const checkBtn = Array.from(document.querySelectorAll('.checkBtn'));
checkBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.nextElementSibling.classList.toggle('active');
        e.target.classList.toggle('activeCheckBox');
    })
})

function updateNoOfNodes(noOfNotes) {
    const output = document.querySelector('.itemsLeft')
    output.innerHTML = noOfNotes + ` item(s) left`
}

function addNote(givenvalue) {
    let newElement = document.createElement('div');
    if (darkModeEnabled) {
        newElement.setAttribute("class", "listItem listItem-dark");
    } else {
        newElement.setAttribute("class", "listItem");
    }
    newElement.setAttribute("draggable", "true");
    newElement.innerHTML = `<div class="checkBtn">
    <img src="images/icon-check.svg" alt="">
</div>
<div class="noteOutput">` + givenvalue + `</div>`

    const container = document.querySelector('.displayNotes');
    container.appendChild(newElement);
    newElement.addEventListener('dragstart', (e) => {
        // console.log("dragstart event has been fired");
        e.target.classList.add('dragging');
    })
    newElement.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        // console.log("dragend event has been fired too");
    })
    newElement.childNodes[0].addEventListener('click', e => {
        e.target.nextElementSibling.classList.toggle('active');
        e.target.classList.toggle('activeCheckBox');
    })
    noOfNotes++;
    updateNoOfNodes(noOfNotes);
}
const input = document.querySelector('.inputForNewNote');
input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        console.log(input.value);
        addNote(input.value);
        input.value = ' ';
    }
})

const filterBtn = document.querySelector('.filterBtns');
Array.from(filterBtn.children).forEach(item => {
    item.addEventListener('click', (e) => {
        Array.from(filterBtn.children).forEach(elem => {
            elem.classList.remove('selected');
        })
        e.target.classList.add('selected');
    })
})
const All = document.querySelector('.All');
All.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.hide');
    hiddenItems.forEach(item => {
        item.classList.remove('hide');
    })
})

const Active = document.querySelector('.Active');
Active.addEventListener('click', () => {
    const hiddenActiveItems = document.querySelectorAll('.checkBtn:not(.activeCheckBox)');
    hiddenActiveItems.forEach(item => {
        if (item.parentElement.classList.contains('hide')) {
            item.parentElement.classList.remove('hide');
        }
    })
    const allActiveTodo = document.querySelectorAll('.activeCheckBox');
    allActiveTodo.forEach(item => {
        item.parentElement.classList.add('hide');
    })
})

const Completed = document.querySelector('.Completed');
Completed.addEventListener('click', () => {
    const hiddenCompletedItems = document.querySelectorAll('.checkBtn');
    hiddenCompletedItems.forEach(item => {
        if (item.parentElement.classList.contains('hide')) {
            item.parentElement.classList.remove('hide');
        }
    })
    const allCompletedTodo = document.querySelectorAll('.checkBtn:not(.activeCheckBox');
    allCompletedTodo.forEach(item => {
        item.parentElement.classList.add('hide');
    })
})

const clearCompleted = document.querySelector('.clear')
clearCompleted.addEventListener('click', (e) => {
    const completed = document.querySelectorAll('.activeCheckBox');
    completed.forEach(item => {
        console.log(item.parentElement.parentElement)
        item.parentElement.parentElement.removeChild(item.parentElement);
    })
})

// ==========adding functionality to the toggler button==============
let darkModeEnabled = false;
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', (e) => {
    if (darkModeEnabled) {
        darkModeEnabled = false;
    } else {
        darkModeEnabled = true;
    }
    if (e.target.children[0].src.match("images/icon-moon.svg")) {
        e.target.children[0].setAttribute("src", "images/icon-sun.svg")
    } else {
        e.target.children[0].setAttribute("src", "images/icon-moon.svg")
    }
    const body = document.querySelector('body');
    if (darkModeEnabled) {
        body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)"
    } else {
        body.style.backgroundImage = "url(images/bg-desktop-light.jpg)"
    }
    if (body.style.backgroundColor === "var(--DMVeryDarkBlue)") {
        body.style.backgroundColor = "var(--VeryLightGray)"
    } else {
        body.style.backgroundColor = "var(--DMVeryDarkBlue)"
    }
    const addNote = document.querySelector('.addNote');
    const actionBtn = document.querySelector('.actionBtns');
    console.log(actionBtn.classList)
    actionBtn.classList.toggle('actionBtns-dark')
    console.log(actionBtn.classList)
        // if(addNote.children[1].style.color)
    if (darkModeEnabled) {
        addNote.children[1].style.color = "white";
    } else {
        addNote.children[1].style.color = "black";
    }
    addNote.classList.toggle('addNote-dark')
    const displayNotes = document.querySelector('.displayNotes');
    displayNotes.classList.toggle('displayNotes-dark');
    const listitems = document.querySelectorAll('.listItem');
    listitems.forEach(item => {
        item.classList.toggle('listItem-dark')
        console.log(item.classList)
    })
    console.log(darkModeEnabled)
})