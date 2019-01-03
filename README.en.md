English | [简体中文](./README.md)

# tic-tac-toe-ai (Alpha Go of tic-tac-toe)
> A tic-tac-toe program can learn. 
  
[![Build Status](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai.svg?branch=master)](https://travis-ci.org/Jeff-Tian/tic-tac-toe-ai)
[![Maintainability](https://api.codeclimate.com/v1/badges/57d198bf961c94ea3b22/maintainability)](https://codeclimate.com/github/Jeff-Tian/tic-tac-toe-ai/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/57d198bf961c94ea3b22/test_coverage)](https://codeclimate.com/github/Jeff-Tian/tic-tac-toe-ai/test_coverage)

This is my first ai program. It was started by learning the [tic-tac-toe tutuor](https://reactjs.org/tutorial/tutorial.html) of React Js, after finished the  homeworks, I think it's cool to make a machine learning enabled tic-tac-toe program.

![Screenshot](public/images/screenshot.png)

## Visit it online:
[https://jeff-tian.github.io/tic-tac-toe-ai/](https://jeff-tian.github.io/tic-tac-toe-ai/)

## Run local:
```bash
git clone https://github.com/Jeff-Tian/tic-tac-toe-ai.git
npm install -g create-react-app
npm install
npm start
```

## Run tests:
```bash
npm test
npm run coverage
```

## Release History:
* 2.0.0
    * CHANGE: Add a new factor considering do not import new threats when there is a chance to win.
    * IMPROVEMENT: Use ant-d mobile layout.
* 1.0.0
    * CHANGE: Found a better evaluation function to make the program never lose even it is at the bad position in game. But if the learning status is enabled, then the evaluation function keeps change that makes the program stupid after several succeeded wins. The good thing is it can recover quickly after lose.
    * It can beat the opponent even it is trying to win in 2 lines.
    * When play with the random gamer, the winning percentage can achieve 93%, the rest 7% is draw. In other words, the random gamer can never win.
    
* 0.1.0
    * Implemented a rough evaluation function, can become smart after 6 losings. But if the opponent uses some advanced strategy such as trying to set 2 lines to win, then this program will always lose.
    * Can get 84% winning percentage with random gamer.
    
## Contributing

1. Fork it (<https://github.com/Jeff-Tian/tic-tac-toe-ai>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Support
Support is welcome if you find this project helpful. The Alipay is recommended because both of us can benefit from its red packages.

|Get red package|Support me|
|-----|----|
|![支付宝红包码](./public/images/alipay-red-package.png)|![支付宝收钱码](./public/images/alipay-receive-money.jpg)|
