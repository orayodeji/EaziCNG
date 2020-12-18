module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice|| 0;

    this.add = function(item, id){
        let storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 1, price:0};
        }
        //storedItem.qty++;
        storedItem.price = Number(storedItem.item.price.replace(/[^0-9.-]+/g,"")) * storedItem.qty;
        this.totalQty++;
        this.totalPrice += Number(storedItem.item.price.replace(/[^0-9.-]+/g,""));
        
    }

    this.remove = function(id){
       // let storedItem = this.items[id];

       delete this.items[id];
      //  if(storedItem){
        //    delete storedItem
       // }
          //storedItem.qty++;
        //  storedItem.price = Number(storedItem.item.price.replace(/[^0-9.-]+/g,"")) * storedItem.qty;
          this.totalQty--;
       //   this.totalPrice += Number(storedItem.item.price.replace(/[^0-9.-]+/g,""));
    }


    this.generateArray = function(){
        let arr = [];
        for(var id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    };
};

