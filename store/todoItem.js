
export default class TodoItem {
    constructor(text,createDate,completed, id, completedAt, index){
        this.text = text;
        this.createDate = createDate;
        this.completed = completed;
        this.id =id;
        this.completedAt = completedAt;
        this.index= index;
    }
    
}