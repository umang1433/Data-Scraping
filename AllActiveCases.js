const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

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
            console.log(AllActiveCases);
        });
    } catch (err) {
        console.error(err);
    }
}
scrapeData();