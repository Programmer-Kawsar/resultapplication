

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
  const pattern = /^[0-9]{1,3}$/;
  if (pattern.test(num)) {
    const integerValue = parseInt(num, 10);
    return integerValue >= 0 && integerValue <= 100;
  }

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

// CGPA funtion start


let returnGpa;
let cgPa = (roll, reg) => {
  const getData = getDatals("students"); // Assuming getDatals is a valid function that retrieves student data.
  const perCgpaData = getData.find((item) => item.roll === roll && item.reg === reg);

  const studentData = {
  result: {
    ban: perCgpaData.result.ban,
    eng: perCgpaData.result.eng,
    mat: perCgpaData.result.mat,
    sci: perCgpaData.result.sci,
    che: perCgpaData.result.sci,
    phy: perCgpaData.result.phy,
    rel: perCgpaData.result.rel,
  }
};
  const subjects = ['ban', 'eng', 'mat', 'sci', 'che', 'phy', 'rel'];
  let totalGPA = 0;

  for (const subject of subjects) {
    totalGPA += resultFuntion(studentData.result[subject]).gpa;
  }

  const averageGPA = totalGPA / subjects.length;
   returnGpa =  averageGPA.toFixed(2); 
  
  return returnGpa;

};

const averageGrade = () => {
  if (returnGpa >= 1 && returnGpa < 2) {
    return "D";
  } else if (returnGpa >= 2 && returnGpa < 3) {
    return "C";
  } else if (returnGpa >= 3 && returnGpa < 3.5) {
    return "B";
  } else if (returnGpa >= 3.5 && returnGpa < 4) {
    return "A-";
  } else if (returnGpa >= 4 && returnGpa < 5) {
    return "A";
  } else if (returnGpa === "5.00") {
    return "A+"; // Comparing with a string since toFixed returns a string
  } else {
    return "F";
  }
}
// CGPA funtion end

// result funtion start
const passedFailed = (roll, reg) => {
  const getData = getDatals("students"); // Assuming getDatals is a function that fetches data
  const PerData = getData.find((item) => item.roll === roll && item.reg === reg);

  if (
    PerData.result.ban >= 33 &&
    PerData.result.eng >= 33 &&
    PerData.result.mat >= 33 &&
    PerData.result.sci >= 33 &&
    PerData.result.che >= 33 &&
    PerData.result.phy >= 33 &&
    PerData.result.rel >= 33
  ) {
    return `<h4 style="color: green; font-size: 16px; font-weight: bold">Passed</h4>`;
  } else {
    return `<h4 style="color: red; font-size: 16px; font-weight: bold">Failed</h4>`;
  }
};

// result funtion end





// index.html funtion end



