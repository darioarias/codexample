# codexample

This is a short program to showcase my knowlege. I throught about creating a webapp, but all of my friends already do this for their "showcase" so I thought I would just focus on the theory.

Here I create a simple queue, a priority queue using a min heap, and a graph. The graph allowes for multiple actions such as adding vertex, edges and removing them. Moreover, the graph allows the user to find the shortest path between two vertexies if it exists using the dijkstra algorithm.

The code optimizes for time complexity and does not care much about the space complexity. You will see that lots of time demanding actions such as creating the states for the dijkstra algorithm and finding the lowest priority node in the priority queue are bypassed by keeping track of the states and the lowest priority node as the graph and queue are created.

I thought about creating a stack and sorting algorithm but ultimately I thought this was enough. Please note that the systems are built on-top of one another. The normal queue is the base, the priority queue uses the queue and the graph uses the priority queue for the dijkstra algorithm.

Laslty, not to be cocky but I wrote this in a short period of time so I can almost promise there will be some bugs I did not see. If that's the case don't be afraid to reach out.
