# token model


## project1
the front end code based on first-forever

## project2
the contracts:

### PowhToken.sol:
Powh3D + ERC2
https://microscope.cryptape.com/#/account/0x8Dfe3E27c3761272180513e4603DcCF01FB1DE7f

### Vote.sol
can set the arguments of PowhToken.sol
https://microscope.cryptape.com/#/account/0x7a7c7Fa336DC88007E372aCA9194192057691D8b

### Gateway.sol
communication within ethereum and appchain
https://microscope.cryptape.com/#/account/0x5F96D1C6894354F61BD3b9907a090BB0ae3baF2c

### SimpleStore.sol
store private strings of player
https://microscope.cryptape.com/#/account/0xbBd0d2b70D63b5DF19E3852EfCA3d473d8376B24



## Detail

这个token里面有持币分红，锁仓投票以至自进化，和跨链交易。

### P3D
1. 第一个P3D代币的价格定在0.0000001ETH，此后每有一枚代币被购买，价格就上升；每有一枚代币被售出，价格就下降。

2. 每次购买或出售代币时，其中会有10%的费用被抽取，作为P3D持币者的分红，按照代币的持币量平均分配给所有持币者。

### BHT

这个P3D合约继承一个ERC20的标准合约，并且重写（override）了transfer，transferFrom等函数，并把它命名为BHT，BitRunHackthonToken。

### Vote
这个投票合约类似EOS的dpos，可以通过接口读取改版后的P3D合约合约里面的余额。每个持有token的用户可以投票给某个地址，然后选出21个地址。任何人可以通过锁仓1000个BHT，他就可以发起提案，提案可以设置有效时间，但是最短为2天，如果在有效时间内有超过10个议员投票，并且支持票多于反对票，提案通过，否则提案失效。提案能够做什么:

1、设置分红系数；

2、设置每买卖一个token时token的价格变化基数。

3、设置发起提案时需要质押的token数量。

4、发起token合约锁仓，就是说遇到黑客等对大家都不利的情况，可以发起提案禁止相关函数执行。

5、设置议员地址的个数。这样这个token模型就不会一成不变的了，它会跟随整个社区一同进化。


### 哈希锁定。

跨链合约的实现

我用以太坊上面一个ERC20 token，Loom来举例，实现用Loom来买我们发行在appchain上的BHT。

现在玩家P在以太坊上有1000 loom。他想用这1000个Loom来买BHT。

第一步，P调用Loom合约里面的approve函数，允许以太坊上的Gateway合约A去转移他地址下的1000个Loom。

第二步，P先生成一个密码，就是一个字符串，然后通过对该字符串进行sha3算法的hash。

第三步，P调用Gateway合约里面的recharge函数，并且把hash以及token数量1000当作参数。Recharge函数做了什么呢？它会先调用Loom合约里面的transferFrom函数，把P下面的1000个Loom转移到合约，如果成功了，它会将P会记录P打进来1000Loom，锁定时间，以及对应的hash。那个锁定时间是代表项目方必须在锁定时间结束前完成剩下的流程，不然玩家P可以将这1000个LOOM转移出去。

第四步，轮到项目方F了，他看到玩家P已经把1000Loom转进入合约。而且他和玩家P已经商量好了一个NOS（nervos的原生coin）兑换10个Loom，为什么是这个兑换比，因为nervos比Loom牛B 10倍(^_^)。我们这里先假设NOS是appchain上的一个ERC20合约，所以项目方F就在appchain上重复玩家P在以太坊上的这三步，但是有四点细节不同，一是输入的hash需要等于玩家P提交的那个hash，二是那个锁定时间需要小于玩家P的锁定时间并且给自己预留足够的时间去回以太坊进行操作，三是那个token数量是100，四是设置这笔NOS只允许转给玩家P的appchain的地址。

第五步， 玩家P在appchain上调用withdrawTo()，输入之前那个密码Key，以及F的地址，合约通过计算keccak256(key），验证结果等于F之前输入的hash，所以玩家P就能够转走100NOS。

第六步，全网都知道了这个Key，但是这时任何人调用以太坊上的Gateway合约A的withdrawTo，合约就会将1000个Loom转移给玩家F，完成跨链。
