import Fetchable from "../library/Fetchable";

class Menu{

    constructor(){
        this.fetchable = new Fetchable("http://codemeserver/api/menu/");
    }

    async getByName(name){
        return this.fetchable.get("name/" + name);
    }
}

export default Menu;
