import Fetchable from "../library/Fetchable";

class ElementModel{
    constructor(){
        this.fetchable = new Fetchable("http://codemeserver/api/element");
    }

    async save(siteObject){
        return this.fetchable.post("/create", siteObject);
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

    async getChildrenById(id){
        return this.fetchable.get("/id/children" + id);
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

export default ElementModel;

