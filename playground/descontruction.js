const transaction = (type, { label, stock = 0 } = { } ) => {
    console.log("Transaction: ", {type, label, stock});
}

// This is not going to thtow errors traing to descontruting something from undefined.
transaction()