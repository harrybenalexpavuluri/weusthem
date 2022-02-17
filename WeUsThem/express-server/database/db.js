const uuid = require('uuid');

let data = []

const addData = (newData) => {
    data.push({...newData, id: uuid.v1()})
}

const updateData = (recordId, newData) => {
    const recordIndex = data.findIndex(contact => contact.id === recordId)
    data[recordIndex] = newData
}

const deleteData = (recordId) => {
    const recordIndex = data.findIndex(contact => contact.id === recordId)
    delete data[recordIndex]
    data = data.filter(contact => contact)
}

const getData = () => {
    return data
}

module.exports = {
    addData,
    updateData,
    deleteData,
    getData
}