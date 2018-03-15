const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');

const fs = require('fs'),
path = require('path');



var index = 700;
var min = 700;
var max = 948;
var strArr = [];
var parttern = /([a-z]+).*/;


router.get('/', function(req, res, next){
  let str = `ax/axe 斧头
badge 标记，记号，奖章
bake 烤，烘焙
beach 海滩
beard 胡须
bight 海湾，绳圈
blade 刀片，叶片
blind 瞎的
block 街区，方块
blood 血液
blow 吹
blunt 迟钝的，不锋利的
boots 靴子
bored 无聊的，烦人的
bounce 弹跳
bow 鞠躬，弯腰
bowl 碗
break 打破 破裂
breeze 微风
brick 砖
bright 明亮的，愉快的
bring 带来，促使
bulb 电灯泡，球状物
bull 公牛，雄性的
bump 撞击，碰撞
cheese 奶酪
chest 胸，箱子
child 小孩
chips 炸土豆条
choose 选择，决定
clerk 职员，店员
clothes 衣服
club 俱乐部，社团
coach 教练，长途公车
coal 煤
couch 睡椅，长沙发
court 法院
crawl 爬行
crisps 薯片
crown 王冠，顶点
curry咖喱，咖喱粉
crash 坠毁，破产
crutch 拐杖，支柱
deer鹿
die死亡，凋零
dig 刺，挖
dish 盘，餐具
drive 架势
due 应付款
fear 害怕，恐惧
feed 饲料，饲养
fetch取得，诡计
film 电影，胶卷
fire 火
flour 面粉
flow 流动，流量
flush 激动，奔流
fold 折叠，合拢
frame 框架，结构
freeze 冻结，凝固
fridge电冰箱
fries 炸薯条
full完全的，满的
fun 乐趣，玩笑
geese鹅
gift礼物，天赋
gills鱼鳃
glue 胶
gold 金，黄金
grab 霸占，夺取之物
gray/grey 灰色
grow 使生长，种植
gym 健身房，体育馆
hail 冰雹
haze阴霾，薄雾
heart心脏，心形
heat 高温，压力
height高地，高度
hive蜂房，蜂巢
hoop铁环
hop单足跳跃
horn喇叭，号角
hose软管，长筒袜
hurt痛苦，危害
joke玩笑，笑话
junk垃圾，废物
kelp 海藻
kind 种类，和蔼的
knees膝盖
learn 学习
lie 谎言
load负载，装载量
lock锁
log记录，原木
mice老鼠
mop拖把
most大部分的，多数
moth娥，蛀虫
mouse鼠标，老鼠
near近的，亲近的
noise噪音，杂音
noun名词
peace 和平，平静
peck啄食，扔
pick选择，挖
pie馅饼
pipe管，烟斗
pitch沥青，投掷
plain简单的，朴素的
plus加，正号
poem诗
point要点，得分
pond池塘
pot壶，盆
pound英镑，重击
pour倾泻，流出
price价格，价值
prince王子，国君
proud自豪的，得意的
pull拉，牵引力
punch冲压机，钻孔机
pure纯洁的，清白的
purse钱包
push推，推动
ramp斜坡，坡道
rank排，等级
risk风险，冒险
roast烤肉，烘烤
rock岩石，摇滚乐
rough艰苦，粗糙的
round 圆，循环
row 行，排
rude粗鲁的，无礼的
scales天平，磅秤
scared害怕的
screw螺旋，螺丝钉
sell销售
sew缝合
shine照射，照耀
shorts短裤
shout呼喊，大声说
shut关闭
sick厌恶的，生病的
sink水槽
sketch素描，略图
skip跳跃
slim苗条的，修长的
smooth光滑的
snare陷阱，圈套
soft柔软的，温柔的
soon一会，不久
sour酸味，苦事
source来源，水源
spin旋转，疾驰
splash污点，卖弄
sports运动
squawk抗议，诉苦
stall货摊，畜栏
steak牛排，肉排
stem干，茎
still仍然，但是
stone石头，结石
stool凳子，厕所
store商店，仓库
stove火炉，窑
strait海峡，困境
street街道
strike罢工，打击
stripe条纹，种类
struck罢工，打击
sweat汗，水珠
sweep打扫，扫除
term术语，学期
thick厚的，浓的
thief小偷，贼
thin薄的，瘦的
think想，想法
third第三、三分之一
though虽然，尽管
thumb拇指
tie领带，鞋带
toast干杯，烤面包
tongue舌头，语言
touch接触，触觉
track轨道，足迹
trip旅行
true真实，准确
trunk树干，躯干
truth真理，事实
twig小枝，末梢
type类型，品种
vase花瓶
verb动词
wear穿着
wedge挤进
week周，星期
wide宽的，广阔的
wife 妻子，夫人
wild野生的
won赢得
wood木材，木制品
world世界，领域
worse更坏的，更差的
worst最坏的，最差的
worth价值，财产
wrong错误的，失常的
yawn哈欠，裂口
ability 能力
abrasive 粗糙的
absent缺席的
accept 接受
accommodating容纳
accompaniment 伴随物
accordion手风琴
actor 男演员
actress 女演员
address 地址
administration行政机关
administrative管理的
admonish劝告
adversary对手
advertisement广告
advice 建议
aerospace航空与航天空间
affected受到影响的
affluent富裕的
agent代理商
album相册
alcohol酒精
alien外国的
alignment结盟; 队列
ambience气氛
ambiguous含糊的
ambulance救护车
American美国人
among在...之间
amuse娱乐
angry生气
animation活泼
animator动画片绘制者
announcer播音员
April四月
aquarium水族馆
Arctic北极的
arrive到达
arteries干线
Asian亚洲
association协会
athlete运动员
athletics田径运动
attitude态度
attraction吸引人的
August八月
auntie/aunty阿姨
Australia澳大利亚
author作者
aviary鸟类饲养场
avocado鳄梨
avoid避免
awful恶心的
backpack背包
badminton羽毛球
baggage勋章
bakery烘焙
balance平衡
balcony阳台
ballet芭蕾舞
banker银行家
barbecue户外烧烤
barber发型师
basic基本的
basin盆地
bassoon巴松管
baton接力棒
battle战役
beaver河狸
because因为
beefsteak牛排
beetle甲壳虫
behind在。。后面
belong属于
below在下面
berries浆果
beside除此之外
better更好的
between在中间
biscuit饼干
blizzard暴风雪
bookcase书柜
bookshelf书架
bookstore书店
border边界
boring烦恼的
bottle瓶子
bottom底部
bowling保龄球
bracelet手镯
Braille盲文
bravery勇气
Brazil巴西
Britain大不列颠
brochure册子
broken坏的
bronze青铜
bucket水桶
buffet自助餐
bumper丰盛的
bunny 可爱女郎
butter黄油
button扣子
cabbage卷心菜
cable缆绳
Cairo开罗
calendar日历
camel骆驼
cancel取消
canteen餐厅
capillary毛细管
capital首都
captain上尉，船长
carbohydrate碳水化合物
career事业
careful仔细的
carpet地毯
carpool拼车
carry搬，拿
carton硬纸盒
caterpillar毛虫
ceiling天花板
cello大提琴
certain必然的
chapter章，回
charity慈善
chimney烟囱; 壁炉
chopsticks筷子
Christmas圣诞节
cigar雪茄
circle圆圈
circus马戏团
civilized文明的
clarinet竖笛
classic典型的
cleaner吸尘器，保洁员
climate气候
clinic诊所
closet壁橱
coaster沿岸贸易船
cockroach蟑螂
cocktail鸡尾酒
college学院
collapse崩溃; 倒塌
colleague同事
collect收集
colorful多姿多彩
column圆柱
comfort舒适; 安慰
comic连环画
comment评论
common共同点
compass指南针
compete竞争
competition比赛
competitor参赛者
complain抱怨
concert演唱会
confirm确认
congee告别，鞠躬
Congo工夫茶
congratulations祝贺
conscience良心; 道德心
constrictor括约肌，大蟒
construct建筑
contents内容
continent大陆
control控制
copy抄写，复印
coral珊瑚
corner角落
costume演出服，服装
council委员会;政务会
country国家，乡村
coupon优惠券; 息票
cracker爆竹; 薄脆饼干
cranberry酸果蔓的果实
crayon蜡笔
crazy疯狂的
cricket板球; 蟋蟀
crosswalk斑马线
crowded拥挤的
crumple弄皱; 碎裂
crunchy松脆的; 硬脆
cuckoo布谷鸟，杜鹃
curious好奇的
cushion垫子;
cymbals钹
deadline截止期
deafening震耳欲聋的;
December 十二月
decide决定
decision决定，决议
defeat挫败; 击败
defense防卫，防卫物
definitely明确地; 确切地
delicate纤弱的; 易损的
deliver交付; 发表; 递送
dentist牙医
department部门
deputy 代表，副的
descend 下降，下去
describe 描述，形容
designer 设计师
dessert  甜点
destination 目的地
detail 细节
detect 察觉，探测
detective 侦探
diaphragm 隔膜，快门
didgeridoo 迪吉里杜管（乐器）
diet 饮食
discuss 讨论
disease 疾病
disker 圆盘耙
dissuade 劝阻
distance 距离
diver 潜水者
dollar 美元
donkey 炉子
dormitory 宿舍
doughnut 油炸圈饼
donut 甜甜圈
download 下载
downstairs 楼下
drawer 抽屉
drugstore 药店
duckling 小鸭子
dumpling 饺子
duration 持续
durian/durion 榴莲
duty 责任，关税
eagle 老鹰
earache 耳朵痛
earn 赚，获得
earring 耳环
Easter 复活节
edition 版本
efficient 有效的
Egypt 埃及
electric 电的
empty 空的
energy 能量
England 英国
enjoy 享受
enter 进入，参加
enthusiastically 热心地
entrance 入口
equator 赤道
equipment 设备
escalator 自动扶梯
escaped 逃离
Ethiopia 埃塞俄比亚
evade 逃避
every 每个
evil 邪恶的
exact 准确的
exam 考试
excuse 借口，原谅
exhibitor/exhibiter 展出者
experiences 经历（复）
experiment 实验
explore 探索
extinct 灭绝
extremely 非常
famous 著名的
fantastic 奇异的，极好的
fashion 时尚
favored 有利的，宠爱
fever 发烧
fifty 五十
flashlight手电筒，闪光灯
follow 跟随
footbridge 人行桥
footsteps 脚步（复）
forces 势力
forehead 前额
foreign 外国的
forty 四十
forward 向前的
french fries 炸薯条
frighten 害怕
frozen 冻结的
function 功能
funny 有趣的
furnace 火炉
future 将来
gallery 画廊
garage 车库，汽车修理厂
gardener 园丁
gather 聚集
gentle 文雅的
gently 轻轻地，温柔地
geography 地理
ginger 姜
glamorous/glamourous 富有魅力的
glassware 玻璃器皿
goggles  护目镜
goldfish 金鱼
gravity 重力，地心引力
grocer 杂货店
guitar 吉他
habit 习惯
Halloween 万圣节
handicraft 手工艺
handle 把手，处理
handsome 英俊的
happen 发生
harbour/harbor 海港，怀有
hatches 孵化
headache 头痛
headline 大标题
headphone 双耳式耳机
healthy 健康的
heavy 重的
helmet 头盔
helicopter 直升飞机
hero 英雄
hockey 曲棍球
holiday 假期
hometown 家乡
honest 诚实的
honor/honour 荣誉
hopscotch 跳房子游戏
hotel 旅馆
housework 家务事
human 人
hundred 百
hungry 饿的
hurray 万岁呼声
husband 丈夫
hygienic 卫生的
icicle 冰柱
idea 想法
immigrant 移民
important 重要的
impress 印象
include 包括
income 收入
indeed 的确
injection 注射
inside 在…之内
inspire 激发，鼓舞
instead 替换
instrument 乐器
interest 兴趣
interesting 有趣的
internet 因特网
invent 发明
inventor 发明家
investigate 调查
island 岛屿
jellyfish 水母
joey 有首
July 七月
Katydid 蝈蝈儿，纺织娘
kindergarten 幼儿园
kiwifruit 猕猴桃
knapsack 背包
knowledge 知识
laboratory 实验室
ladybug 瓢虫
landing 登陆
lankly 细长地，瘦地
lantern 灯笼
laptop 笔记本电脑
laundry 洗衣店
lawyer 律师
leaping 跳跃
leather 皮的
lecture 演讲
letter 信，字母
lever 杠杆
leverage 手段，利用，杠杆作用
librarian 图书管理员
lighting 照明设备
lightning 闪电
limit 限制
linen 亚麻的
listen 听
litter 垃圾，乱丢
lizard 蜥蜴
lobster 龙虾
lollipop 棒棒糖
London 伦敦
lookout 监视
machine 机器
madam 夫人
magic 神奇的
magnet 磁铁
mailbox 邮箱
mailman 邮递员
mango 芒果
mansion 大厦，宅邸
manual 手工的
marine 海生的
marker 记分员，书签，记号笔
massage 按摩
material 材料
matter 物质
measure 测量
meatball 肉丸
medal   金属
medalist 奖牌设计者
medicine  药
memorable 值得纪念的
message 信息
messy   凌乱的
metal   金属
meter   计量器
Mexico  墨西哥
microfiber 微纤维
midday   正午
millimeter 毫米
minibus小型公共汽车
minute 分钟
mirror 镜子
mistake 错误
mixture 混合
model  模型
modern 现代的
monster 怪物
mosaic  马赛克
motorcycle 摩托车
movie  电影
multiply 乘
mural 壁画
muscle 肌肉
museum 博物馆
mushroom 蘑菇
mystery 秘密
napkin 餐巾纸
naughty 调皮的
nectar 花蜜
neighbor/neighbour邻居
nephew 侄子
nervous 紧张的
Nobel 诺贝尔
noisy 吵闹的
nonliving 无生命的
nonrenewable 不可再生的
normal 正常的
notebook 笔记本
November 十一月
nylon  尼龙织品
obviously 明显的
occasion 机会
ocean 海洋
October 十月
office 办公室
official 公务员
opera 歌剧
opinion 观点
opossum 负鼠
opportunity 机会
opposite 相反的
orangutan 猩猩
orbit 轨道
orchard 果园
orchestra 管弦乐队
ordinary 普通的
origami 折纸手工
Ottawa 渥太华
otter 水獭
outside 外面
oval 椭圆形
overcome 战胜
overweight 超重的
oxford 牛津鞋
pagoda 塔
painter 画家
pancake 烙饼
panpipes 排箫
parade 游行
parrot 鹦鹉
participate 参加
passage 段落
passport 护照
pasta 意大利面
paste 粘贴
patient 病人
pavement人行道
penguin 企鹅
people  人
pepper  辣椒
perfect 完美
person  人
petal   花瓣
photo  照片
photocopier影印机
photograph照片
physical身体的
physics物理学
piano 钢琴
picnic 野餐
piercing刺骨的
pigeon 鸽子
pilot 飞行员
pinecone松球
pinwheel纸风车
pitcher大水罐
pity同情
plastic塑料制品
plateau 高原
playground 操场
pleasant可爱的
polite有礼貌的
pollen花粉
popular 受欢迎的
porridge粥
positively 肯定的
postcard 明信片
poster 海报
powder 粉
practice 练习
precious 宝贵的，
premier 总理
prepare 准备
presence出席
preserve保护
pretend 假装
private 私人的
problem 问题
produce 生产
program节目
project 项目
projector放映机
promise许诺
pronounce发音
property财产
prove 证明
provide 提供
punish处罚
pupil  小学生
puzzled 困惑的
quantifier数量词
question 问题
quickly 快速的
quiet  安静的
quotient 商数
radium  镭
raindrop 雨滴
rainforest 热带雨林
raking 粗筛
react 反应
record  记录
recorder 录音机
rectangle长方形
recycle回收利用
recycling reduce回收减少
refrigerator  冰箱
regard    认为
regularly  有规律地
remember  记得
renewable可继续的
repeat   重复
reply    回答
request  要求
reserve  储备
reservoir  蓄水池
resources  勇气
restroom  盥洗室
return   归来
reuse  重新使用
revise  修订
rewarding  值得的
rhyming  押韵
riddle  谜语
rider  骑手
rival  对手
roller  滚筒
rooster  公鸡
roundsters 跑车：流浪者
rubbish  垃圾
rural   乡下的
safety  安全
sailboat 帆船
salmon 鲑鱼
sandwich 三明治
satisfying令人满意的
sausage 香肠
scanner扫描器
scary   可怕的
science  科学
scientist 科学家
scissors  剪刀
screwdriver螺丝刀
sculpture  雕刻品
seagull  海鸥
season  季节
seaweed   海草
secondary  中等的
secret  秘密
section   部分
sentence  句子
September 九月
service   服务
several  几个
sewing  缝纫
shady背阴的
sheriff 州长
shining 光亮的
shiny 闪耀的
shooting 射击；摄影
shopping 购物
shower 淋浴；阵雨
shutters 百叶门窗
sidewalk 人行道
signal 信号
signature 签名
silence 沉默
silliness 愚蠢
silly 愚蠢的
silver 银色的
simple 简单的
sincerely 真诚地
skateboarding滑板运动
sledding 乘雪橇
sleepy 欲睡的；困乏的
slippers 拖鞋
slippery 滑的；狡猾的
smartphone 智能手机
sneakers 胶底运动鞋
sneezing 打喷嚏
snowflakes 雪花片
soccer 英式足球
softball 垒球
soggy 浸水的
soldier 士兵
spaceship 宇宙飞船
special 特殊的
spider 蜘蛛
spiral 螺旋；旋涡
spirit 精神
sportsman 运动员
squirrel 松鼠
stadium 体育馆
standard 标准的
stapler 订书机
starfish 海星
starter 起动机
station 车站
stationery 文具
statue 雕像
storybook 故事书
striking 振奋人心的
stubborn 顽固的
subtitle 副标题
subtraction 减法
suburb 郊区
suggest 建议
sundae 圣代冰淇淋
sunshine 阳光
supplies 物资；供应品
surface 表面；表层
surgeon 外科医生
surprised 惊讶的
switches 开关；交换器
swordlike 剑
syllable 音节
tablet 药片
tadpole 小蝌蚪
taiga 针叶树林地带
talented 有才的
tambourine 小手鼓
target 目标
taro 芋头
temperate 温度
temple 庙宇；寺院
tethered 用绳或链拴住
theater 剧院
thicket 灌木丛
thirsty 口渴的
thirty 30
thoughtful 体贴的
thousand 千
thunder 雷
thunderstorm 风暴
timpani 定音鼓
tiring 累人的，无聊的
tired 疲倦的
tissue 纸巾
toilet 厕所
tonight 今晚
toothache 牙痛
toothpaste 牙膏
tornado 龙卷风
total 全部的
towards 朝，向
trachea 气管
traditional 传统的
traffic 交通
transport 交通运输
trash 垃圾
travel 旅游
triangle 三角形
trombone 长号
tropical 热带的
trouble 麻烦
trousers 裤子
trumpet 喇叭
tuba 大号
tundra 苔原；冻土地带
tunnel 隧道
turbine 涡轮
turkey 火鸡
twinkle 闪烁；发亮
typist 打字员
ugly 丑陋的
understand 理解
unhappy 不开心的
unhealthy 不健康的
university 大学
upstairs 楼上
urban 城市的
usual 通常的
value 价值
Vancouver 温哥华
vibrate 振动
victim 受害人
video 录像
visit 拜访
waiter 男服务员
waitress 女服务员
wander 徘徊
warning 警告
warrior 战士
waterfall 瀑布
website 网站
weekdays 工作日
welcome 欢迎
wheelchair 轮椅
wherever 无论什么地方
whisky 威士忌酒
windmill 风车
winner 获胜者
wonderful 精彩的
worker 工人
workman 工匠
worry 担心
yesterday 昨天
zamarra 羊皮外套
`;

  // let pattern = /(\b([a-z]+)\b/
  //console.log(str.split('\n'))
  strArr = str.split('\n');
  let engArr = [];


  translate(strArr, index, req, res, next);


})



function translate(strArr, index, req, res, next){


  // if(index < strArr.length-1){
  //   console.log(strArr[index].split(' ')[0]);
  //   index++;
  //   translate(strArr, index, req, res, next)
  //   return;
  // }


  // console.log(strArr[index]);
  // console.log(index);
  // if(index < strArr.length - 1){
  //   index++;
  //   translate(strArr[index], req, res, next);
  //   return;
  // } else{
  //   // res.send({
  //   //   data: strArr
  //   // })
  //   console.log(strArr)
  //   return;
  // }
  // return;
  // //console.log(strArr[index], index)
  // if(!strArr[index]){
  //   if(index < strArr.length - 1){
  //     index++;
  //     translate(strArr[index], req, res, next);
  //     return;
  //   } else{
  //     // res.send({
  //     //   data: strArr
  //     // })
  //     console.log(strArr)
  //     return;
  //   }
  // }
  // if(strArr[index].indexOf(' ')){
  //
  // } else{
  //   if(index < strArr.length - 1){
  //     index++;
  //     translate(strArr[index], req, res, next);
  //     return;
  //   } else{
  //     res.send({
  //       data: strArr
  //     })
  //     return;
  //   }
  // }
  //console.log(parttern.exec(strArr[index]))
  let url = 'http://dict.youdao.com/w/'+ parttern.exec(strArr[index])[1] + '/#keyfrom=dict2.top';
  //console.log(url)
  superagent.get(url)
    .end(function(err, sres){
      if(err){
        return next(err);
      }
      $ = cheerio.load(sres.text);
      //console.log(url)
      //console.log(cheerio.load(sres.text));
      let phonogram = $('.baav .pronounce .phonetic').eq(0).text();
      //console.log(phonogram)
      phonogram = phonogram.replace('[', '\/');
      phonogram = phonogram.replace(']', '\/');

      strArr[index] = strArr[index] + ' ' + phonogram;
      //console.log(index, strArr.length)
      if(index < max){
        index++;
        //console.log('index', index, url, strArr[index])
        translate(strArr, index, req, res, next);
        return;
      }

      //strArrStr = strArr.join('\n')



      // fs.writeFile(filename,data,[options],callback);
      let resArr = strArr.slice(min, max)
      let resStr = resArr.join('\n');
      console.log(resStr)
var w_data = resStr;
var w_data = new Buffer(w_data);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.writeFile(min + '~' + max+'.doc', w_data, {flag: 'a'}, function (err) {
   if(err) {
    console.error(err);
    } else {
       console.log('写入成功');
       //fsFunc(strArr, index, req, res, next);
    }
});







      // res.send({
      //   data: strArr.slice(min, max)
      // })
      // return $;
      console.log(strArr)
    })
}


function fsFunc(strArr, index, req, res, next){
  if(max < 900){
    max += 100;
    min += 100;
    console.log(min, max)
    translate(strArr, index, req, res, next);
  }

}



module.exports = router;
