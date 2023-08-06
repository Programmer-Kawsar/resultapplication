
const createStudentForm = document.getElementById("new-student");
const showAlert = document.querySelector(".add-student-message");
const studentView = document.getElementById("student-table-view");



// front-end student view funtions start
const showAllstudent = ()=>{
 const students = getDatals("students");
 let content = "";
if (students.length >0) {
students.reverse().map((student, index)=>{
let indexFormated = index >= 9 ? `${index+1}`: `0${index+1}`


content +=`
<tr class="align-middle">
                      <td> ${indexFormated} </td>
                      <td>
                        <img
                          style="
                            width: 60px;
                            height: 60px;
                            border:4px solid #fff;
                            border-radius: 50%;
                            object-fit: cover;
                          "
                          src="${student.url}"
                          alt=""
                        />
                      </td>
                      <td>${student.name}</td>
                      <td>${student.roll}</td>
                      <td>${student.reg}</td>
                      <td>${timeAgo(student.createdAt)}</td>
                      <td>
                      ${student.result === null ? `<button onclick= "addResult('${student.id}')" data-bs-toggle="modal" data-bs-target="#add-student-result" class="btn btn-success add-result-btn ">Add Result</button>`: ` <button onclick= "resultView('${student.id}')" data-bs-toggle="modal" data-bs-target="#result-view-student" 
                      class="btn btn-info view-result-btn ">View Marks</button>`}
                      </td>
                      <td>

                       <button onclick="singleStudent('${student.id}')"  data-bs-target="#single-view-student"
                       data-bs-toggle="modal" class=" py-1 px-2 border-0 bg-success text-white rounded-circle" >
                       <i class="fa fa-eye"></i>
                       </button>

                        <button onclick="singleEditDataStudent('${student.id}')" class="  border-0 mx-2 bg-warning py-1 px-2 text-white rounded-circle" data-bs-toggle="modal" data-bs-target="#edit-single-student"><i class="fa fa-edit"></i></button>


                        <button onclick="deleteStudent('${student.id}')" class=" border-0 bg-danger py-1 px-2 text-white rounded-circle"><i  class="fa fa-trash " ></i></button>

                      </td>
                    </tr>`
 });
} else{
    content= `<tr>
    <td colspan="8"><h5>No student found</h5></td>
    </tr>`    
}
 studentView.innerHTML = content;
};
showAllstudent();
// front-end student view funtions end

// show single view student funtions start
const singleStudent =(id)=>{
const studentOldData =  getDatals("students");
const SingleView = studentOldData.find((data)=> data.id == id);

singleStudentModal.innerHTML = `
<div class="d-flex justify-content-around align-items-center">
              <img
                style="
                  width: 140px;
                  height: 140px;
                  object-fit: cover;
                  max-width: 100%;
                "
                src="${SingleView.url}"
                alt=""
              />
              <div>
               <table class="table table-striped table-bordered align-middle single-modal-table">
               <tr><td><h6><strong>Name: ${SingleView.name}</strong></h6></td></tr>
               <tr><td><h6>Roll: ${SingleView.roll}</h6></td></tr>
               <tr><td><h6>Reg: ${SingleView.reg}</h6></td></tr>
               <tr><td><h6>Result: GPA 5</h6></td></tr>
               </table>
              </div>
            </div>
`
}
// show single view student funtions end

// delete single data funtion start
const deleteStudent= (id)=>{

   const conf = confirm("Are your sure you want to delete this data?");
   if (conf) {
    const oldData = getDatals("students");
    const updateData = oldData.filter((data) => data.id !== id);
    sendDatals("students", updateData);
    showAllstudent();
   }else{
    alert("your data safe")
   }

}
// delete single data funtion end

// form and set,get ls data funtion start
createStudentForm.onsubmit=(e)=>{
e.preventDefault();
const form_data = new FormData(e.target);
const data = Object.fromEntries(form_data.entries())

if (!data.name || !data.reg || !data.roll) {
    showAlert.innerHTML= alertMessage("All fields are required", "warning");
}else if (!isNumber(data.roll)) {
    showAlert.innerHTML=  alertMessage("Please input maximum 6 digit roll number", "warning");
} else if (!isNumber(data.reg)) {
    showAlert.innerHTML=  alertMessage("Please input maximum 6 digit reg number", "warning");
} else{
  const oldData =  getDatals("students");
  // roll and reg
  const rollvalidation= oldData.some((item)=> item.roll === data.roll);
  const regvalidation= oldData.some((item)=> item.reg === data.reg);
  if (rollvalidation) {
    showAlert.innerHTML=  alertMessage("Roll no already exists, Please try another Roll no", "warning");
  } else if(regvalidation){
    showAlert.innerHTML=  alertMessage("Reg no already exists, Please try another Reg no", "warning");
  } else{

    const oldstudent =  getDatals("students");
    oldstudent.push({
        ...data,
        result: null,
        createdAt: Date.now(),
        id: generateID(24)
    });
   
    sendDatals("students", oldstudent);
    showAlert.innerHTML=  alertMessage(`<strong>${data.name} </strong>has been added successfully`, "success");
    e.target.reset()
};
}
showAllstudent();
}
// form and set,get ls data funtion end

// edit single sutdent data funtion start
const singleStudentModal= document.getElementById("single-student-modal");
const editStudentData= document.getElementById("edit-student-data");
const editMessage= document.querySelector(".edit-message");

const singleEditDataStudent= (id)=>{
  const oldData = getDatals("students");
  const editdata = oldData.find((data)=> data.id === id);
  editStudentData.querySelector("input[name='name']").value = editdata.name;
  editStudentData.querySelector("input[name='roll']").value = editdata.roll;
  editStudentData.querySelector("input[name='reg']").value = editdata.reg;
  editStudentData.querySelector("input[name='url']").value = editdata.url;
  editStudentData.querySelector("input[name='id']").value = editdata.id;
  editStudentData.querySelector("img").setAttribute("src", editdata.url);

  //single student form submit funtion
    editStudentData.onsubmit=(e)=>{
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())
  if (!data.name || !data.reg || !data.roll) {
    editMessage.innerHTML= alertMessage("All fields are required", "warning");
  } else if (!isNumber(data.roll)) {
    editMessage.innerHTML=  alertMessage("Please input maximum 6 digit roll number", "warning");
  } else if (!isNumber(data.reg)) {
    editMessage.innerHTML=  alertMessage("Please input maximum 6 digit reg number", "warning");
  }else{
    const oldstudent =  getDatals("students");
    const findIndexdata = oldData.findIndex((data)=>data.id === id);

    if (findIndexdata !== -1) {
        const isRollNumberTaken = oldData.some((student) => student.roll === data.roll && student.id !== id);
        const isRegNumberTaken = oldData.some((student) => student.reg === data.reg && student.id !== id);
        if (isRollNumberTaken) {
          editMessage.innerHTML = alertMessage(
            "Roll number already exists, Please try another Roll number",
            "warning"
          );
        } else if (isRegNumberTaken) {
          editMessage.innerHTML = alertMessage(
            "Reg number already exists, Please try another Reg number",
            "warning"
          );
        } else {
          oldData[findIndexdata] = { ...oldData[findIndexdata] , ...data};
          sendDatals("students", oldData);
          showAllstudent();
          editMessage.innerHTML = alertMessage(
           ` <strong>${oldData[findIndexdata].name}</strong> has been update data successfully`,
            "success"
          );
      }    
    }
  }
  }
 }
// edit single sutdent data funtion end 


// add result funtion start
const addResultForm = document.getElementById("add-result-form");
const addResultimg = document.querySelector(".add-result-img");
const addresultMessage = document.querySelector(".add-result-message");
const addResult = (id) => {
  const oldData = getDatals("students");
  const singleStudent = oldData.find((item) => item.id === id);
  addResultimg.setAttribute("src", singleStudent.url);
  addResultForm.querySelector("input[name='id']").value = singleStudent.id;
  const addResultbtn = document.querySelector(".add-result-btn");
  const viewResultbtn = document.querySelector(".view-result-btn");
   addResultForm.onsubmit = (e) => {
          e.preventDefault();
          const form_data = new FormData(e.target);
          const data = Object.fromEntries(form_data.entries());
          if (!data.ban || !data.eng || !data.mat || !data.sci || !data.che || !data.phy || !data.rel
            ) {
        addresultMessage.innerHTML= alertMessage("All fields are required", "warning");
       }else if (!isresult(data.ban) || !isresult(data.eng) || !isresult(data.mat) || !isresult(data.sci) || !isresult(data.che) || !isresult(data.phy) ||  !isresult(data.rel)) {
          addresultMessage.innerHTML=  alertMessage("Please input maximum 2 digit result number", "warning");
         } else if (singleStudent) {
          singleStudent.result = data;
          sendDatals("students", oldData);
           addresultMessage.innerHTML = alertMessage(`<strong>${singleStudent.name}</strong> has been add result successfully`, "success");  
           showAllstudent();        
          e.target.reset();
      }
    }
   
  }  

// add result funtion end



// Result View funtion start



const singleResulshowModal = document.getElementById("single-result-show-modal");
const singleForm = document.getElementById("single-form");
const resultUpdatemessage = document.querySelector(".result-update-message");
const resultView = (id)=>{
const oldData=getDatals("students");
const findData = oldData.find((data)=> data.id === id);

singleResulshowModal.querySelector("img").setAttribute("src", findData.url);
singleResulshowModal.querySelector("#st-name").innerHTML = findData.name; 
singleResulshowModal.querySelector("#st-roll").innerHTML = findData.roll; 
singleResulshowModal.querySelector("#st-reg").innerHTML = findData.reg; 
singleResulshowModal.querySelector("input[name='id']").value = findData.id; 
singleResulshowModal.querySelector("input[name='ban']").value = findData.result.ban; 
singleResulshowModal.querySelector("input[name='eng']").value = findData.result.eng; 
singleResulshowModal.querySelector("input[name='mat']").value = findData.result.mat; 
singleResulshowModal.querySelector("input[name='sci']").value = findData.result.sci; 
singleResulshowModal.querySelector("input[name='che']").value = findData.result.che; 
singleResulshowModal.querySelector("input[name='phy']").value = findData.result.phy; 
singleResulshowModal.querySelector("input[name='rel']").value = findData.result.rel; 

singleForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
 if (!data.ban || !data.eng || !data.mat || !data.sci || !data.che || !data.phy || !data.rel) {
  alert("all fields are required");
 } else if ( !isresult(data.ban) || !isresult(data.eng) || !isresult(data.mat) || !isresult(data.sci) || !isresult(data.che) || !isresult(data.phy) ||  !isresult(data.rel)) {
  resultUpdatemessage.innerHTML= alertMessage("Please input maximum 2 digit result number", "warning");
 } else{
  const oldData = getDatals("students");
  const findIndexdata = oldData.findIndex((item) => item.id === id); // Corrected to data.id
  oldData[findIndexdata].result = {
    ...data,
    ban: data.ban,
    eng: data.eng,
    mat: data.mat,
    sci: data.sci,
    che: data.che,
    phy: data.phy,
    rel: data.rel,
  };
  sendDatals("students", oldData);
  showAllstudent();
  resultUpdatemessage.innerHTML = alertMessage(
    `<strong>${oldData[findIndexdata].name}</strong> has been update result successfully`, "success"
  );
 }
  
};
};
// Result View funtion end

