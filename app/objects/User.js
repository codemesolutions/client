import Fetchable from "../library/Fetchable";

class User{

    constructor(){
        this.fetchable = new Fetchable("http://codemeserver/api/user");
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

    async getAll(){
        return this.fetchable.get("/all");

    }

    async getPage(page, show=10, sortBy=null, sortDirecton=null){
        if(sortBy !== null){
            return this.fetchable.get("/page?page=" + page + "&show="+show+"&sort="+sortBy+"&direction="+sortDirecton);
        }

        else{
            return this.fetchable.get("/page?page=" + page + "&show="+show+"&sort=users.created_at&direction=desc");
        }
        
    }

    async search(term){
        return this.fetchable.get("/search/" + term);
    }
}

export default User;
