// this is for handling the search request and output to render the search page
class Search {
    constructor(author=null, name=null, tags=null, discription=null){
        this.author = author;
        this.tags = tags;
        this.name = name;
        this.discription = discription;
    }

    render(){
        name_ele = document.getElementById('')
        author_ele = document.getElementById("art_author");
        tag_ele = document.getElementById('art_tag');
        discription_ele = document.getElementById('detail');
        author_ele.innerHTML = this.author;
        tag_ele.innerHTML = this.tags;
        discription_ele = this.discription;
    }
}