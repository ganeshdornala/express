const express = require('express');

const app = express();

//get,post,put,delete

app.use(express.json());

let courses = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'Python' }
]

app.get("/", (req, res) => {
    res.send("Hello from get method");
});//read data
app.get('/about', (req, res) => {
    res.send('We create Impact');
});
app.get('/contact', (req, res) => {
    res.send('Contact me on "ganeshdornala2003@gmail.com"');
});



const port = process.env.PORT || 3000

app.get('/courses',(req,res)=>{
    res.send(courses);
});

//postman

app.post('/courses',(req,res)=>{
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})//create

//put method for updating
app.put('/courses/:coursename', (req, res) => {
    let course = courses.find(course => course.name === req.params.coursename);
    if (!course) return res.status(404).send("The course you are looking for does not exist");
    course.name = req.body.name;
    res.send(course);
});

app.delete('/courses/:coursename',(req,res)=>{
    let updatedcourses=courses.filter(course=>course.name!==req.params.coursename);
    courses=updatedcourses;
    res.send(courses);
});

app.delete('/courses/:id',(req,res)=>{
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("The course you are looking for does not exist");
    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(courses);
});


//Route parameters

app.get('/courses/:id', (req, res) => {
    console.log(req.params);
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course)
        res.status(404).send("The course you are looking for does not exist");
    res.send(course);
});

app.listen(port, () => console.log(`port is running on ${port}`));