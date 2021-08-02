const isIsraeliID = id => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
}) % 10 === 0;

const isEmail = function (email) {
    var checkEmail = /^\(?([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/;
    return checkEmail.test(email);
}

module.exports.validat = function (formValues) {
    if(!isEmail(formValues.email)){
        console.log('not valid email');
        return 'not valid email'
    }
    if(!isIsraeliID(formValues.id)){
        console.log('not valid id');
        return 'not valid id'
    }
    if(formValues.fullName.length<5){
        console.log('not valid name');
        return 'not valid fullName'
    }
    if(formValues.password.length<8){
        console.log('not valid password');
        return 'not valid password'
    }
    console.log('valid');
    return  'valid'
}