const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]



const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener('click',() =>{
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');  
});


/**-Filters------- */
// 
const courseList = document.querySelector('#course-list');
const allBtn = document.querySelector('#all-courses');
const wddBtn = document.querySelector('#wdd-courses');
const cseBtn = document.querySelector('#cse-courses');
const totalCreditsSpan = document.querySelector('#total-credits');

// Funtion to render courses on page 
function renderCourses(filteredCourses) {
    // 
    courseList.innerHTML = '';

    // Iterar filter and create html
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        // use template
        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseCard.classList.add('course-card');
        
        // 
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseList.appendChild(courseCard);
    });

    
    updateTotalCredits(filteredCourses);
}

// Funtion to calc and show total credits
function updateTotalCredits(filteredCourses) {
    //
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// 
function setActiveButton(activeButton) {
    const buttons = [allBtn, wddBtn, cseBtn];
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

// 
allBtn.addEventListener('click', () => {
    renderCourses(courses);
    setActiveButton(allBtn);
});

wddBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
    setActiveButton(wddBtn);
});

cseBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
    setActiveButton(cseBtn);
});

// Renderizar todos los cursos al cargar la página
window.addEventListener('load', () => {
    renderCourses(courses);
    setActiveButton(allBtn);
});
