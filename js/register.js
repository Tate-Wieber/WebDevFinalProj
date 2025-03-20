
function toggleStudent()
{
    let strRole = document.getElementById("selRole").value
    let strStudentfield = document.getElementById("studentField")

    if (strRole === "student")
    {
        strStudentfield.classList.remove("d-none")
    }
    else
    {
        strStudentfield.classList.add("d-none")
    }
}