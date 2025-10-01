// Abstraction Class
class LibraryItem {
    #title; // private
    #id;    // private

    constructor(title, id){
        if (new.target === LibraryItem){
            throw new Error("Cannot instantiate abstract class");
        }
        this.#title = title;
        this.#id = id;
    }

    // Getter / Setter
    getTitle(){
        return this.#title;
    }

    setTitle(newTitle){
        if(newTitle.trim() !== ""){
            this.#title = newTitle;
        }
    }

    getId(){
        return this.#id;
    }

    // Abstract method
    getInfo(){
        throw new Error("getInfo() must be implemented");
    }
}

// Encapsulation + Inheritance
class Book extends LibraryItem {
    #author;

    constructor(title, id, author) {
        super(title, id);
        this.#author = author;
    }

    getAuthor(){
        return this.#author;
    }

    setAuthor(newAuthor){
        this.#author = newAuthor;
    }

    // Polymorphism (override)
    getInfo() {
        return `Book : ${this.getTitle()}, ผู้แต่ง : ${this.#author}`;
    }
}

class DVD extends LibraryItem {
    #duration;

    constructor(title, id, duration){
        super(title, id);
        this.#duration = duration;
    }

    getDuration(){
        return this.#duration;
    }

    setDuration(min){
        if(min > 0) this.#duration = min;
    }

    // Polymorphism (override)
    getInfo() {
        return `DVD : ${this.getTitle()}, ระยะเวลา : ${this.#duration} นาที`;
    }
}

//Class User
class User {
    #name;
    #borrowedItem;

    constructor(name) {
        this.#name = name;
        this.#borrowedItem = [];
    }

    getName(){
        return this.#name;
    }

    getBorrowedItems(){
        return [this.#borrowedItem];
    }

    borrow(item){
        this.#borrowedItem.push(item);

        const borrowList = document.querySelector(".borrow-list");
        const li = document.createElement("li");
        li.textContent = `${this.#name} ได้ยืม : ${item.getTitle()} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "ลบ";
        deleteBtn.addEventListener("click", ()=>{
            li.remove();
            this.#borrowedItem = this.#borrowedItem.filter(i => i.getId() !== item.getId());
        });

        li.appendChild(deleteBtn);
        borrowList.appendChild(li);
    }

    confirmBorrow(){
        if(this.#borrowedItem.length === 0){
            alert("No items borrowed!");
            return;
        }

        let items = this.#borrowedItem.map(i => i.getTitle()).join(" | ");
        alert(`${this.#name} ยืนยันการยืม : ${items}`);
    }

    // Polymorphism
    getRole(){
        return "Generic User";
    }
}

// Inheritance
class Student extends User {
    getRole(){
        return "Student";
    }
}

class Teacher extends User {
    getRole(){
        return "Teacher";
    }
}

// create items
const book1 = new Book("OOP Book", 1, "Mon lnwza");
const book2 = new Book("JS Book", 2, "Ball lnwza");
const dvd1 = new DVD("สอน OOP", 3, 220);
const dvd2 = new DVD("สอน JS", 3, 112);

// Array items
const items = [book1, book2, dvd1, dvd2];

const student = new Student("Mon");
const teacher = new Teacher("Ball");

const list = document.querySelector(".list-items");

items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.getInfo();
    
    const borrowBtn = document.createElement("button");
    borrowBtn.textContent = "ยืม";
    borrowBtn.addEventListener("click", ()=>{
        student.borrow(item);
    });

    
    li.appendChild(borrowBtn);
    list.appendChild(li);
});

const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", ()=>{
    student.confirmBorrow();
});