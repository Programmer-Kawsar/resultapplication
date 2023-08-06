

// create regular expression roll,ret funtion start
const isNumber = (num)=>{
  const pattern = /^[0-9]{6}$/;
  return pattern.test(num);
};
// create regular expression roll,reg funtion end

//create alert funtions start

const alertMessage = (text="this is alert", alertType="danger")=>{
  return `
  <div
  class="alert alert-${alertType} p-3 align-middle d-flex align-items-center justify-content-between"
>
  <p class="my-0">${text}</p>
  <button class="btn-close btn" data-bs-dismiss="alert"></button>
</div>`
};

//create alert funtions end

// setData LS funtions start
const sendDatals= (key, content)=>{
  localStorage.setItem(key, JSON.stringify(content));
};
// setData LS funtions end

//getdata LS funtion start
const getDatals = (keyname)=>{
if (localStorage.getItem(keyname)) {
    return JSON.parse(localStorage.getItem(keyname));
}
return [];
};

// getdata LS funtion end

// set time ago funtion start

function timeAgo(postTime) {
    const currentTime = Date.now();
    const timeDifference = currentTime - postTime;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return years === 1 ? "a year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "a month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "a day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds <= 5 ? "Just now" : `${seconds} seconds ago`;
    }
  }
// set time ago funtion end

// id generate funtion start

function generateID(idLength) {

  const array = new Uint8Array(idLength / 2);
  window.crypto.getRandomValues(array);
  const id = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return id;
}
// id generate funtion end

// result data number valid function start
const isresult = (num)=>{
  const pattern = /^[0-9]{2}$/;
  return pattern.test(num);
};
// result data number valid function end

// result funtion start
const resultFuntion = (mark)=>{
  let grade="";
  let gpa="";
if ( mark>0 && mark <= 32){
    grade="F";
    gpa=0.00;
 } else if ( mark>=33 && mark <= 39){
    grade="D";
    gpa=1.00;
} else if ( mark>=40 && mark <= 49){
    grade="C";
    gpa=2.00;
} else if ( mark>=50 && mark <= 59){
    grade="B";
    gpa=3.00;
} else if ( mark>=60 && mark <= 69){
    grade="A-";
    gpa=3.50;
} else if ( mark>=70 && mark <= 79){
    grade="A";
    gpa=4.00;
} else if ( mark>=80 && mark <= 100){
    grade="A+";
    gpa=5.00;
}else{
    grade="invalid grade";
    gpa="invalid gpa";
}
return {
    grade,
    gpa
}
}

// result funtion end


// index.html funtion start

// result funtion start
const passedFailed = (roll, reg) => {
  const getData = getDatals("students"); // Assuming getDatals is a function that fetches data
  const PerData = getData.find((item) => item.roll === roll && item.reg === reg); // Use reg instead of "reg" 
  if (PerData) {
   const totalMarks = parseInt(PerData.result.ban) + parseInt(PerData.result.eng) + parseInt(PerData.result.mat) + parseInt(PerData.result.sci) + parseInt(PerData.result.che) + parseInt(PerData.result.phy) + parseInt(PerData.result.rel)
  const finalResult = totalMarks / 7; // Assuming there are 7 subjects 
 
  if (finalResult >= 33) {
    return "Passed";
  } else {
    return "Failed";
  }
  }else{
    return "not found";
  }
  
};

// CGPA funtion start

const cgPa = (roll, reg) => {
  const getData = getDatals("students"); // Assuming getDatals is a valid function that retrieves student data.
  const perCgpaData = getData.find((item) => item.roll === roll && item.reg === reg);
  
  if (perCgpaData) {
    const totalMarks = parseInt(perCgpaData.result.ban) + parseInt(perCgpaData.result.eng) + parseInt(perCgpaData.result.mat) + parseInt(perCgpaData.result.sci) + parseInt(perCgpaData.result.che) + parseInt(perCgpaData.result.phy) + parseInt(perCgpaData.result.rel);
    const mark = totalMarks / 7;
    let grade = "";
    let gpa = "";
    
    if (mark > 0 && mark <= 32) {
      grade = "F";
      gpa = 0.00;
    } else if (mark >= 33 && mark <= 39) {
      grade = "D";
      gpa = 1.00;
    } else if (mark >= 40 && mark <= 49) {
      grade = "C";
      gpa = 2.00;
    } else if (mark >= 50 && mark <= 59) {
      grade = "B";
      gpa = 3.00;
    } else if (mark >= 60 && mark <= 69) {
      grade = "A-";
      gpa = 3.50;
    } else if (mark >= 70 && mark <= 79) {
      grade = "A";
      gpa = 4.00;
    } else if (mark >= 80 && mark <= 100) {
      grade = "A+";
      gpa = 5.00;
    } else {
      grade = "Invalid grade";
      gpa = "Invalid GPA";
    }
    
    return {
      grade,
      gpa
    };
  } else {
    return "CGPA not found";
  }
};

// CGPA funtion end




// result funtion end






// index.html funtion end