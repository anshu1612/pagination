const buttonsDiv = document.getElementById("buttons");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nxtBtn");
const totalButtons = 10;
const buttonsPerPage = 4;
let currentStart = 1;

function renderButtons(){
    buttonsDiv.innerHTML = '';
    for(let i=currentStart;i<currentStart+buttonsPerPage;i++){
        const button = document.createElement('button');
        button.textContent=i;
        button.className='bg-indigo-600 text-white px-4 py-2 rounded-full';
        buttonsDiv.appendChild(button);
    }
}

next.addEventListener('click',()=>{
    if(currentStart+buttonsPerPage<=totalButtons){
        currentStart++;
    }
    renderButtons();
})

prev.addEventListener('click',()=>{
    if(currentStart>1){
        currentStart--;
    }
    renderButtons();
})
renderButtons();