const repository = require('../repositories/product-repository');
const express = require('express');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const pageSize = 10;
const numberPage = 2;


//GET ALL PRODUCTS API
exports.getAll =  (req,res) => {
    repository.getAll(req,res,req.query.numberPage,req.query.pageSize).then( x => {
        res.status(200).send(x);
    }).catch( e =>{
        res.status(400).send({message:"Erro ao Listar"});
    });
};

//GET PRODUCT API
exports.get =  (req,res) => {
    repository.get(req.params.id).then( x => {
        res.status(200).send(x);
    }).catch( e =>{
        res.status(400).send({message:"Erro ao capturar objeto"});
    });
};

//POST PRODUCT API
exports.post =  (req,res) => {
    repository.post(req.body.ProdutoNome,req.body.Preco).then( x => {
        res.status(201).send({message:"cadastrado com sucesso"});
    }).catch( e =>{
        res.status(400).send({message:"Erro ao cadastrar"});
    });
};

//PUT PRODUCT API
exports.put =  (req,res) => {
    repository.put(req.body.ProdutoNome,req.body.Preco,req.params.id).then( x => {
        res.status(201).send({
            message:"Produto atualizado com sucesso"
        });
    }).catch( e =>{
        res.status(400).send({message:"Falha ao atualizar produto"});
    });
};

//DELETE PRODUCT API
exports.delete =  (req,res) => {
    repository.delete(req.params.id).then( x => {
        res.status(201).send({
            message:"Produto deletado com sucesso"
        });
    }).catch( e =>{
        res.status(400).send({message:"Falha ao deletar produto"});
    });
};

exports.logar = (req, res) =>{
    res.status(200).send(createUserToken(1));
}

const createUserToken = ( userId ) =>{
    return jwt.sign({"userId":userId},config.SALT_KEY,{expiresIn: '1d'});
}