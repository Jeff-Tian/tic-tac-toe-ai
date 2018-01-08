tic-tac-toe-ai (Alpha Go of tic-tac-toe)  [![Build Status](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai.svg?branch=master)](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai)
=================
=> [中文版](README.md)

This is my first ai program. It was started by learning the [tic-tac-toe tutuor](https://reactjs.org/tutorial/tutorial.html) of React Js, after finished the  homeworks, I think it's cool to make a machine learning enabled tic-tac-toe program.

**Visit it online:** https://jeff-tian.github.io/tic-tac-toe-ai/

Run local:
---
```bash
git clone https://github.com/Jeff-Tian/tic-tac-toe-ai.git
npm install -g create-react-app
npm install
npm start
```

The winning rate trend：
----------
|  X \<Random> # |  X \<Random> % |  O \<AI> # |  O \<AI> %  |  Fair #  | Fair %  |  Total #  |
|--------------|--------------|------------|-------------|--------|-------|----------|
|      12      |      12%     |     80     |     80%     |    8   |   8%  |    100   |
|      21      |      10%     |    166     |     83%     |   13   |   7%  |    200   |
|      28      |       9%     |    247     |     82%     |   25   |   8%  |    300   |
|      37      |       9%     |    333     |     83%     |   30   |   7%  |    400   |
|      71      |       8%     |    752     |     84%     |   77   |   9%  |    900   |
|     164      |       8%     |   1669     |     83%     |  167   |   8%  |   2000   |
|     824      |       8%     |   8352     |     83%     |  843   |   8%  |  10024   |


![The learning behavior of AI #](public/images/ai%23.png)

![The learning behaviro of AI %](public/images/ai%25.png)

Run tests:
---
```bash
npm test
npm run coverage
```


