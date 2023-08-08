const searchResult = document.getElementById("search-result");
const dynamicBasicInfo = document.getElementById("dynamic-basic-info");
const dynamicResultInfo = document.getElementById("dynamic-result-info");
const searchErrorMessage = document.querySelector(".search-error-message");
const mainResulSheets = document.getElementById("main-result-sheet");
const loaderImage = document.querySelector(".loader-image");

searchResult.onsubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const oldData = getDatals("students");
    const finddata = oldData.find((item) => item.roll === data.roll && item.reg === data.reg);
    loaderImage.classList.remove("d-none");
   

setTimeout(()=>{
    if (finddata) {

    


        // result info
        // single subject marks show
        dynamicResultInfo.querySelector(".bn-marks").innerHTML = finddata.result.ban;
        dynamicResultInfo.querySelector(".en-marks").innerHTML = finddata.result.eng;
        dynamicResultInfo.querySelector(".ma-marks").innerHTML = finddata.result.mat;
        dynamicResultInfo.querySelector(".sc-marks").innerHTML = finddata.result.sci;
        dynamicResultInfo.querySelector(".ch-marks").innerHTML = finddata.result.che;
        dynamicResultInfo.querySelector(".ph-marks").innerHTML = finddata.result.phy;
        dynamicResultInfo.querySelector(".re-marks").innerHTML = finddata.result.rel;

        
        // single subject  grade show
        dynamicResultInfo.querySelector(".bn-grade").innerHTML = resultFuntion(finddata.result.ban).grade ;
        dynamicResultInfo.querySelector(".en-grade").innerHTML = resultFuntion(finddata.result.eng).grade ;
        dynamicResultInfo.querySelector(".ma-grade").innerHTML = resultFuntion(finddata.result.mat).grade ;
        dynamicResultInfo.querySelector(".sc-grade").innerHTML = resultFuntion(finddata.result.sci).grade ;
        dynamicResultInfo.querySelector(".ch-grade").innerHTML = resultFuntion(finddata.result.che).grade ;
        dynamicResultInfo.querySelector(".ph-grade").innerHTML = resultFuntion(finddata.result.phy).grade ;
        dynamicResultInfo.querySelector(".re-grade").innerHTML = resultFuntion(finddata.result.rel).grade ;
    
        
        // single subject gpa show
        dynamicResultInfo.querySelector(".bn-gpa").innerHTML = resultFuntion(finddata.result.ban).gpa ;
        dynamicResultInfo.querySelector(".en-gpa").innerHTML = resultFuntion(finddata.result.eng).gpa ;
        dynamicResultInfo.querySelector(".ma-gpa").innerHTML = resultFuntion(finddata.result.mat).gpa ;
        dynamicResultInfo.querySelector(".sc-gpa").innerHTML = resultFuntion(finddata.result.sci).gpa ;
        dynamicResultInfo.querySelector(".ch-gpa").innerHTML = resultFuntion(finddata.result.che).gpa ;
        dynamicResultInfo.querySelector(".ph-gpa").innerHTML = resultFuntion(finddata.result.phy).gpa ;
        dynamicResultInfo.querySelector(".re-gpa").innerHTML = resultFuntion(finddata.result.rel).gpa ;
        // total gpa and grade
        dynamicResultInfo.querySelector(".total-gpa").innerHTML = cgPa(finddata.roll, finddata.reg);
        dynamicResultInfo.querySelector(".total-grade").innerHTML = averageGrade();

    
        // basic info
        dynamicBasicInfo.querySelector(".st-name").innerHTML = finddata.name;
        dynamicBasicInfo.querySelector(".st-roll").innerHTML = finddata.roll;
        dynamicBasicInfo.querySelector(".st-reg").innerHTML = finddata.reg;
        dynamicBasicInfo.querySelector(".st-passed").innerHTML = passedFailed(finddata.roll, finddata.reg);
        dynamicBasicInfo.querySelector(".st-cgpa").innerHTML = averageGrade();
        dynamicBasicInfo.querySelector("img").setAttribute ("src", finddata.url);
        

        mainResulSheets.classList.remove("d-none");
        searchErrorMessage.innerHTML = alertMessage("Your Result is Published", "success");

       

    }else{
        searchErrorMessage.innerHTML = alertMessage("Please input correct Roll and Reg", "danger");
    }
    loaderImage.classList.add("d-none");
   
    e.target.reset();
}, 2000)
   
}


const create = document.querySelector(".create");
create.onclick = () => {
    window.location.href = "/admin.html";
}