async function sumarTotal(items) {
    let total = 0;
    items.forEach(e => {
        total += e.precio * e.cantidad;
    });
    return total;
}

module.exports = {
    sumarTotal
}