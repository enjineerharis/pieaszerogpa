const courses = [
    { name: "Mathematical Modeling", credits: 3 },
    { name: "Applied Mathematics", credits: 2 },
    { name: "Elementary Mathematics", credits: 3 },
    { name: "Departmental Course", credits: 3 },
    { name: "Introduction to Nuclear Science & Technology", credits: 3 },
    { name: "Computer Fundamentals", credits: 4 }
];

const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.67,
    "B+": 3.33,
    "B": 3.0,
    "B-": 2.67,
    "C+": 2.33,
    "C": 2.0,
    "D": 1.0,
    "F": 0.0
};

const marksRanges = [
    { label: "≥ 85", gp: 4.0 },
    { label: "80 – 84", gp: 4.0 },
    { label: "75 – 79", gp: 3.67 },
    { label: "70 – 74", gp: 3.33 },
    { label: "65 – 69", gp: 3.0 },
    { label: "60 – 64", gp: 2.67 },
    { label: "55 – 59", gp: 2.33 },
    { label: "50 – 54", gp: 2.0 },
    { label: "45 – 49", gp: 1.0 },
    { label: "< 45", gp: 0.0 }
];

const coursesDiv = document.getElementById("courses");

function renderCourses() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    coursesDiv.innerHTML = "";

    courses.forEach((course, index) => {
        const div = document.createElement("div");
        div.className = "course";

        let options = "";

        if (mode === "grade") {
            for (let grade in gradePoints) {
                options += `<option value="${gradePoints[grade]}">${grade}</option>`;
            }
        } else {
            marksRanges.forEach(range => {
                options += `<option value="${range.gp}">${range.label}</option>`;
            });
        }

        div.innerHTML = `
            <label>${course.name} (${course.credits} CH)</label>
            <select data-credits="${course.credits}">
                ${options}
            </select>
        `;

        coursesDiv.appendChild(div);
    });
}

document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener("change", renderCourses);
});

renderCourses();

function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    document.querySelectorAll("select").forEach(select => {
        const gp = parseFloat(select.value);
        const credits = parseInt(select.dataset.credits);
        totalPoints += gp * credits;
        totalCredits += credits;
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById("result").innerText =
        `🎓 Expected GPA: ${gpa.toFixed(2)}`;
}
