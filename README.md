tic-tac-toe-ai   [![Build Status](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai.svg?branch=master)](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai)
=================

这是我写的第一个AI程序。起源于在学习完 react js 的 [tic-tac-toe 教程](https://reactjs.org/tutorial/tutorial.html)后，我对自己说，为什么不把它升级成一个 AI 版本呢？

**在线访问：** https://jeff-tian.github.io/tic-tac-toe-ai/

###本地运行：
```bash
git clone https://github.com/Jeff-Tian/tic-tac-toe-ai.git
npm install -g create-react-app
npm install
npm start
```

###获胜率变化：
|  X \<随机> # |  X \<随机> % |  O \<AI> # |  O \<AI> %  |  平 #  | 平 %  |  总计 #  |
|:------------:|:------------:|:----------:|:-----------:|:------:|:-----:|:--------:|
|      12      |      12%     |     80     |     80%     |    8   |   8%  |    100   |
|      21      |      10%     |    166     |     83%     |   13   |   7%  |    200   |
|      28      |       9%     |    247     |     82%     |   25   |   8%  |    300   |
|      37      |       9%     |    333     |     83%     |   30   |   7%  |    400   |
|      71      |       8%     |    752     |     84%     |   77   |   9%  |    900   |
|     164      |       8%     |   1669     |     83%     |  167   |   8%  |   2000   |
|     824      |       8%     |   8352     |     83%     |  843   |   8%  |  10024   |


![AI 学习表现 #](public/images/ai%23.png)

![AI 学习表现 %](public/images/ai%25.png)

###测试：
```bash
npm test
```


