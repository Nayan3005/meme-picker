import { catsData } from "./data.js"

const emotionRadiosEl = document.getElementById('emotion-radios')
emotionRadiosEl.addEventListener('change', highlightCheckedOption)
const getImageBtn = document.getElementById('get-image-btn')
getImageBtn.addEventListener('click', renderCat)
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }    
        })
        return matchingCatsArray
    }  
}

function getSingleCatObject(){
    
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){
        return catsArray[0]
    }else{
        let randomNumber = Math.floor(Math.random())*catsArray.length
        return catsArray[randomNumber]
    }
}

function renderCat(){
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}

function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    let emotionText = ""
    for(let emotion of emotions){
        emotionText+=
        `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input 
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>
        `
    }
    emotionRadiosEl.innerHTML = emotionText
}

renderEmotionsRadios(catsData)


