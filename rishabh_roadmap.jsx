import { useState, useEffect } from "react";

const DAYS = [
  {d:"Wed, 21 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Day 1. Recursion begins. Set a timer, no distractions.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 56 — Recursion intro: what is recursion, call stack","Video 57 — Tracing recursive functions step by step","Video 58 — How recursion uses stack memory"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #509 Fibonacci Number — recursive first, then iterative"]},
    {label:"💼 Internship (1 hr)",tasks:["Complete today's Marksman task, push to GitHub"]},
  ]},
  {d:"Thu, 22 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Recursion day 2. Understand the call tree fully before moving on.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 59 — Tail vs head recursion","Video 60 — Recursion tree method for time complexity"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #344 Reverse String — solve recursively"]},
    {label:"💼 Internship (1 hr)",tasks:["Review your codebase, add docstrings to 2 functions"]},
  ]},
  {d:"Fri, 23 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Recursion is the hardest mental leap. Don't skip any video.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 61 — Indirect recursion","Video 62 — Nested recursion","Video 63 — Sum of first n using recursion"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #70 Climbing Stairs — brute force recursive (TLE is fine)"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task, note any blockers"]},
  ]},
  {d:"Sat, 24 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Weekend — go deeper. 2 hrs DSA today.",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 64 — Power using recursion","Video 65 — Taylor Series using recursion","Video 66 — Horner's rule","Video 67 — Fibonacci using recursion"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #50 Pow(x,n) — recursive approach","LC #21 Merge Two Sorted Lists — read and understand only"]},
    {label:"🖥️ Backend Setup (45 min)",tasks:["Create GitHub repo: task-manager-api","Set up FastAPI project with venv, install fastapi + uvicorn"]},
  ]},
  {d:"Sun, 25 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Sunday — lighter day. Revise what you learned this week.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 68 — nCr using recursion","Video 69 — Tower of Hanoi"]},
    {label:"📝 Revision (30 min)",tasks:["Write all recursion patterns learned this week in a notebook"]},
    {label:"💻 LeetCode (30 min)",tasks:["Re-solve LC #509 Fibonacci — add memoization with dict"]},
    {label:"🖥️ Backend (30 min)",tasks:["Write first FastAPI route: GET /health → {status: ok}"]},
  ]},
  {d:"Mon, 26 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Arrays deep dive week begins.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 70 — Array representation and address formula","Video 71 — Array operations: insert, delete, search","Video 72 — Sorted array operations"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #1 Two Sum — brute force O(n²) only, understand it fully"]},
    {label:"💼 Internship (1 hr)",tasks:["Complete daily Marksman task, review LangChain chain you've built"]},
  ]},
  {d:"Tue, 27 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 73 — Array ADT program in C++","Video 74 — Linear search","Video 75 — Binary search iterative"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #704 Binary Search — implement cleanly","LC #35 Search Insert Position"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task + push to repo"]},
  ]},
  {d:"Wed, 28 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 76 — Binary search recursive","Video 77 — Get, Set, Max, Min, Reverse in arrays","Video 78 — Shift and Rotate"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #121 Best Time to Buy and Sell Stock","LC #53 Maximum Subarray — brute force"]},
    {label:"🖥️ Backend (45 min)",tasks:["Create Pydantic models for Task (id, title, status, created_at)"]},
  ]},
  {d:"Thu, 29 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 79 — Merging two arrays","Video 80 — Set operations (union/intersection)"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #217 Contains Duplicate — brute force, no hashset yet","LC #283 Move Zeroes"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 30 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 81 — Find missing element in array","Video 82 — Find duplicate elements","Video 83 — Find a pair with sum k"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #268 Missing Number","LC #26 Remove Duplicates from Sorted Array"]},
    {label:"💼 Internship (1 hr)",tasks:["Push this week's work, write short progress note in README"]},
  ]},
  {d:"Sat, 31 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Weekend — 2 hrs DSA. Linked Lists begin!",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 84 — Sparse matrix","Video 85 — Linked List intro and why we need it","Video 86 — Linked List vs Array","Video 87 — Creating a linked list in C++"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #876 Middle of Linked List","LC #2 Add Two Numbers — read + understand structure only"]},
    {label:"🖥️ Backend (45 min)",tasks:["Add POST /tasks endpoint with Pydantic validation"]},
  ]},
  {d:"Sun, 1 Jun",phase:"Phase 1",phaseColor:"#3B82F6",note:"Sunday — revise arrays week.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 88 — Displaying and counting linked list nodes","Video 89 — Sum and max of linked list"]},
    {label:"📝 Revision (30 min)",tasks:["List all array problems solved. Write pattern beside each one"]},
    {label:"🖥️ Backend (30 min)",tasks:["Add GET /tasks endpoint returning all tasks"]},
  ]},
  {d:"Mon, 2 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Linked list operations — tested in every company interview.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 90 — Inserting in linked list (all positions)","Video 91 — Inserting in sorted linked list"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #206 Reverse Linked List — iterative approach"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 3 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 92 — Deleting from linked list","Video 93 — Deleting a node with key"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #21 Merge Two Sorted Lists","LC #83 Remove Duplicates from Sorted List"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 4 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 94 — Check if linked list is sorted","Video 95 — Remove duplicates from linked list","Video 96 — Reversing a linked list"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #206 Reverse Linked List — now do recursive version"]},
    {label:"🖥️ Backend (45 min)",tasks:["Add DELETE /tasks/{id} endpoint"]},
  ]},
  {d:"Thu, 5 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 97 — Concatenating two linked lists","Video 98 — Doubly linked list: insert"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #141 Linked List Cycle — Floyd's algorithm"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 6 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 99 — Doubly linked list: delete","Video 100 — Circular linked list intro"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #234 Palindrome Linked List"]},
    {label:"💼 Internship (1 hr)",tasks:["Week review, push all code"]},
  ]},
  {d:"Sat, 7 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Weekend — Stacks begin today!",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 101 — Circular linked list operations","Video 102 — Stack intro: push, pop","Video 103 — Stack using array"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #20 Valid Parentheses — classic stack","LC #155 Min Stack"]},
    {label:"🖥️ Backend (45 min)",tasks:["Add PATCH /tasks/{id} to update task status"]},
  ]},
  {d:"Sun, 8 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Sunday — light revision only.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 104 — Stack using linked list"]},
    {label:"📝 Revision (30 min)",tasks:["Review all linked list problems. Re-read any solution you struggled with"]},
    {label:"🤖 AI/ML (30 min)",tasks:["Read one article on LangChain memory — apply idea to Marksman project"]},
  ]},
  {d:"Mon, 9 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Stack applications — come up in every interview.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 105 — Parenthesis matching using stack","Video 106 — Infix to postfix conversion"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #232 Implement Queue using Stacks"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 10 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 107 — Infix to postfix: full program","Video 108 — Evaluation of postfix expression"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #150 Evaluate Reverse Polish Notation"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 11 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 109 — Queue intro: enqueue, dequeue","Video 110 — Queue using array"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #225 Implement Stack using Queues"]},
    {label:"🖥️ Backend (45 min)",tasks:["Set up SQLite with SQLAlchemy in FastAPI project"]},
  ]},
  {d:"Thu, 12 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 111 — Circular queue","Video 112 — Queue using linked list"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #933 Number of Recent Calls"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 13 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 113 — Double ended queue (DEQueue)","Video 114 — Priority queue concept"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #239 Sliding Window Maximum — read + brute force attempt"]},
    {label:"💼 Internship (1 hr)",tasks:["Week push, document what you built this week"]},
  ]},
  {d:"Sat, 14 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Weekend — Trees begin. Biggest topic in DSA.",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 115 — Trees: terminology, types","Video 116 — Binary tree representation","Video 117 — Creating a binary tree"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #104 Maximum Depth of Binary Tree"]},
    {label:"🖥️ Backend (45 min)",tasks:["Persist tasks to SQLite — replace in-memory list"]},
  ]},
  {d:"Sun, 15 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Sunday — revise Stacks + Queues.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 118 — Binary tree traversals intro"]},
    {label:"📝 Revision (30 min)",tasks:["Redo LC #20 Valid Parentheses from scratch, no solution"]},
    {label:"🤖 AI/ML (30 min)",tasks:["Watch 1 YouTube video on how vector databases work"]},
  ]},
  {d:"Mon, 16 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Tree traversals — most tested tree topic in interviews.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 119 — Preorder traversal recursive","Video 120 — Inorder traversal","Video 121 — Postorder traversal"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #144 Binary Tree Preorder Traversal","LC #226 Invert Binary Tree"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 17 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 122 — Level order traversal (BFS on tree)","Video 123 — Height of a binary tree"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #102 Binary Tree Level Order Traversal"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 18 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 124 — Count nodes in binary tree","Video 125 — Count leaf nodes"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #94 Binary Tree Inorder Traversal","LC #543 Diameter of Binary Tree"]},
    {label:"🖥️ Backend (45 min)",tasks:["Add user model + basic JWT auth (use python-jose)"]},
  ]},
  {d:"Thu, 19 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 126 — BST intro and searching","Video 127 — Inserting in BST"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #700 Search in BST","LC #701 Insert into BST"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 20 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 128 — Deleting from BST","Video 129 — Generating BST from preorder"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #98 Validate Binary Search Tree"]},
    {label:"💼 Internship (1 hr)",tasks:["Week push, write brief note on what you shipped"]},
  ]},
  {d:"Sat, 21 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Weekend — AVL trees + hashing intro.",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 130 — AVL tree intro: rotations","Video 131 — LL, RR, LR, RL rotations"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #235 LCA of BST","LC #108 Convert Sorted Array to BST"]},
    {label:"🖥️ Backend (45 min)",tasks:["Protect task endpoints with JWT middleware"]},
  ]},
  {d:"Sun, 22 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Sunday — revise trees.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 132 — Hashing intro: why we need it","Video 133 — Hash functions"]},
    {label:"📝 Revision (30 min)",tasks:["Redo LC #104 Max Depth and LC #226 Invert Tree from scratch"]},
    {label:"🤖 AI/ML (30 min)",tasks:["Open your Car Sales project, run it again, read your own code"]},
  ]},
  {d:"Mon, 23 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Hashing unlocks almost every Medium LeetCode problem.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 134 — Collision resolution: chaining","Video 135 — Open addressing"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #1 Two Sum — NOW with unordered_map O(n)","LC #217 Contains Duplicate — NOW with unordered_set"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 24 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 136 — Linear probing","Video 137 — Quadratic probing"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #242 Valid Anagram — with hashmap","LC #49 Group Anagrams — attempt"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 25 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 138 — Double hashing","Video 139 — STL intro: what is STL"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #560 Subarray Sum Equals K — prefix sum + hashmap"]},
    {label:"🖥️ Backend (45 min)",tasks:["Deploy FastAPI app to Render.com (free tier) — get a live URL"]},
  ]},
  {d:"Thu, 26 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 140 — STL vector: all operations","Video 141 — STL list"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #347 Top K Frequent Elements"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 27 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 142 — STL map and unordered_map","Video 143 — STL set and unordered_set"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #238 Product of Array Except Self"]},
    {label:"💼 Internship (1 hr)",tasks:["Week wrap-up, push all code"]},
  ]},
  {d:"Sat, 28 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Weekend — Sorting algorithms!",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 144 — Bubble sort","Video 145 — Insertion sort","Video 146 — Selection sort"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #15 3Sum — now you have STL, attempt it","LC #75 Sort Colors (Dutch National Flag)"]},
    {label:"🖥️ Backend (45 min)",tasks:["Write full README: setup instructions + live URL + screenshots"]},
  ]},
  {d:"Sun, 29 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Sunday — lighter day.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 147 — Merge sort"]},
    {label:"📝 Revision (30 min)",tasks:["List all hashmap patterns: frequency count, two-sum, prefix sum"]},
    {label:"🤖 AI/ML (30 min)",tasks:["Add cross-validation to Car Sales project, compare R² scores"]},
  ]},
  {d:"Mon, 30 Jun",phase:"Phase 4",phaseColor:"#F59E0B",note:"Graphs begin. Also start resume work today.",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 148 — Quick sort","Video 149 — Graph terminology: vertex, edge, types"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #912 Sort an Array — implement merge sort"]},
    {label:"📄 Resume (45 min)",tasks:["Fix SQLite casing, add Pandas/NumPy/Scikit-learn to skills section"]},
  ]},
  {d:"Tue, 1 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 150 — Graph: adjacency matrix","Video 151 — Adjacency list representation"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #200 Number of Islands — BFS approach"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Wed, 2 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 152 — BFS traversal on graph","Video 153 — DFS traversal on graph"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #733 Flood Fill","LC #695 Max Area of Island"]},
    {label:"📄 Resume (30 min)",tasks:["Rewrite Car Sales project bullet: Action + Tech + Result format"]},
  ]},
  {d:"Thu, 3 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 154 — Detecting cycle in undirected graph","Video 155 — Detecting cycle in directed graph"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #133 Clone Graph"]},
    {label:"💼 Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Fri, 4 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"🧠 Abdul Bari DSA (1.5 hrs)",tasks:["Video 156 — Topological sort","Video 157 — Topological sort using DFS"]},
    {label:"💻 LeetCode (45 min)",tasks:["LC #207 Course Schedule"]},
    {label:"📄 Resume (30 min)",tasks:["Add summary line: 'AI-aware SWE | FastAPI | LangChain | DSA'"]},
  ]},
  {d:"Sat, 5 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Weekend — sprint day. GitHub polish.",sections:[
    {label:"🧠 Abdul Bari DSA (2 hrs)",tasks:["Video 158 — Dijkstra's shortest path intro","Video 159 — Dijkstra implementation"]},
    {label:"💻 LeetCode (1 hr)",tasks:["LC #743 Network Delay Time (Dijkstra)"]},
    {label:"🖥️ GitHub Polish (1 hr)",tasks:["Add screenshots + live URL to task-manager-api README","Update marksman-internship repo README with what you built"]},
  ]},
  {d:"Sun, 6 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Sunday — LinkedIn polish.",sections:[
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 160 — Prim's algorithm intro"]},
    {label:"🔗 LinkedIn (1 hr)",tasks:["Update Education: CGPA 8.95/10, add Marksman internship with dates","Add task-manager-api and Car Sales to Featured section"]},
    {label:"🤖 AI/ML (30 min)",tasks:["Write 150-word LinkedIn post about your Marksman internship"]},
  ]},
  {d:"Mon, 7 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Final sprint. Consolidate everything.",sections:[
    {label:"💻 LeetCode Sprint (1.5 hrs)",tasks:["LC #56 Merge Intervals","LC #57 Insert Interval"]},
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 161 — Kruskal's algorithm"]},
    {label:"💼 Internship final (1 hr)",tasks:["Finalize Marksman Phase 1 deliverables, ensure all code is pushed"]},
  ]},
  {d:"Tue, 8 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"💻 LeetCode Sprint (1.5 hrs)",tasks:["LC #48 Rotate Matrix","LC #73 Set Matrix Zeroes"]},
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 162 — Greedy algorithms intro"]},
    {label:"📄 Resume final (30 min)",tasks:["Final resume review: consistent formatting, no typos, impact bullets"]},
  ]},
  {d:"Wed, 9 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"💻 LeetCode Sprint (1.5 hrs)",tasks:["LC #11 Container With Most Water","LC #42 Trapping Rain Water — attempt"]},
    {label:"🧠 Abdul Bari DSA (1 hr)",tasks:["Video 163 — Activity selection problem"]},
    {label:"💼 Internship wrap (1 hr)",tasks:["Write internship summary doc: what you built, tech used, outcomes"]},
  ]},
  {d:"Thu, 10 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Last day of vacation. Take stock of everything you've built.",sections:[
    {label:"💻 LeetCode final (1 hr)",tasks:["Pick 2 problems you struggled with earlier and re-solve them cold"]},
    {label:"🏁 Final Review (1 hr)",tasks:["Count total LeetCode problems solved — write it somewhere visible","List Abdul Bari topics covered — celebrate the progress","Both GitHub repos: clean code, good READMEs, pinned on profile"]},
    {label:"🎓 College prep (30 min)",tasks:["Plan college semester: keep DSA 1 hr/day going after vacation"]},
  ]},
];

const PHASE_INFO = {
  "Phase 1": { color: "#3B82F6", bg: "#EFF6FF", label: "Phase 1 — Foundations (Recursion + Arrays + Linked Lists)" },
  "Phase 2": { color: "#8B5CF6", bg: "#F5F3FF", label: "Phase 2 — Stacks + Queues + Trees" },
  "Phase 3": { color: "#10B981", bg: "#ECFDF5", label: "Phase 3 — Hashing + STL + Sorting" },
  "Phase 4": { color: "#F59E0B", bg: "#FFFBEB", label: "Phase 4 — Graphs + Resume + Final Sprint" },
};

const STORAGE_KEY = "rishabh_roadmap_v4";

export default function App() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [curDay, setCurDay] = useState(0);
  const [filterPhase, setFilterPhase] = useState("all");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch {}
  }, [checked]);

  const taskId = (di, si, ti) => `${di}_${si}_${ti}`;

  const toggle = (di, si, ti) => {
    const id = taskId(di, si, ti);
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalOverall = DAYS.reduce((acc, day, di) =>
    acc + day.sections.reduce((a, sec, si) => a + sec.tasks.length, 0), 0);
  const doneOverall = Object.values(checked).filter(Boolean).length;
  const pctOverall = totalOverall ? Math.round(doneOverall / totalOverall * 100) : 0;

  const day = DAYS[curDay];
  const dayTasks = day.sections.reduce((a, s) => a + s.tasks.length, 0);
  const dayDone = day.sections.reduce((a, sec, si) =>
    a + sec.tasks.filter((_, ti) => checked[taskId(curDay, si, ti)]).length, 0);
  const dayPct = dayTasks ? Math.round(dayDone / dayTasks * 100) : 0;

  const phaseColor = PHASE_INFO[day.phase]?.color || "#6B7280";
  const phaseBg = PHASE_INFO[day.phase]?.bg || "#F9FAFB";

  const phases = ["all", "Phase 1", "Phase 2", "Phase 3", "Phase 4"];

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", background: "#0F0F0F", minHeight: "100vh", padding: "20px", color: "#E5E7EB" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Rishabh's Vacation Roadmap</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#F9FAFB" }}>May 21 → Jul 10, 2025 · 51 days</div>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Abdul Bari Videos 56–163 · LeetCode · Backend Project · Internship</div>
      </div>

      {/* Overall progress */}
      <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 8, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "#9CA3AF", letterSpacing: "0.1em" }}>OVERALL PROGRESS</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#F9FAFB" }}>{doneOverall}/{totalOverall} tasks · {pctOverall}%</span>
        </div>
        <div style={{ background: "#2A2A2A", borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{ width: `${pctOverall}%`, height: "100%", background: "linear-gradient(90deg, #3B82F6, #10B981)", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Phase filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {phases.map(p => (
          <button key={p} onClick={() => { setFilterPhase(p); if (p !== "all") { const idx = DAYS.findIndex(d => d.phase === p); if (idx >= 0) setCurDay(idx); } }}
            style={{ fontSize: 11, padding: "4px 10px", borderRadius: 4, border: `1px solid ${filterPhase === p ? phaseColor : "#2A2A2A"}`, background: filterPhase === p ? "#1A1A1A" : "transparent", color: filterPhase === p ? "#F9FAFB" : "#6B7280", cursor: "pointer", letterSpacing: "0.05em" }}>
            {p === "all" ? "ALL DAYS" : p.toUpperCase()}
          </button>
        ))}
        <button onClick={() => { if (window.confirm("Reset all progress?")) setChecked({}); }}
          style={{ marginLeft: "auto", fontSize: 11, padding: "4px 10px", borderRadius: 4, border: "1px solid #2A2A2A", background: "transparent", color: "#EF4444", cursor: "pointer" }}>
          RESET
        </button>
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 4, marginBottom: 20 }}>
        {DAYS.map((d, di) => {
          const total = d.sections.reduce((a, s) => a + s.tasks.length, 0);
          const done = d.sections.reduce((a, sec, si) => a + sec.tasks.filter((_, ti) => checked[taskId(di, si, ti)]).length, 0);
          const pct = total ? done / total : 0;
          const isActive = di === curDay;
          const show = filterPhase === "all" || d.phase === filterPhase;
          if (!show) return null;
          const c = PHASE_INFO[d.phase]?.color || "#6B7280";
          return (
            <button key={di} onClick={() => setCurDay(di)}
              style={{ padding: "6px 4px", borderRadius: 4, border: `1px solid ${isActive ? c : "#2A2A2A"}`, background: isActive ? "#1A1A1A" : "transparent", cursor: "pointer", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${pct * 100}%`, background: c, opacity: 0.18 }} />
              <div style={{ fontSize: 9, color: isActive ? "#F9FAFB" : "#6B7280", lineHeight: 1.3, position: "relative" }}>
                {d.d.split(", ")[1]?.split(" ").reverse().join("\n") || d.d.slice(0, 6)}
              </div>
              {pct === 1 && <div style={{ position: "absolute", top: 2, right: 2, width: 5, height: 5, borderRadius: "50%", background: c }} />}
            </button>
          );
        })}
      </div>

      {/* Day detail */}
      <div style={{ background: "#1A1A1A", border: `1px solid #2A2A2A`, borderRadius: 10, overflow: "hidden" }}>
        {/* Day header */}
        <div style={{ background: "#141414", borderBottom: "1px solid #2A2A2A", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 3, background: "#0F0F0F", color: phaseColor, border: `1px solid ${phaseColor}33`, letterSpacing: "0.08em" }}>{day.phase.toUpperCase()}</span>
            <span style={{ fontSize: 11, color: "#4B5563" }}>Day {curDay + 1} of {DAYS.length}</span>
            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: dayPct === 100 ? "#10B981" : "#F9FAFB" }}>{dayDone}/{dayTasks} done</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#F9FAFB", marginBottom: 4 }}>{day.d}</div>
          {day.note && <div style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>{day.note}</div>}
          <div style={{ background: "#0F0F0F", borderRadius: 3, height: 4, marginTop: 10, overflow: "hidden" }}>
            <div style={{ width: `${dayPct}%`, height: "100%", background: phaseColor, transition: "width 0.3s", borderRadius: 3 }} />
          </div>
        </div>

        {/* Tasks */}
        <div style={{ padding: "14px 18px" }}>
          {day.sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: "#6B7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, borderBottom: "1px solid #2A2A2A", paddingBottom: 4 }}>{sec.label}</div>
              {sec.tasks.map((task, ti) => {
                const id = taskId(curDay, si, ti);
                const done = !!checked[id];
                return (
                  <div key={ti} onClick={() => toggle(curDay, si, ti)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", cursor: "pointer", borderBottom: ti < sec.tasks.length - 1 ? "1px solid #1F1F1F" : "none" }}>
                    <div style={{ width: 16, height: 16, minWidth: 16, marginTop: 1, borderRadius: 3, border: `1.5px solid ${done ? phaseColor : "#3A3A3A"}`, background: done ? phaseColor : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {done && <span style={{ fontSize: 10, color: "#fff", fontWeight: 600, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12.5, color: done ? "#4B5563" : "#D1D5DB", textDecoration: done ? "line-through" : "none", lineHeight: 1.55 }}>{task}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => setCurDay(d => Math.max(0, d - 1))} disabled={curDay === 0}
          style={{ flex: 1, padding: "8px", background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 6, color: curDay === 0 ? "#3A3A3A" : "#9CA3AF", cursor: curDay === 0 ? "default" : "pointer", fontSize: 12, fontFamily: "inherit" }}>← prev day</button>
        <button onClick={() => setCurDay(d => Math.min(DAYS.length - 1, d + 1))} disabled={curDay === DAYS.length - 1}
          style={{ flex: 1, padding: "8px", background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 6, color: curDay === DAYS.length - 1 ? "#3A3A3A" : "#9CA3AF", cursor: curDay === DAYS.length - 1 ? "default" : "pointer", fontSize: 12, fontFamily: "inherit" }}>next day →</button>
      </div>
    </div>
  );
}
