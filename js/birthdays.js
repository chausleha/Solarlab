var BirthdayService = function (){
    var getBirthdays = function () {
        return JSON.parse(localStorage.getItem('birthdays')) || [];
    }

    var getBirthdayById = function (id) {
        let birthdays = getBirthdays();
        birthdays.find(b => b.id === id);
    }

    var saveBirthdays = function (array) {        
      localStorage.setItem('birthdays', JSON.stringify(array));
    }

    var deleteBirthday  = function (id) {
        let birthdays = getBirthdays();
        let birthday = birthdays.find(b => b.id == id);        
        if (birthday){
            const index = birthdays.indexOf(birthday);
            if (index > -1) {
                birthdays.splice(index, 1);
                saveBirthdays(birthdays);
            }
        }
    }
   



    return {
        getBirthdays: getBirthdays,
        getBirthdayById: getBirthdayById,
        saveBirthdays: saveBirthdays,
        deleteBirthday: deleteBirthday
    };

}();



