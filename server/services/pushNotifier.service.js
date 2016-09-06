
function send(item, updatedItem){
	var msg = 'Articulo ' + item.description;
	if(updatedItem.price < item.price){
		msg+=' ha bajado de precio.';
	} else {
		msg+=' ha subido de precio.';
	}
	msg+= ' Nuevo precio ' + updatedItem.formattedPrice;
	console.warn('ALERTA: ', msg);
}

module.exports = {
	send: send
};
