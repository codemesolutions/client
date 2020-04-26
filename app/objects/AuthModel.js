import Fetchable from "../library/Fetchable";

export default
class AuthModel{

    constructor(){
        this.fetchable = new Fetchable("http://codemeserver/api/user");
    }

    async isAuthorized(token){
        return this.fetchable.post("/authorized", {token:token});
    }

    async authorize(attempt){
        return this.fetchable.post("/login", attempt);
    }
}