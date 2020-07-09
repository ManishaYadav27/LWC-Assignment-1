import { LightningElement , track , api} from 'lwc';
import getAccounts from '@salesforce/apex/getAccountData.getAccounts';
export default class Assignment1 extends LightningElement {
  accountData;
  filterCopy;
  accName;
  queryLimit;
  filterKey;
 
    handleAccountName(event) {
        this.accName = event.target.value;
        
    }
    handleQueryLimit(event) {
        this.queryLimit = event.target.value;
        
    }
    handleFilterData(event){
        this.filterKey=event.target.value;
    }
    searchAccounts(){
    console.log('test');
    console.log('Name-' + this.accName);
    console.log('limit-' + this.queryLimit);
    getAccounts({accName : this.accName,queryLimit : this.queryLimit})
    .then(result => {  
        this.accountData = result;
        this.filterCopy=[...result];
        console.log(this.accountData);
    })
    .catch(error => {
        this.accountData = undefined;
        console.log(error);
        window.console.log('error =====> '+JSON.stringify(error));
        if(error) {
            this.errorMsg = error;
        }
    }) 

}
filterAccounts(){
    this.filterCopy = this.accountData.filter( value => {return value.Name.includes(this.filterKey);})
    console.log(" filtered data :- "+this.filterCopy.length);
}

}