//not using anymore
export class ListPage{
    constructor(lists){
        this.lists = lists;
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