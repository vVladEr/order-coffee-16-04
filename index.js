let count = 1;
let orderCounts = 1;

function createForm()
{
    orderCounts++;
    const orders = document.getElementsByTagName('fieldset');
    const form = orders[orders.length - 1];
    const newForm = document.createElement('fieldset');
    let text = form.innerHTML.replace(/milk(?:\d+)?/g, `milk${count}`);
    newForm.innerHTML = text;
    newForm.querySelector('.beverage-count').textContent = `Напиток №${++count}`;
    newForm.className = 'beverage';
    newForm.querySelector('.delete-button').addEventListener('click', (event) => deleteOrder(event));
    form.insertAdjacentElement("afterend", newForm);
}

function deleteOrder(event){
    if(orderCounts === 1){
        return;
    }
    event.target.parentElement.remove();
    orderCounts--;
}

function getWordForm(){
    const lastDigit = orderCounts % 10;
    if (orderCounts > 10 && orderCounts < 14)
    {
        return 'напитков';
    }
    if(lastDigit === 1)
    {
        return 'напиток';
    }
    if (lastDigit >= 2 && lastDigit <= 4){
        return 'напитка';
    }
    return 'напитков';
}



document.querySelector('.add-button').addEventListener('click', createForm);
document.querySelector('.delete-button').addEventListener('click', (event) => deleteOrder(event));
document.querySelector('.submit-button').addEventListener('click', (event)  =>{
    event.preventDefault();
    document.querySelector('.overlay').style.display = 'unset';
    const element = document.createElement('h3');
    element.textContent = `Вы заказали ${orderCounts} ${getWordForm()}`;
    document.querySelector('.lightbox').appendChild(element)

    let table = document.createElement('table');
    let head = table.createTHead();
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.textContent = 'Напиток';
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.textContent = 'Молоко';
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.textContent = 'Дополнительно';
    tr.appendChild(td3);
    head.appendChild(tr);
    document.querySelector('.lightbox').appendChild(table);
    let body = table.createTBody();
    let orders = document.querySelectorAll('.beverage');
    console.log(orders);
    orders.forEach((beverage) => {
        let selectedMilk = beverage.querySelector(`input[type="radio"]:checked`).nextElementSibling.textContent;
        if (selectedMilk === 'обычном молоке') {
            selectedMilk = 'обычное молоко';
        }
        if (selectedMilk === 'обезжиренном молоке') {
            selectedMilk = 'обезжиренное молоко';
        }
        if (selectedMilk === 'соевом молоке') {
            selectedMilk = 'соевое молоко';
        }
        if (selectedMilk === 'кокосовом молоке') {
            selectedMilk = 'кокосовое молоко';
        }
        let selectedOptions = [];
        beverage.querySelectorAll(`input[type="checkbox"]:checked`).forEach((option) => {
            let optionText = option.nextElementSibling.textContent;
            if (optionText === 'взбитых сливок') {
                optionText = 'взбитые сливки';
            }
            if (optionText === 'зефирок') {
                optionText = 'зефирки';
            }
            if (optionText === 'корицу') {
                optionText = 'корица';
            }
            selectedOptions.push(optionText);
        });
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = `${beverage.querySelector('select').selectedOptions[0].text}`;
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        td2.textContent = `${selectedMilk}`;
        tr.appendChild(td2);
        let td3 = document.createElement('td');
        td3.textContent = `${selectedOptions.join(', ')}`;
        tr.appendChild(td3);
        body.appendChild(tr);
    });
})
document.querySelector('.overlay-close-button').addEventListener('click', (event) =>{
    event.preventDefault();
    document.querySelector('.overlay').querySelector('h3').remove();
    document.querySelector('table').remove();
    document.querySelector('.overlay').style.display = 'none';
});