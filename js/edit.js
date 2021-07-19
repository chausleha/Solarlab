var Init = function () {
   const form = document.getElementById('form');
      
   var array = BirthdayService.getBirthdays();

   const queryString = window.location.search;
   let selectedBirthday = null;
   if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      selectedBirthday = array.find(birthday => birthday.id == id);

      document.getElementById("name").value = selectedBirthday.name;
      document.getElementById("surname").value = selectedBirthday.surname;
      document.getElementById("bithday").value = selectedBirthday.birthday;
   }
   
   let imgData = null;
   const photoElement = document.getElementById("photo");
   photoElement.addEventListener("change", handleFiles, false);

   function handleFiles() {
     const fileList = this.files;
     if (!fileList || fileList.length == 0){
        imgData = null;
        return;
     }
          
     let file = fileList[0];
     var fileReader = new FileReader();
     fileReader.onload = function () {
       imgData = fileReader.result;
     };
     fileReader.readAsDataURL(file);
   }

   form.addEventListener('submit', () => {
      let name = document.getElementById("name").value;
      let surname = document.getElementById("surname").value;
      let birthday = document.getElementById("bithday").value;
      
   
      if (!selectedBirthday){
         let id = array.length > 0 ? array[array.length - 1].id + 1 : 1;
         var usersValue = {
            id: id,
            name: name,
            surname: surname,
            bithday: birthday,
            image: imgData
         };

         array.push(usersValue);
      } else {
         selectedBirthday.name = name;
         selectedBirthday.surname = surname;
         selectedBirthday.bithday = birthday;
         selectedBirthday.image = imgData;
      }
      
      BirthdayService.saveBirthdays(array);
   });
};