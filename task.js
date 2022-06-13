var args = process.argv.slice(2);
const axios = require("axios");

const msg = "Task 2 done";
console.log(msg);

const [category, limit] = [...args];

async function getData(category, limit) {
  const response = await axios
    .get("https://api.publicapis.org/entries")
    .then((res) => {
      const entries = res.data.entries;
      let filtered = entries.map((entry) => {
        let newArr = [];
        if (entry["Category"] === category) newArr.push(entry);
        newArr = newArr.filter(function (element) {
          return element !== undefined && element !== null;
        });
        return [...newArr];
      });
      //console.log(filtered);
      let newEntries = filtered.filter((e) => e.length);
      let arrayEntries = [];
      for (let item of newEntries) {
        arrayEntries.push(item[0]);
      }
      const finalEnt = [...newEntries];
      //find api from entries
      const arrayApi = arrayEntries.map((entry) => {
        //console.log(entry);
        return entry.API;
      });
      //sorting algorithm
      const arrangedObj = arrayApi
        .sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        })
        .reverse()
        .slice(0, limit);
      if (
        arrangedObj == null ||
        arrangedObj == undefined ||
        arrangedObj.length == 0
      ) {
        console.log("No Results Found");
        return "No Results Found";
      } else {
        console.log(arrangedObj);
        return arrangedObj;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

getData(category, limit);
