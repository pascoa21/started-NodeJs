const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const app = express()

app.use(bodyParser.json())

const PORT = 5000

/*app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods','*')
    next();
})*/


const listenFunction =() => console.log('Servidor funcionando: hello')

app.listen(PORT, listenFunction)

const books = [{
    name: 'Harry Potter',
    autor:'JK',
    id: 1
}]

const listBooks = (request, response) => {
    return response.status(200).send(books)
}

const createBook = (request,response)=>{
    const book = request.body
    console.log('BOOK', book)
    books.push(book)
    if (book.name && book.autor && book.id) {
        return response.status(201).send({message : 'Livro Cadastrado com Sucesso!'})        
    } else {
        return response.status(400).send({message : 'Falta enviar o body corretamente' })
    }
    
}

const deleteBook = (request, response)=>{
    const id = request.params.id
    console.log('id',id)
    if (id) { return response.status(201).send({message: 'Registro excluido com sucesso'})
    } else {
        return response.status(400).send({message: 'Id não encontrado'})
    }

}

const updateBook = (request, response) =>{
    const id = request.params.id
    if(id){
        return response.status(201).send({ message : 'Livro excluido com Sucesso'})
    } else {
        return response.status(400).send ({ message : 'Falta enviar Id na url'})
    }
}
    
app.get('/book', listBooks)

app.post('/book',createBook)

app.delete('/book/:id',deleteBook)

app.put('/book/:id', updateBook)