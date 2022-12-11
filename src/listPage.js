class listPage{
    constructor(userName){
        this.userName = userName;
        this.url = "/users/" + userName;
        this.result = this.makeRequest(this.url,GET);
        this.lists = result["lists"];
    }

    async makeRequest(url, method) {
        const response = await fetch(url, { method: method });
        const responsejson = await response.json();
        return responsejson;
    }

    render(){
        const artwork_lists = document.getElementById("art_list");
        for(let i = 0; i<this.lists.length;i++){
            const artwork = this.lists[i];
            const artwork_ele = document.createElement("div");
            const artwork_name = artwork["name"];
            const artwork_artworks = artwork["artworks"];
            const artwork_name_ele = document.createElement("h4");
            const artwork_artworks_ele = document.createElement("h5");
            artwork_name_ele.innerHTML = "Name: "+artwork_name;
            artwork_artworks_ele.innerHTML = "Artworks: "+artwork_artworks.toString();
            artwork_ele.appendChild(artwork_name_ele);
            artwork_ele.appendChild(artwork_artworks_ele);
            artwork_lists.appendChild(artwork_ele);
        }
    }
}