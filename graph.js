const { PriorityQueue } = require(`${__dirname}/priorityQueue`);

exports.Graph = class Graph {
  constructor() {
    this.adjacencyList = {};

    this.distances = {};
    this.previous = {};
  } // the blue print for the graph, notice that it's a fairly simple one

  _removeElement(array, element) {
    array.filter((el) => {
      return el != element;
    });
  } // removes an element form an array.

  _existEdge(vertex1, vertex2) {
    for (let connection of vertex1) {
      if (connection.node == vertex2) return true;
    }
    return false;
  } // goes through the edges in a vertex to determine if an edge exists between two edges.

  insertVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      this.distances[vertex] = Infinity;
      this.previous[vertex] = null;
      return this;
    }
    return false;
  } // inputs a new vertex in the adjacency list (adjacency matrix)

  insertEdge(v1, v2, weigth) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      if (!this._existEdge(this.adjacencyList[v1], v2)) {
        //the existEdge helper slows down the code because it has to go through all edges in a vertex, for a better time complexity, one can stores these values as the graph is built
        this.adjacencyList[v1].push({ node: v2, weigth });
        this.adjacencyList[v2].push({ node: v1, weigth });
        return this;
      }
    }
    return false;
  } // creates a new edge between two vertexes with a given weight. It will not do anything if the edge already exists.

  removeEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = this._removeElement(this.adjacencyList[v1], v2);
      this.adjacencyList[v2] = this._removeElement(this.adjacencyList[v2], v1);
      return true;
    }
    return false;
  } // removes an edge between two vertexies.

  removeVertex(v) {
    if (this.adjacencyList[v]) {
      delete this.adjacencyList[v];
      delete this.distances[v];
      delete this.previous[v];
      for (let vertex in this.adjacencyList) {
        this.adjacencyList[vertex] = this._removeElement(
          this.adjacencyList[vertex],
          v
        );
      }
    }
    return false;
  } // removes a vertex from the graph

  shortestPath(startVertex, endVertex) {
    if (!(this.adjacencyList[startVertex] && this.adjacencyList[endVertex]))
      return `Path between ${startVertex} and ${endVertex} does not exist.`; // check if both vertexies are in the graph
    const queue = new PriorityQueue(); // creates a costumed queue
    const distances = { ...this.distances },
      previous = { ...this.previous }; // copy the distance and previous objects that we have been keeping track of.

    let currentNode;

    distances[startVertex] = 0; //updates the starting vertex
    queue.enqueue(startVertex, 0); // updates the starting vertex with a high priority

    while (queue.peek()) {
      // runs while the queue is not empty, notice that it will end once it finds the shortest path
      currentNode = queue.dequeue();
      if (currentNode == endVertex) {
        return distances[endVertex];
      }

      if (currentNode) {
        for (let neightbord of this.adjacencyList[currentNode]) {
          let newDistance = distances[currentNode] + neightbord.weigth;
          if (newDistance < distances[neightbord.node]) {
            distances[neightbord.node] = newDistance;
            previous[neightbord.node] = currentNode;
            queue.enqueue(neightbord.node, newDistance);
          }
        }
      }
    }
    return `Path between ${startVertex} and ${endVertex} does not exist.`;
  } // using dijkstra algorithm, it finds the shortest path between two vertexies if it exists.
};
