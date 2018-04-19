const data = require('./data.json')

const formats = {
    input(item) {
        return   item.key  + ":" + "\'" + item.value + "\'";
    },
    checkbox(item) {
      
            return  item.key  + ":" + item.value
    },
    modelCheckBox(item) {
        const options =[];
        item.selectedList.map(i=>{
            options.push( i.argument)
           console.log(options)
        })
        return item.key + ":" + "\["+options+"\]"
    },
    radio(item) {
        var key = []
        var key1,key2;
        var value = []
        var value1, value2;
        item.options.map(i=>{
            key.push(i.key)
            value.push(i.value)
            key1 = key[0];
            key2 = key[1];
            value1 = value[0];
            value2 = value[1];
        })
        if (item.value == value1) {
            return  key1  + ":" + value1
        } else {
            return  key2  + ":" + value1
        }

    },
    inputUrl(item) {
            return item.key + ":" +  "\["+item.whitelist+"\]"
    },
    select() {
        var value = [];
        for(var i =0;i<this.options.length;i++){
                value.push(this.options[i].value)
        }
        if(this.value == 1){
            return "network" + ":" +"\""+ "internal" +"\""+ "," +"save_config_item" + ":" +"\'"+ "['URL','network']"+"\'"; 
        }else{
          return  "network" + ":" +"\'" +"\'"
        }   
    },
    file(){
        if(this.size == 50){
            return ""
        }
    }
}
const d = data.data.map(function (item) {
    return Object.assign({}, item,{ formatFunc: formats[item.type] })
})
console.log(d)
//export default d;
module.exports = d;