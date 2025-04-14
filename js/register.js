
export function toggleStudent()
{
    let strRole = document.getElementById("selRole")
    let strStudentfield = document.getElementById("studentField")

    strRole.addEventListener("change", () => {
        const role = strRole.value;
        if (role === "student")
        {
            strStudentfield.classList.remove("d-none")
        }
        else
        {
            strStudentfield.classList.add("d-none")
        }
    })
}