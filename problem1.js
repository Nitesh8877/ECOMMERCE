const customSort = (order, inp) => {
    const numberObj = {};
    const resArr = [];
	for(let i=0;i<order.length;i++){
		if(numberObj[order[i]]){
			numberObj[order[i]]=i;
		}else{
			numberObj[order[i]]=i;
		}
	}
	for(let j=0;j<inp.length;j++){
	for(const i of Object.keys(numberObj)){
		
			if(inp[j]==i){
				resArr.push(i);
			}
		}
	}
 	// use process.stdout.write("hello") to print the output
  	 //implement your  logic here - you dont have to return anything, print the output here
    return resArr
}

// const order = readline();

// const arr = readline();
let order=[8,3,9,7,1,5,6,3,8,9,0];
let arr=[2,3,5,6,4,8,1,7,9,0];
console.log(customSort(order, arr));