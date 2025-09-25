//ระบบจัดการห้องสมุด

class LibraryItem {
    constructor(title, id){
        // Abstract
        if (new.target === LibraryItem){
            throw new Error("Cannot is instantiate abstract class")
        }

        // property
        this.title = title;
        this.id = id;
    }

    // Abstract method (ต้อง override)
    getInfo(){
        throw new Error("getInfo() must be implemented");
    }
}

// Encapsulation + Inheritance
class Book extends LibraryItem {
    constructor(title, id, author) {
        super(title, id);
        this.author = author;
    }

    // Polymorphism (override)
    getInfo() {
        return `Book : ${this.title}, ผู้แต่ง : ${this.author}`;
    }
}

class DVD extends LibraryItem {
    constructor(title, id, duration){
        super(title, id);
        this.duration = duration;
    }

    // Polymorphism (override)
    getInfo() {
        return `DVD : ${this.title}, ระยะเวลา : ${this.duration} นาที`;
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.borrowedItem = [];
    }

    borrow(item){
        this.borrowedItem.push(item);

        const borrowList = document.querySelector(".borrow-list");
        const li = document.createElement("li");
        li.textContent = `${this.name} ได้ยืม : ${item.title} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "ลบ";
        deleteBtn.addEventListener("click", ()=>{
            li.remove();
            this.borrowedItem = this.borrowedItem.filter(i => i.id !== item.id);
        });

        li.appendChild(deleteBtn);
        borrowList.appendChild(li);
    }

    confirmBorrow(){
        if(this.borrowedItem.length === 0){
            alert("No items borrowed!");
            return;
        }

        let items = this.borrowedItem.map(i => i.title).join(" | ");
        alert(`${this.name} ยืนยันการยืม : ${items}`);
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
