var Init = function () {
   var cardList = document.querySelector('.cards-list');

   var makeElement = function (tagName, text, className) {
      var element = document.createElement(tagName);
      if (className) {
         element.classList.add(className);
      }
      if (text) {
         element.textContent = text;
      }
      return element;
   }

   var createCard = function (CardItem) {
      var cardUsers = makeElement('div', null, 'card');
      cardList.appendChild(cardUsers);

      if (CardItem.image){
         let image = new Image();
         image.src = CardItem.image;
         cardUsers.appendChild(image);   
      }

      var nameCard = makeElement('h2', CardItem.name + ' ' + CardItem.surname);
      cardUsers.appendChild(nameCard);

      var bithdayCard = makeElement('p', CardItem.bithday);
      cardUsers.appendChild(bithdayCard);
      
      var editButton = makeElement('button', null, 'edit_button');
      editButton.onclick = editCard;
      cardUsers.appendChild(editButton);

      var deleteButton = makeElement('button', null, 'delete_button');
      deleteButton.onclick = deleteCard;
      cardUsers.appendChild(deleteButton);

      var idLabel = makeElement('label', CardItem.id, 'id_label');
      cardUsers.appendChild(idLabel);
   }

   var editCard = function (event) {      
      let id = getBirthdayId(event.target.parentElement);
      location.href = 'edit.html?id=' + id;
   }

   var deleteCard = function (event) {
      let cardElement = event.target.parentElement;
      let id = getBirthdayId(cardElement);
      BirthdayService.deleteBirthday(id);
      cardElement.parentElement.removeChild(cardElement);
   }

   var getBirthdayId = function (cardElement) {
      return cardElement.getElementsByClassName('id_label')[0].innerText;
   }

   var abc = BirthdayService.getBirthdays();
   for (var i = 0; i < abc.length; i++) {
      var CardItem = abc[i];
      createCard(CardItem);
   }

   const form = document.getElementById('form');
}