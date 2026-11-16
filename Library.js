console.log("hello")
class Book{
    static Bid=1
    constractor(BookName,Category )
    {
        this.Id=Book.Bid++
        this.BookName=BookName
        this.Category=Category
        this.Status=false

    }
     ReturnById(Id,arr) {

        let index=arr.findIndex(arr => Book.Id=Id)
        return arr[index]
    }
    Print(arr){
        console.log(arr.BookName)
    }
    AddBook(){
        let name = prompt("enter book name")
        let categor=prompt("enter a category")
        let s= prompt("enter true or false")
        while(s!=true || s!=false)
        {
        s= prompt("enter true or false")
        }
        let b1=new Book(name,categor,s)
        
        arr.push(b1)
    }
    Delete(Id,arr)
    {
        return arr.filter(x=>x!==Id)
    }
    Update(Id)
    {
        let b=new Book(this.AddBook(Id))
        b.BookName=prompt("update name")
        b.categor=prompt("update categor")
        if(b.Status==false)
            b.Status=true
        else
            b.Status=false
    }
}
