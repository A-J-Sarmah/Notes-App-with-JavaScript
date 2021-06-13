
const btn = document.getElementById('submit-btn')
const txtArea = document.getElementById('add-txt')
const txtTitle = document.getElementById('add-head')
const arr = []
const titleArray = []
if(localStorage.length>0){
    for(let i=0; i<localStorage.length; i++){
        titleArray.push(localStorage.key(i))
        arr.push(localStorage.getItem(titleArray[i]))
    }
}
displayNote()


btn.addEventListener('click', function(){
    let mainTxt = txtArea.value
    arr.push(mainTxt)
    txtArea.value = ""
    let title = txtTitle.value
    titleArray.push(title)
    txtTitle.value = ""
    for(let i=0; i<titleArray.length; i++){
        localStorage.setItem(titleArray[i], arr[i])
    }
    displayNote()
})


function displayNote(){
    const display = document.getElementById('display-card')
    for(let i=0; i<arr.length; i++){
        if(i>=display.childElementCount ){
            let titleElement = titleArray[i]
            let element = localStorage[titleElement]
            if(element === "" && titleElement === ""){
                display.innerHTML += `<div class="notecard" id="card${i}"><h1 class="display-head">Error</h1>
                <p class="dis-p">please fill the title and notes block</p>
                <button class="del-btn" id="${i}" onclick="deleteNote(this.id)">Remove</button></div>`
            }
            else if(element === ""){
                display.innerHTML += `<div class="notecard" id="card${i}"><h1 class="display-head">Error in ${titleElement}</h1>
                <p class="dis-p">please fill the notes box</p>
                <button class="del-btn" id="${i}" onclick="deleteNote(this.id)">Remove</button></div>`
            }
            else if(titleElement===""){
                display.innerHTML += `<div class="notecard" id="card${i}"><h1 class="display-head">Error</h1>
                <p class="dis-p">Error in ${element} , please fill title box</p>
                <button class="del-btn" id="${i}" onclick="deleteNote(this.id)">Remove</button></div>`
            }
            else{
                display.innerHTML += `<div class="notecard" id="card${i}"><h1 class="display-head">${titleElement}</h1>
                <p class="dis-p">${element}</p>
                <button class="del-btn" id="${i}" onclick="deleteNote(this.id)">Remove</button></div>`
            }
        }
        else{
            continue
        }
    }
}

function deleteNote(id){
    const element = document.getElementById(`card${id}`)
    localStorage.removeItem(titleArray[id])
    arr.splice(id,1)
    titleArray.splice(id,1)
    // element.style.display = 'none'
    element.innerHTML = null
    element.parentElement.removeChild(element)
}

const searchTxt = document.getElementById('search')
searchTxt.addEventListener('input', function(){
    let keyword = searchTxt.value
    for(let i=0; i<arr.length; i++){
        let element = document.getElementById(`card${i}`)
        if(arr[i].includes(keyword) || titleArray[i].includes(keyword)){
            element.style.display = 'block'
        }
        else{
            element.style.display = 'none'
        }
    }
})

