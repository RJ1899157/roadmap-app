export const ABDUL_BARI_UDEMY_URL = "https://www.udemy.com/course/datastructurescncpp/";
export const STRIVER_A2Z_URL = "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z";
export const COURSERA_CPP_URL = "https://www.coursera.org/search?query=c%2B%2B";
export const FASTAPI_URL = "https://fastapi.tiangolo.com/";
export const GITHUB_URL = "https://github.com/";
export const LINKEDIN_URL = "https://www.linkedin.com/";
export const RENDER_URL = "https://render.com/";

export const BASE_DAYS = [
  {d:"Wed, 21 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Day 1. Recursion begins. Set a timer, no distractions.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 56 — Recursion intro: what is recursion, call stack","Video 57 — Tracing recursive functions step by step","Video 58 — How recursion uses stack memory"]},
    {label:"LeetCode (45 min)",tasks:["LC #509 Fibonacci Number — recursive first, then iterative"]},
    {label:"Internship (1 hr)",tasks:["Complete today's Marksman task, push to GitHub"]},
  ]},
  {d:"Thu, 22 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Recursion day 2. Understand the call tree fully before moving on.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 59 — Tail vs head recursion","Video 60 — Recursion tree method for time complexity"]},
    {label:"LeetCode (45 min)",tasks:["LC #344 Reverse String — solve recursively"]},
    {label:"Internship (1 hr)",tasks:["Review your codebase, add docstrings to 2 functions"]},
  ]},
  {d:"Fri, 23 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Recursion today, with an internship meeting — keep the day a little lighter.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 61 — Indirect recursion","Video 62 — Nested recursion"]},
    {label:"LeetCode (45 min)",tasks:["LC #70 Climbing Stairs — brute force recursive (TLE is fine)"]},
    {label:"Internship (1 hr)",tasks:["Internship meeting"]},
  ]},
  {d:"Sat, 24 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Weekend — go deeper. 2 hrs DSA today.",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 64 — Power using recursion","Video 65 — Taylor Series using recursion","Video 66 — Horner's rule","Video 67 — Fibonacci using recursion"]},
    {label:"LeetCode (1 hr)",tasks:["LC #50 Pow(x,n) — recursive approach","LC #21 Merge Two Sorted Lists — read and understand only"]},
    {label:"Internship (1 hr)",tasks:["Complete yesterday's internship meeting notes and Marksman follow-up"]},
  ]},
  {d:"Sun, 25 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Sunday — lighter day. Revise what you learned this week.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 63 — Sum of first n using recursion","Video 68 — nCr using recursion","Video 69 — Tower of Hanoi"]},
    {label:"Revision (30 min)",tasks:["Write all recursion patterns learned this week in a notebook"]},
    {label:"LeetCode (30 min)",tasks:["Re-solve LC #509 Fibonacci — add memoization with dict"]},
  ]},
  {d:"Mon, 26 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Arrays deep dive week begins.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 70 — Array representation and address formula","Video 71 — Array operations: insert, delete, search","Video 72 — Sorted array operations"]},
    {label:"LeetCode (45 min)",tasks:["LC #1 Two Sum — brute force O(n²) only, understand it fully"]},
    {label:"Internship (1 hr)",tasks:["Complete daily Marksman task, review LangChain chain you've built"]},
  ]},
  {d:"Tue, 27 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 73 — Array ADT program in C++","Video 74 — Linear search","Video 75 — Binary search iterative"]},
    {label:"LeetCode (45 min)",tasks:["LC #704 Binary Search — implement cleanly","LC #35 Search Insert Position"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task + push to repo"]},
  ]},
  {d:"Wed, 28 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 76 — Binary search recursive","Video 77 — Get, Set, Max, Min, Reverse in arrays","Video 78 — Shift and Rotate"]},
    {label:"LeetCode (45 min)",tasks:["LC #121 Best Time to Buy and Sell Stock","LC #53 Maximum Subarray — brute force"]},
    {label:"Backend (45 min)",tasks:["Create Pydantic models for Task (id, title, status, created_at)"]},
  ]},
  {d:"Thu, 29 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 79 — Merging two arrays","Video 80 — Set operations (union/intersection)"]},
    {label:"LeetCode (45 min)",tasks:["LC #217 Contains Duplicate — brute force, no hashset yet","LC #283 Move Zeroes"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 30 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 81 — Find missing element in array","Video 82 — Find duplicate elements","Video 83 — Find a pair with sum k"]},
    {label:"LeetCode (45 min)",tasks:["LC #268 Missing Number","LC #26 Remove Duplicates from Sorted Array"]},
    {label:"Internship (1 hr)",tasks:["Push this week's work, write short progress note in README"]},
  ]},
  {d:"Sat, 31 May",phase:"Phase 1",phaseColor:"#3B82F6",note:"Weekend — 2 hrs DSA. Linked Lists begin!",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 84 — Sparse matrix","Video 85 — Linked List intro and why we need it","Video 86 — Linked List vs Array","Video 87 — Creating a linked list in C++"]},
    {label:"LeetCode (1 hr)",tasks:["LC #876 Middle of Linked List","LC #2 Add Two Numbers — read + understand structure only"]},
  ]},
  {d:"Sun, 1 Jun",phase:"Phase 1",phaseColor:"#3B82F6",note:"Sunday — revise arrays week.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 88 — Displaying and counting linked list nodes","Video 89 — Sum and max of linked list"]},
    {label:"Revision (30 min)",tasks:["List all array problems solved. Write pattern beside each one"]},
    {label:"Expense Tracker API (45 min)",tasks:["Create FastAPI repo and expense model with category/date fields","Build POST /expenses and GET /expenses endpoints","Use SQLite and prepare auth design"]},
  ]},
  {d:"Mon, 2 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Linked list operations — tested in every company interview.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 90 — Inserting in linked list (all positions)","Video 91 — Inserting in sorted linked list"]},
    {label:"LeetCode (45 min)",tasks:["LC #206 Reverse Linked List — iterative approach"]},
    {label:"Expense Tracker API (45 min)",tasks:["Add SQLite persistence and SQLAlchemy models","Implement GET /expenses with category/date filtering","Add basic auth dependency to expense routes"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 3 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 92 — Deleting from linked list","Video 93 — Deleting a node with key"]},
    {label:"LeetCode (45 min)",tasks:["LC #21 Merge Two Sorted Lists","LC #83 Remove Duplicates from Sorted List"]},
    {label:"Expense Tracker API (45 min)",tasks:["Add PATCH /expenses/{id} and DELETE /expenses/{id}","Implement spending summary endpoint","Validate category/date filters"]},
    {label:"Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 4 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 94 — Check if linked list is sorted","Video 95 — Remove duplicates from linked list","Video 96 — Reversing a linked list"]},
    {label:"LeetCode (45 min)",tasks:["LC #206 Reverse Linked List — now do recursive version"]},
    {label:"Expense Tracker API (45 min)",tasks:["Add summary endpoint /expenses/summary","Add request validation and error handling","Finalize pure backend API behavior"]},
  ]},
  {d:"Thu, 5 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 97 — Concatenating two linked lists","Video 98 — Doubly linked list: insert"]},
    {label:"LeetCode (45 min)",tasks:["LC #141 Linked List Cycle — Floyd's algorithm"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 6 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 99 — Doubly linked list: delete","Video 100 — Circular linked list intro"]},
    {label:"LeetCode (45 min)",tasks:["LC #234 Palindrome Linked List"]},
    {label:"Expense Tracker API (45 min)",tasks:["Protect expense endpoints with basic auth","Write sample auth curl commands","Verify no AI code is used"]},
    {label:"Internship (1 hr)",tasks:["Week review, push all code"]},
  ]},
  {d:"Sat, 7 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Weekend — Stacks begin today!",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 101 — Circular linked list operations","Video 102 — Stack intro: push, pop","Video 103 — Stack using array"]},
    {label:"LeetCode (1 hr)",tasks:["LC #20 Valid Parentheses — classic stack","LC #155 Min Stack"]},
    {label:"Expense Tracker API (45 min)",tasks:["Write README with setup, endpoints, auth details","Test all CRUD routes and filters","Push final expense tracker API project"]},
  ]},
  {d:"Sun, 8 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Sunday — light revision only.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 104 — Stack using linked list"]},
    {label:"Revision (30 min)",tasks:["Review all linked list problems. Re-read any solution you struggled with"]},
    {label:"AI/ML (30 min)",tasks:["Read one article on LangChain memory — apply idea to Marksman project"]},
  ]},
  {d:"Mon, 9 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Stack applications — come up in every interview.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 105 — Parenthesis matching using stack","Video 106 — Infix to postfix conversion"]},
    {label:"LeetCode (45 min)",tasks:["LC #232 Implement Queue using Stacks"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 10 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 107 — Infix to postfix: full program","Video 108 — Evaluation of postfix expression"]},
    {label:"LeetCode (45 min)",tasks:["LC #150 Evaluate Reverse Polish Notation"]},
    {label:"Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 11 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 109 — Queue intro: enqueue, dequeue","Video 110 — Queue using array"]},
    {label:"LeetCode (45 min)",tasks:["LC #225 Implement Stack using Queues"]},
  ]},
  {d:"Thu, 12 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 111 — Circular queue","Video 112 — Queue using linked list"]},
    {label:"LeetCode (45 min)",tasks:["LC #933 Number of Recent Calls"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 13 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 113 — Double ended queue (DEQueue)","Video 114 — Priority queue concept"]},
    {label:"LeetCode (45 min)",tasks:["LC #239 Sliding Window Maximum — read + brute force attempt"]},
    {label:"Internship (1 hr)",tasks:["Week push, document what you built this week"]},
  ]},
  {d:"Sat, 14 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Weekend — Trees begin. Biggest topic in DSA.",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 115 — Trees: terminology, types","Video 116 — Binary tree representation","Video 117 — Creating a binary tree"]},
    {label:"LeetCode (1 hr)",tasks:["LC #104 Maximum Depth of Binary Tree"]},
  ]},
  {d:"Sun, 15 Jun",phase:"Phase 2",phaseColor:"#8B5CF6",note:"Sunday — revise Stacks + Queues.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 118 — Binary tree traversals intro"]},
    {label:"Revision (30 min)",tasks:["Redo LC #20 Valid Parentheses from scratch, no solution"]},
    {label:"AI/ML (30 min)",tasks:["Watch 1 YouTube video on how vector databases work"]},
  ]},
  {d:"Mon, 16 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Tree traversals — most tested tree topic in interviews.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 119 — Preorder traversal recursive","Video 120 — Inorder traversal","Video 121 — Postorder traversal"]},
    {label:"LeetCode (45 min)",tasks:["LC #144 Binary Tree Preorder Traversal","LC #226 Invert Binary Tree"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 17 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 122 — Level order traversal (BFS on tree)","Video 123 — Height of a binary tree"]},
    {label:"LeetCode (45 min)",tasks:["LC #102 Binary Tree Level Order Traversal"]},
    {label:"Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 18 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 124 — Count nodes in binary tree","Video 125 — Count leaf nodes"]},
    {label:"LeetCode (45 min)",tasks:["LC #94 Binary Tree Inorder Traversal","LC #543 Diameter of Binary Tree"]},
  ]},
  {d:"Thu, 19 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 126 — BST intro and searching","Video 127 — Inserting in BST"]},
    {label:"LeetCode (45 min)",tasks:["LC #700 Search in BST","LC #701 Insert into BST"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 20 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 128 — Deleting from BST","Video 129 — Generating BST from preorder"]},
    {label:"LeetCode (45 min)",tasks:["LC #98 Validate Binary Search Tree"]},
    {label:"Internship (1 hr)",tasks:["Week push, write brief note on what you shipped"]},
  ]},
  {d:"Sat, 21 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Weekend — AVL trees + hashing intro.",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 130 — AVL tree intro: rotations","Video 131 — LL, RR, LR, RL rotations"]},
    {label:"LeetCode (1 hr)",tasks:["LC #235 LCA of BST","LC #108 Convert Sorted Array to BST"]},
  ]},
  {d:"Sun, 22 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Sunday — revise trees.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 132 — Hashing intro: why we need it","Video 133 — Hash functions"]},
    {label:"Revision (30 min)",tasks:["Redo LC #104 Max Depth and LC #226 Invert Tree from scratch"]},
    {label:"AI/ML (30 min)",tasks:["Open your Car Sales project, run it again, read your own code"]},
  ]},
  {d:"Mon, 23 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Hashing unlocks almost every Medium LeetCode problem.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 134 — Collision resolution: chaining","Video 135 — Open addressing"]},
    {label:"LeetCode (45 min)",tasks:["LC #1 Two Sum — NOW with unordered_map O(n)","LC #217 Contains Duplicate — NOW with unordered_set"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Tue, 24 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 136 — Linear probing","Video 137 — Quadratic probing"]},
    {label:"LeetCode (45 min)",tasks:["LC #242 Valid Anagram — with hashmap","LC #49 Group Anagrams — attempt"]},
    {label:"Internship (1 hr)",tasks:["Marksman task + commit"]},
  ]},
  {d:"Wed, 25 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 138 — Double hashing","Video 139 — STL intro: what is STL"]},
    {label:"LeetCode (45 min)",tasks:["LC #560 Subarray Sum Equals K — prefix sum + hashmap"]},
  ]},
  {d:"Thu, 26 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 140 — STL vector: all operations","Video 141 — STL list"]},
    {label:"LeetCode (45 min)",tasks:["LC #347 Top K Frequent Elements"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Fri, 27 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 142 — STL map and unordered_map","Video 143 — STL set and unordered_set"]},
    {label:"LeetCode (45 min)",tasks:["LC #238 Product of Array Except Self"]},
    {label:"Internship (1 hr)",tasks:["Week wrap-up, push all code"]},
  ]},
  {d:"Sat, 28 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Weekend — Sorting algorithms!",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 144 — Bubble sort","Video 145 — Insertion sort","Video 146 — Selection sort"]},
    {label:"LeetCode (1 hr)",tasks:["LC #15 3Sum — now you have STL, attempt it","LC #75 Sort Colors (Dutch National Flag)"]},
  ]},
  {d:"Sun, 29 Jun",phase:"Phase 3",phaseColor:"#10B981",note:"Sunday — lighter day.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 147 — Merge sort"]},
    {label:"Revision (30 min)",tasks:["List all hashmap patterns: frequency count, two-sum, prefix sum"]},
    {label:"AI/ML (30 min)",tasks:["Add cross-validation to Car Sales project, compare R² scores"]},
  ]},
  {d:"Mon, 30 Jun",phase:"Phase 4",phaseColor:"#F59E0B",note:"Graphs begin. Also start resume work today.",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 148 — Quick sort","Video 149 — Graph terminology: vertex, edge, types"]},
    {label:"LeetCode (45 min)",tasks:["LC #912 Sort an Array — implement merge sort"]},
    {label:"Resume (45 min)",tasks:["Fix SQLite casing, add Pandas/NumPy/Scikit-learn to skills section"]},
  ]},
  {d:"Tue, 1 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 150 — Graph: adjacency matrix","Video 151 — Adjacency list representation"]},
    {label:"LeetCode (45 min)",tasks:["LC #200 Number of Islands — BFS approach"]},
    {label:"Internship (1 hr)",tasks:["Marksman day task"]},
  ]},
  {d:"Wed, 2 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 152 — BFS traversal on graph","Video 153 — DFS traversal on graph"]},
    {label:"LeetCode (45 min)",tasks:["LC #733 Flood Fill","LC #695 Max Area of Island"]},
    {label:"Resume (30 min)",tasks:["Rewrite Car Sales project bullet: Action + Tech + Result format"]},
  ]},
  {d:"Thu, 3 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 154 — Detecting cycle in undirected graph","Video 155 — Detecting cycle in directed graph"]},
    {label:"LeetCode (45 min)",tasks:["LC #133 Clone Graph"]},
    {label:"Project wrap (45 min)",tasks:["Summarize the internship learnings and prepare a final commit message"]},
  ]},
  {d:"Fri, 4 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"Abdul Bari DSA (1.5 hrs)",tasks:["Video 156 — Topological sort","Video 157 — Topological sort using DFS"]},
    {label:"LeetCode (45 min)",tasks:["LC #207 Course Schedule"]},
    {label:"Resume (30 min)",tasks:["Add summary line: 'AI-aware SWE | FastAPI | LangChain | DSA'"]},
  ]},
  {d:"Sat, 5 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Weekend — sprint day. GitHub polish.",sections:[
    {label:"Abdul Bari DSA (2 hrs)",tasks:["Video 158 — Dijkstra's shortest path intro","Video 159 — Dijkstra implementation"]},
    {label:"LeetCode (1 hr)",tasks:["LC #743 Network Delay Time (Dijkstra)"]},
    {label:"GitHub Polish (1 hr)",tasks:["Add screenshots + live URL to task-manager-api README","Update marksman-internship repo README with what you built"]},
  ]},
  {d:"Sun, 6 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Sunday — LinkedIn polish.",sections:[
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 160 — Prim's algorithm intro"]},
    {label:"LinkedIn (1 hr)",tasks:["Update Education: CGPA 8.95/10, add Marksman internship with dates","Add task-manager-api and Car Sales to Featured section"]},
    {label:"AI/ML (30 min)",tasks:["Write 150-word LinkedIn post about your Marksman internship"]},
  ]},
  {d:"Mon, 7 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Final sprint. Consolidate everything.",sections:[
    {label:"LeetCode Sprint (1.5 hrs)",tasks:["LC #56 Merge Intervals","LC #57 Insert Interval"]},
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 161 — Kruskal's algorithm"]},
    {label:"Final project review (1 hr)",tasks:["Finalize code notes, write what you built, and clean up any remaining bugs"]},
  ]},
  {d:"Tue, 8 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"LeetCode Sprint (1.5 hrs)",tasks:["LC #48 Rotate Matrix","LC #73 Set Matrix Zeroes"]},
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 162 — Greedy algorithms intro"]},
    {label:"Resume final (30 min)",tasks:["Final resume review: consistent formatting, no typos, impact bullets"]},
  ]},
  {d:"Wed, 9 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"",sections:[
    {label:"LeetCode Sprint (1.5 hrs)",tasks:["LC #11 Container With Most Water","LC #42 Trapping Rain Water — attempt"]},
    {label:"Abdul Bari DSA (1 hr)",tasks:["Video 163 — Activity selection problem"]},
    {label:"Wrap-up doc (1 hr)",tasks:["Write a summary of your projects, outcomes, and next steps"]},
  ]},
  {d:"Thu, 10 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Last day of vacation. Take stock of everything you've built.",sections:[
    {label:"LeetCode final (1 hr)",tasks:["Pick 2 problems you struggled with earlier and re-solve them cold"]},
    {label:"Resume final (1 hr)",tasks:["Update all bullets with results, action verbs, and technology keywords","Save a clean PDF version and a text-friendly export"]},
    {label:"College prep (30 min)",tasks:["Plan college semester: keep DSA 1 hr/day going after vacation"]},
  ]},
  {d:"Fri, 11 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Profile polish day. Make your online presence consistent and ATS-ready.",sections:[
    {label:"LinkedIn (1 hr)",tasks:["Refresh About section with SWE + AI focus","Add featured projects and internship outcomes","Update skills, certifications, and contact info"]},
    {label:"Resume (1 hr)",tasks:["Ensure keywords match target roles, remove outdated items, and shorten to one page if needed","Proofread for clarity, consistency, and formatting"]},
    {label:"GitHub / Portfolio (30 min)",tasks:["Pin the best repos, update README quick-starts, and add live/demo links where possible"]},
  ]},
  {d:"Sat, 12 Jul",phase:"Phase 4",phaseColor:"#F59E0B",note:"Final wrap-up day. Finish profiles, resume, and application-ready materials.",sections:[
    {label:"Profile audit (1 hr)",tasks:["Check LinkedIn, GitHub, and resume for consistent messaging and dates","Add your newest project and internship highlights"]},
    {label:"Resume wrap-up (45 min)",tasks:["Export final PDF, get feedback if possible, and save a plain text copy"]},
    {label:"Application prep (45 min)",tasks:["Create a short checklist for cover letters, portfolio links, and interview prep materials"]},
  ]},
];

export const BEGINNER_LEETCODE_TASKS = [
  "Scratch LC #2235 Add Two Integers — learn the editor, return a + b",
  "Scratch LC #2469 Convert the Temperature — write two formulas and return an array",
  "Scratch LC #2413 Smallest Even Multiple — use one if/else",
  "Scratch LC #1480 Running Sum of 1d Array — trace a loop with a running total",
  "Scratch LC #1672 Richest Customer Wealth — nested loops, max value",
  "Scratch LC #2114 Maximum Number of Words Found in Sentences — split strings",
  "Scratch LC #771 Jewels and Stones — count matching characters",
  "Scratch LC #2011 Final Value of Variable After Performing Operations — simple string checks",
  "Scratch LC #1512 Number of Good Pairs — brute force all pairs",
  "Scratch LC #1431 Kids With the Greatest Number of Candies — compare against max",
  "Scratch LC #1365 How Many Numbers Are Smaller Than the Current Number — brute force counting",
  "Scratch LC #1470 Shuffle the Array — build a new array from two halves",
  "Scratch LC #1929 Concatenation of Array — append the same array twice",
  "Scratch LC #1920 Build Array from Permutation — index into another index",
  "Scratch LC #1389 Create Target Array in the Given Order — practice insert",
  "Scratch LC #2574 Left and Right Sum Differences — prefix/suffix basics",
  "Scratch LC #2942 Find Words Containing Character — filter strings",
  "Scratch LC #2824 Count Pairs Whose Sum is Less than Target — brute force pairs",
  "Scratch LC #344 Reverse String — two pointers after a manual swap trace",
  "Scratch LC #283 Move Zeroes — write the simple extra-array version first",
  "Scratch LC #26 Remove Duplicates from Sorted Array — two pointers slowly",
  "Scratch LC #35 Search Insert Position — linear scan first, binary later",
  "Scratch LC #704 Binary Search — dry-run low, mid, high",
  "Scratch LC #121 Best Time to Buy and Sell Stock — track minimum price",
  "Scratch LC #217 Contains Duplicate — solve with nested loops, then set",
  "Scratch LC #242 Valid Anagram — sort both strings first",
  "Scratch LC #383 Ransom Note — frequency counter from scratch",
  "Scratch LC #387 First Unique Character in a String — count then scan",
  "Scratch LC #20 Valid Parentheses — push openings, match closings",
  "Scratch LC #682 Baseball Game — use an array like a stack",
  "Scratch LC #232 Implement Queue using Stacks — understand operations only",
  "Scratch LC #206 Reverse Linked List — draw three pointers before coding",
  "Scratch LC #876 Middle of the Linked List — slow and fast pointers",
  "Scratch LC #141 Linked List Cycle — first understand why fast catches slow",
  "Scratch LC #104 Maximum Depth of Binary Tree — recursion base case",
  "Scratch LC #226 Invert Binary Tree — swap left and right recursively",
  "Scratch LC #100 Same Tree — compare nodes step by step",
  "Scratch LC #94 Binary Tree Inorder Traversal — recursive traversal template",
  "Scratch LC #144 Binary Tree Preorder Traversal — visit root first",
  "Scratch LC #145 Binary Tree Postorder Traversal — visit root last",
  "Scratch LC #700 Search in a Binary Search Tree — use BST direction",
  "Scratch LC #108 Convert Sorted Array to BST — choose middle as root",
  "Scratch LC #1 Two Sum — brute force first, then hashmap",
  "Scratch LC #49 Group Anagrams — sorted word as key",
  "Scratch LC #125 Valid Palindrome — clean string, two pointers",
  "Scratch LC #409 Longest Palindrome — character counts",
  "Scratch LC #733 Flood Fill — DFS from one cell",
  "Scratch LC #200 Number of Islands — mark visited land",
  "Scratch LC #56 Merge Intervals — sort then merge slowly",
  "Scratch LC #48 Rotate Image — transpose then reverse rows",
  "Scratch LC #118 Pascal's Triangle — build each row from the previous row",
];

export const CERTIFICATION_TASKS = [
  "Certification study — choose the course/certification module and set up notes",
  "Certification study — finish one beginner lesson and write 5 key points",
  "Certification study — practice the module quiz and note weak topics",
  "Certification study — watch one hands-on demo and repeat it yourself",
  "Certification study — revise yesterday's weak topic before moving ahead",
  "Certification study — complete one lab or one guided exercise",
  "Certification study — update your notes with commands, formulas, or concepts",
  "Certification study — take a short practice test and review every mistake",
  "Certification study — complete one new module section",
  "Certification study — summarize the module in your own words",
  "Certification study — do one practical exercise without looking at the solution",
  "Certification study — revise flashcards or make 10 new ones",
  "Certification study — attempt mixed practice questions",
  "Certification study — clean up notes and mark doubts for the weekend",
];

export const STRIVER_A2Z_TASKS = [
  "Striver A2Z — Basics: User Input/Output and first simple programs",
  "Striver A2Z — Basics: Data types, if/else, loops and function calls",
  "Striver A2Z — Basics: Arrays, strings and simple array manipulation",
  "Striver A2Z — Basics: Recursion patterns and small recursive problems",
  "Striver A2Z — Arrays: Move zeroes / rotate array / search problems",
  "Striver A2Z — Arrays: Remove duplicates and missing number practice",
  "Striver A2Z — Binary Search: find element, search insert, lower/upper bound",
  "Striver A2Z — Stack & Queue: build stack or queue and solve one problem",
  "Striver A2Z — Linked List: reverse list / detect cycle / middle node",
  "Striver A2Z — Trees: preorder/inorder/postorder traversal practice",
  "Striver A2Z — Hashing: count frequencies and contain duplicates problems",
  "Striver A2Z — Greedy: merge intervals or interval-related practice",
  "Striver A2Z — DP: climbing stairs / running sum / basic dp idea",
  "Striver A2Z — Bit Manipulation: fundamentals or simple bit problem",
  "Striver A2Z — Graphs: BFS / DFS or connected components practice",
  "Striver A2Z — Review current A2Z sheet section and solve one problem",
];

export const EXTRA_LEETCODE_TASKS = [
  "LC #1 Two Sum — brute force first, then hashmap",
  "LC #20 Valid Parentheses — stack practice",
  "LC #21 Merge Two Sorted Lists — linked list review",
  "LC #35 Search Insert Position — binary search practice",
  "LC #53 Maximum Subarray — sliding window / brute force",
  "LC #70 Climbing Stairs — recursion + dp practice",
  "LC #94 Binary Tree Inorder Traversal — tree recursion",
  "LC #121 Best Time to Buy and Sell Stock — greedy review",
  "LC #141 Linked List Cycle — fast and slow pointers",
  "LC #217 Contains Duplicate — hashmap / sorting",
  "LC #242 Valid Anagram — string frequency counts",
  "LC #345 Reverse Vowels of a String — string pointers",
  "LC #49 Group Anagrams — sort + hashmap",
  "LC #136 Single Number — bitwise / xor practice",
  "LC #58 Length of Last Word — string scanning",
];

export const LEETCODE_DAILY_TASK_POOL = [
  ...EXTRA_LEETCODE_TASKS,
  ...BEGINNER_LEETCODE_TASKS,
].filter((task, index, all) => all.indexOf(task) === index);

export const EXTRA_STRIVER_A2Z_TASKS = STRIVER_A2Z_TASKS;

export const EXTRA_BACKEND_TASKS = [
  "Add an authenticated endpoint with JWT validation",
  "Write a route that validates input cleanly",
  "Create a database model and persist one resource",
  "Add unit tests for one route",
  "Implement request logging and error handling for one endpoint",
  "Build a GET /users endpoint that returns JSON from the database",
  "Add a POST route with validation and response schema",
  "Create a PATCH endpoint that updates one field safely",
  "Add a status endpoint and verify it works in the browser",
];

export const EXTRA_ABDUL_BARI_TASKS = [
  "Watch one more Abdul Bari DSA video and summarize the algorithm",
  "Rewatch today’s video and implement one example in C++",
  "Write a short note for the current DSA concept and when to use it",
  "Solve a small coding example from the current video topic",
  "Practice one extra recursion or array example by hand",
];

export const EXTRA_CERTIFICATION_TASKS = [
  "Complete one certification lesson and note the key commands",
  "Finish one practical lab exercise from the certification module",
  "Do one quiz question and mark any weak topics",
  "Rewrite one certification concept in your own words",
  "Reflect on one module and capture the important formulas",
];

export const EXTRA_REVISION_TASKS = [
  "Redo one earlier problem from scratch without looking at solutions",
  "Summarize today’s topic in a single page",
  "Write one quick cheat sheet for the current concept",
  "Review a solved problem and improve the code quality",
  "Pick one weak topic and rewrite the explanation clearly",
];

export const WEEKEND_INTERNSHIP_TASKS = [
  "Internship weekend block — finish pending Marksman work and push updates",
  "Internship weekend block — review the week's Marksman code and note blockers",
  "Internship weekend block — improve one feature or bug from the backlog",
  "Internship weekend block — write a short progress note for what shipped",
  "Internship weekend block — test the Marksman flow end to end",
  "Internship weekend block — clean up commits and update the README",
  "Internship weekend block — document one tricky implementation decision",
  "Internship weekend block — plan next week's Marksman tasks",
];

export const COURSERA_CPP_TASKS = [
  "Coursera C++ — set up compiler/IDE and finish the course orientation",
  "Coursera C++ — variables, types, input/output, and basic operators",
  "Coursera C++ — conditionals and control flow exercises",
  "Coursera C++ — loops, dry runs, and pattern practice",
  "Coursera C++ — functions, parameters, return values, and scope",
  "Coursera C++ — arrays and vectors with hands-on exercises",
  "Coursera C++ — strings and common string operations",
  "Coursera C++ — references, pointers, and memory basics",
  "Coursera C++ — structs/classes and object basics",
  "Coursera C++ — constructors, methods, and encapsulation",
  "Coursera C++ — STL vector, string, map, set, and common methods",
  "Coursera C++ — file input/output and error handling basics",
  "Coursera C++ — complete the current graded quiz or lab",
  "Coursera C++ — review mistakes and redo one weak assignment",
];

export const MONTH_SHORT_TO_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};
export const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const IST_TIME_ZONE = "Asia/Kolkata";

export const isApiProjectTask = (text) => /expense tracker api|fastapi|pydantic|sqlalchemy|sqlite|jwt|render|backend|api endpoint|api route/i.test(text);

export const parseRoadmapDate = (label) => {
  const match = label.match(/(\d{1,2})\s+([A-Za-z]{3})/);
  return match ? { day: Number(match[1]), month: MONTH_SHORT_TO_INDEX[match[2]] } : null;
};

export const getIstLocalDate = (date) => {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  return {
    day: Number(parts.find((part) => part.type === "day")?.value ?? "0"),
    month: MONTH_SHORT_TO_INDEX[parts.find((part) => part.type === "month")?.value ?? "Jan"],
    year: Number(parts.find((part) => part.type === "year")?.value ?? "0"),
  };
};

export const isWeekend = (day) => {
  const weekday = getRoadmapWeekday(day.d);
  return weekday === "Sat" || weekday === "Sun";
};
export const isMayDay = (day) => day.d.includes("May");
export const isAbdulBariSection = (section) => section.label.includes("Abdul Bari DSA");

export const getRoadmapYear = () => getIstLocalDate(new Date()).year;
export const getRoadmapWeekday = (label) => {
  const parsed = parseRoadmapDate(label);
  if (!parsed) return null;
  const date = new Date(Date.UTC(getRoadmapYear(), parsed.month, parsed.day));
  return WEEKDAYS_SHORT[date.getUTCDay()];
};

export const getDayLabel = (day) => {
  const parsed = parseRoadmapDate(day.d);
  if (!parsed) return day.d;
  const weekday = getRoadmapWeekday(day.d);
  return `${weekday}, ${parsed.day} ${MONTHS_SHORT[parsed.month]}`;
};

export const isInternshipSection = (section) => section.label.toLowerCase().includes("internship");

export const buildVideoChunks = (start, end, chunkSize = 12) => {
  const chunks = [];
  for (let chunkStart = start; chunkStart <= end; chunkStart += chunkSize) {
    const chunkEnd = Math.min(chunkStart + chunkSize - 1, end);
    chunks.push(`Videos ${chunkStart}-${chunkEnd} — watch carefully, note doubts, and mark weak topics`);
  }
  return chunks;
};

export const getMayVideoRange = (dayIndex) => {
  const mayDayIndex = BASE_DAYS.slice(0, dayIndex).filter(isMayDay).length;
  const remainingVideos = 449 - 55;
  const mayDays = BASE_DAYS.filter(isMayDay).length;
  const baseVideosPerDay = Math.floor(remainingVideos / mayDays);
  const extraVideoDays = remainingVideos % mayDays;
  const dayVideoCount = baseVideosPerDay + (mayDayIndex < extraVideoDays ? 1 : 0);
  const previousVideos = mayDayIndex * baseVideosPerDay + Math.min(mayDayIndex, extraVideoDays);
  const start = 56 + previousVideos;

  return { start, end: start + dayVideoCount - 1 };
};

export const rescheduleAbdulBariCourse = (day, dayIndex) => {
  const sections = day.sections.map((section) => {
    if (!isAbdulBariSection(section)) return section;

    if (isMayDay(day)) {
      const range = getMayVideoRange(dayIndex);
      return {
        label: "Abdul Bari DSA Sprint (3-4 hrs)",
        tasks: [
          ...buildVideoChunks(range.start, range.end),
          `End-of-day recall — write a 10-line summary for Videos ${range.start}-${range.end}`,
        ],
      };
    }

    return {
      label: "Coursera C++ Course (1 hr)",
      tasks: [
        COURSERA_CPP_TASKS[dayIndex % COURSERA_CPP_TASKS.length],
        "If time is left — do extra LeetCode first, then certification study",
      ],
    };
  });

  return { ...day, sections };
};

export const replaceWeekdayInternship = (day, dayIndex) => {
  if (isWeekend(day)) return day;

  const sections = day.sections.map((section) => {
    if (!isInternshipSection(section)) return section;

    return {
      label: "Certification (1 hr)",
      tasks: [CERTIFICATION_TASKS[dayIndex % CERTIFICATION_TASKS.length]],
    };
  });

  return { ...day, sections };
};

export const addWeekendInternship = (day, dayIndex) => {
  if (!isWeekend(day) || day.sections.some(isInternshipSection)) return day;

  return {
    ...day,
    sections: [
      ...day.sections,
      {
        label: "Internship (1 hr)",
        tasks: [WEEKEND_INTERNSHIP_TASKS[dayIndex % WEEKEND_INTERNSHIP_TASKS.length]],
      },
    ],
  };
};

export const addBeginnerLeetCode = (day, dayIndex) => {
  const beginnerTask = BEGINNER_LEETCODE_TASKS[dayIndex % BEGINNER_LEETCODE_TASKS.length];
  let addedToExistingSection = false;

  const sections = day.sections.map((section) => {
    if (!section.label.includes("LeetCode")) return section;
    addedToExistingSection = true;
    return { ...section, tasks: [...section.tasks, beginnerTask] };
  });

  if (addedToExistingSection) return { ...day, sections };

  return {
    ...day,
    sections: [
      ...sections,
      { label: "LeetCode from Scratch (20 min)", tasks: [beginnerTask] },
    ],
  };
};

export const addStriverA2Z = (day, dayIndex) => {
  const task = STRIVER_A2Z_TASKS[dayIndex % STRIVER_A2Z_TASKS.length];
  return {
    ...day,
    sections: [
      ...day.sections,
      { label: "Striver A2Z (30 min)", tasks: [task] },
    ],
  };
};

export const expandDailyLeetCodeTasks = (day, dayIndex) => {
  if (day.d.includes("21 May")) {
    return day;
  }

  const sections = day.sections.map((section) => {
    if (!/LeetCode/i.test(section.label)) return section;
    if (section.tasks.length >= 4) return section;

    const existing = new Set(section.tasks);
    const available = LEETCODE_DAILY_TASK_POOL.filter((task) => !existing.has(task));
    const needed = Math.min(5 - section.tasks.length, available.length);
    const start = available.length ? dayIndex % available.length : 0;
    const extras = Array.from({ length: needed }, (_, index) => available[(start + index) % available.length]);

    return { ...section, tasks: [...section.tasks, ...extras] };
  });

  return { ...day, sections };
};

export const MAY_25_LC94_TASK = "LC #94 Binary Tree Inorder Traversal — tree recursion";
export const JUNE_8_SWAP_TASK = "Scratch LC #344 Reverse String — two pointers after a manual swap trace";

export const swapMay25LeetCode94 = (day) => {
  const replacementByDate = day.d.includes("25 May")
    ? { from: MAY_25_LC94_TASK, to: JUNE_8_SWAP_TASK }
    : day.d.includes("8 Jun")
      ? { from: JUNE_8_SWAP_TASK, to: MAY_25_LC94_TASK }
      : null;

  if (!replacementByDate) return day;

  return {
    ...day,
    sections: day.sections.map((section) => {
      if (!/LeetCode/i.test(section.label)) return section;
      return {
        ...section,
        tasks: section.tasks.map((task) =>
          task === replacementByDate.from ? replacementByDate.to : task
        ),
      };
    }),
  };
};

export const removeApiProjectDays = (day) => {
  const sections = day.sections
    .filter((section) => !isApiProjectTask(section.label))
    .map((section) => ({
      ...section,
      tasks: section.tasks.filter((task) => !isApiProjectTask(task)),
    }))
    .filter((section) => section.tasks.length > 0);

  return { ...day, sections };
};

export const isDsaOrUdemyTask = (sectionLabel = "", taskText = "") => {
  const combined = `${sectionLabel} ${taskText}`.toLowerCase();
  return (
    combined.includes("abdul bari") ||
    combined.includes("dsa sprint") ||
    combined.includes("coursera c++") ||
    combined.includes("c++ course") ||
    /video\s+\d+/i.test(combined) ||
    /videos\s+\d+/i.test(combined)
  );
};

export const DAYS = BASE_DAYS
  .map(rescheduleAbdulBariCourse)
  .map(replaceWeekdayInternship)
  .map(addWeekendInternship)
  .map(swapMay25LeetCode94)
  .map(removeApiProjectDays);

export const PHASE_INFO = {
  "Phase 1": { color: "#00F0FF", bg: "rgba(0, 240, 255, 0.08)", border: "rgba(0, 240, 255, 0.25)", label: "Phase 1 — Foundations (Recursion + Arrays + Linked Lists)" },
  "Phase 2": { color: "#BF5AF2", bg: "rgba(191, 90, 242, 0.08)", border: "rgba(191, 90, 242, 0.25)", label: "Phase 2 — Stacks + Queues + Trees" },
  "Phase 3": { color: "#10B981", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.25)", label: "Phase 3 — Hashing + STL + Sorting" },
  "Phase 4": { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.25)", label: "Phase 4 — Graphs + Resume + Final Sprint" },
};

export const getCurrentDayIndex = (date) => {
  const today = getIstLocalDate(date);
  const exactIndex = DAYS.findIndex((day) => {
    const roadmapDate = parseRoadmapDate(day.d);
    return roadmapDate && roadmapDate.day === today.day && roadmapDate.month === today.month;
  });

  if (exactIndex >= 0) return exactIndex;

  const roadmapValues = DAYS.map((day) => {
    const parsed = parseRoadmapDate(day.d);
    return parsed ? parsed.month * 100 + parsed.day : 0;
  });
  const todayValue = today.month * 100 + today.day;

  if (todayValue < roadmapValues[0]) return 0;
  return roadmapValues.length ? roadmapValues.length - 1 : 0;
};

export const getTaskLink = (task, sectionLabel, problemsByNumber = {}) => {
  const text = `${sectionLabel} ${task}`;
  const lcNumber = text.match(/\bLC\s*#?\s*(\d+)\b/i)?.[1];
  if (lcNumber) {
    const slug = problemsByNumber[lcNumber]?.slug;
    return slug ? `https://leetcode.com/problems/${slug}/` : `https://leetcode.com/problemset/?search=${lcNumber}`;
  }

  if (/Abdul Bari|Videos?\s+\d+/i.test(text)) return ABDUL_BARI_UDEMY_URL;
  if (/Striver|A2Z/i.test(text)) return STRIVER_A2Z_URL;
  if (/Coursera C\+\+|C\+\+ Course/i.test(text)) return COURSERA_CPP_URL;
  if (/FastAPI|Pydantic|SQLAlchemy|SQLite|JWT|Render\.com/i.test(text)) return /Render\.com/i.test(text) ? RENDER_URL : FASTAPI_URL;
  if (/GitHub|repo|README|commit|push/i.test(text)) return GITHUB_URL;
  if (/LinkedIn/i.test(text)) return LINKEDIN_URL;

  return "";
};

export const getExtraSectionTaskCandidates = (label) => {
  if (/LeetCode/i.test(label)) return EXTRA_LEETCODE_TASKS;
  if (/Striver A2Z|A2Z/i.test(label)) return EXTRA_STRIVER_A2Z_TASKS;
  if (/Abdul Bari DSA|DSA Sprint|Coursera C\+\+|C\+\+ Course/i.test(label)) return EXTRA_ABDUL_BARI_TASKS;
  if (/Backend|FastAPI|Pydantic|SQLAlchemy|SQLite|JWT|Render/i.test(label)) return EXTRA_BACKEND_TASKS;
  if (/Internship|Certification|LinkedIn|Resume|GitHub|README/i.test(label)) return EXTRA_CERTIFICATION_TASKS;
  if (/Revision|Review/i.test(label)) return EXTRA_REVISION_TASKS;
  return [
    "Pick one extra task from the same topic and get it done.",
    "Review and polish a completed task for better quality.",
    "Do one more practice item related to this section.",
  ];
};

export const STORAGE_KEY = "rishabh_roadmap_v4";
export const CUSTOM_TASKS_KEY = "rishabh_roadmap_custom_tasks_v1";
export const EXTRA_TASKS_KEY = "rishabh_roadmap_extra_tasks_v1";
export const PRIORITY_KEY = "rishabh_roadmap_priorities_v1";
export const SECTION_PRIORITY_KEY = "rishabh_roadmap_section_priorities_v1";
