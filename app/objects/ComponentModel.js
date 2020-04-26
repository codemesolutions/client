import Fetchable from "../library/Fetchable";

class ComponentModel{
    constructor(){
        this.fetchable = new Fetchable("http://codemeserver/api/component");
    }

    async save(siteObject){
        return this.fetchable.post("/create", siteObject);
    }

    async saveElement(siteObject){
        return this.fetchable.post("/create/element", siteObject);
    }

    async delete(id){
        return this.fetchable.post("/delete", {"id":id});
    }

    async deleteAll(excluded){
        return this.fetchable.post("/delete/all", {
            "excluded":excluded
        });
    }

    async update(siteObject){
        return this.fetchable.post("/update", siteObject);
    }

    async getById(id){
        return this.fetchable.get("/id/" + id);
    }

    async getAll(){
        if(page == null){
            return this.fetchable.get("/all");
        }
    }

    async getPage(page, show=10){
        return this.fetchable.get("/page?page=" + page + "&show="+show);
    }

    async search(term){
        return this.fetchable.get("/search/" + term);
    }
}

export default ComponentModel;

