# Project description

The project consists of two variations of implementing a hierarchical tree structure within a React applicantion. 
Each variation is set in its corresponding branch:

### node-list-variation *(unfinished - no editNode method)*
- Implementation based on manipulating a list of tree nodes, each having a direct link to the parent component.
- Changes primarily managed through a `useState` hook of the root component.

### node-non-list-variation
- Implementaton based on decentralized approach: each tree node component handles its own children and state.
- The nodes use references ( hook `useRef`) to manage hierarchical relationships and interactions.


# Project Setup
1. Clone the Git Repository:
```
git clone https://github.com/tzzzich/tree-elements-app.git
```
2. Checkout the needed branch:
```
git checkout <branch-name>
```

3. Install Dependencies:

```
npm install
```

4. Run the Development Server:
```
npm run dev
```
