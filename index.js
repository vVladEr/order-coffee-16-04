let count = 1;
let orderCounts = 1;

function createForm()
{
    orderCounts++;
    const orders = document.getElementsByTagName('fieldset');
    const form = orders[orders.length - 1];
    const newForm = document.createElement('fieldset');
    newForm.innerHTML = form.innerHTML;
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
    let orders = document.querySelectorAll('fieldset');
    for(let order of orders)
    {
        let tr = document.createElement('tr');
        let td1 = 0;
    }
});
document.querySelector('.overlay-close-button').addEventListener('click', (event) =>{
    event.preventDefault();
    document.querySelector('.overlay').querySelector('h3').remove();
    document.querySelector('.overlay').style.display = 'none';
});