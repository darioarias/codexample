const { Graph } = require(`${__dirname}/graph`);

let g = new Graph();

const getLetters = () => {
  let leters = [];
  for (let i = 97; i < 123; i++) {
    leters.push(String.fromCharCode(i));
  }
  return leters;
}; // generates the alphabet

let alph = getLetters();

alph.forEach((letter) => {
  g.insertVertex(letter);
  g.insertVertex(letter.toLocaleUpperCase());
}); // goes through every letter in the alphabet and adds it to the graph.

for (let i = 0; i < alph.length * 3; i++) {
  g.insertEdge(
    `${alph[Math.floor(Math.random() * alph.length)]}`,
    `${alph[Math.floor(Math.random() * alph.length)].toLocaleUpperCase()}`,
    Math.floor(Math.random() * 50)
  );
} // Goes through the alphabet three times and adds a random edge on the graph.

console.log(g.adjacencyList);
console.log(g.shortestPath("a", "Z")); // will return the colost path from 'a' to 'Z' or "No such path"

//Here I left a short snipet for anyone to test the code.
//Note that the graph will be unique everytime since Math.random() is used to create edges and the weight between the edges
