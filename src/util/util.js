export const sortData =(data) => {
    const sorteData = [...data];

     return sorteData.sort((a,b) => (a.cases > b.cases)? -1 : 1)    
};