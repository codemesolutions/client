 export default class Validation{

    isValidString(str){
        str = str.replace(/\s/g, '');

        var exp  = /[\\\/\'\"\[\]\{\}\#\$\%\^\&\*\(\)-\+\=\|\:\;\"\\<\>\,\?\@\!]+/gm;
        if(exp.test(str) || str.length < 1 || str === ""){
            return false;
        }

        return true;
    }

    isEmail(str){
        var exp = /\S+\@\S+\.\S+/;
        return exp.test(str);
    }

    isNumber(number){
        if(tyeof(number) == 'int'){
            return true;
        }

        return false;
    }

    isGreaterThan(str, length){
        if(str > length){
            return true;
        }

        return false;
    }

    isLessThan(str, length){
        if(str < length){
            return true;
        }

        return false;
    }
}
