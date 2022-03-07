const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");
const mongoose = require('mongoose');
const User = require('./model/AllActiveCases');

const uri = 'mongodb://localhost:27017/DataScraping';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err))




const url = "http://www.kccllc.net/";

async function scrapeData() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const listItems = $(".twelve ul li");
        const AllActiveCases = [];

        listItems.each((idx, el) => {

            const Cases = { Title: "", CaseNumber: "", Jurisdiction: "", DateFiled: "" };

            Cases.Title = $(el).children("a").children("p").children("span").text();
            Cases.CaseNumber = $(el).children("a").children("p.case-number").text();
            Cases.Jurisdiction = $(el).children("a").children("p.jurisdiction").text();
            Cases.DateFiled = $(el).children("a").children("p.date").text();

            AllActiveCases.push(Cases);

        });
        var data1 = AllActiveCases;

        User.collection.insertMany(data1, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });

        console.log(AllActiveCases);
    } catch (err) {
        console.error(err);
    }
}
scrapeData();