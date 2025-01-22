const add=(a,b)=>a+b;
const sub=(a,b)=>a-b;
const mul=(a,b)=>a*b;
const div=(a,b)=>a/b;


const display_array=(arr)=>{
    arr.map((element)=>{
        console.log(element);
    });
}

const print_even=(arr)=>{
    arr.filter((element)=>{
        if(element%2==0){
            console.log(element);
        }
    });
}

module.exports={add,sub,mul,div,display_array,print_even};