/**
 * テストケース
 */

$("<span>").text("テストケース").appendTo(testField);

const no04 = 
"904500000"+"003000908"+"610000043"+
"800310000"+"000809607"+"000027300"+
"040038009"+"008000000"+"097060801";
$("<button>").text("No.1").click({
    d:no04,
    s:"use findAllOnlyOne"
}, input_num_text).appendTo(testField);

const kn131 =
"000001080"+"240000000"+"000006000"+
"000000745"+"906000000"+"000000020"+
"000520900"+"003000100"+"000400000";
$("<button>").text("No.2").click({
    d:kn131,
    s:"use findAllOnlyOne"
}, input_num_text).appendTo(testField);

const no50 =
"000200050"+"040000000"+"006000000"+
"000000300"+"060070104"+"200509706"+
"785000060"+"000040030"+"000010800";
$("<button>").text("No.3").click({
    d:no50,
    s:"use findAllOnlyOne"
}, input_num_text).appendTo(testField);

const no54 =
"900000047"+"000704300"+"075100000"+
"002060051"+"000009000"+"000035000"+
"600000000"+"340000200"+"000570000";
$("<button>").text("No.4").click({
    d:no54,
    s:"use findAllOnlyOne"
}, input_num_text).appendTo(testField);

const no59 = 
"510000007"+"000624000"+"000000900"+
"000000043"+"000000006"+"070080000"+
"096000000"+"403900000"+"200070500";
$("<button>").text("No.5").click({
    d:no59,s:""
}, input_num_text).appendTo(testField);

const no78 = 
"205000010"+"009000800"+"300020000"+
"060004000"+"400801000"+"000000002"+
"002700000"+"000090003"+"010000000";
$("<button>").text("No.6").click({
    d:no78,
    s:"findAllOnlyOne, read_and_delete"
}, input_num_text).appendTo(testField);

const no81 =
"300250000"+"000070000"+"009000041"+
"000500000"+"070000060"+"001000000"+
"600000203"+"000040500"+"008001000";
$("<button>").text("No.7").click({
    d:no81,s:""
}, input_num_text).appendTo(testField);

const no88 = 
"900100000"+"000000070"+"000830000"+
"000090020"+"003006000"+"105200008"+
"000000803"+"000000500"+"400002000";
$("<button>").text("No.8").click({
    d:no88,s:""
}, input_num_text).appendTo(testField);

const fp =
"423081000"+"000000201"+"000502308"+
"000000037"+"900820000"+"000710082"+
"000104850"+"010008000"+"080007000";
$("<button>").text("No.9").click({
    d:fp,
    s:"need findPair to solve"
}, input_num_text).appendTo(testField);

const no104 =
"000400065"+"080000000"+"700090000"+
"000000120"+"065008000"+"004000000"+
"000600009"+"100000700"+"000005000";
$("<button>").text("No.10").click({
    d:no104,
    s:"need onlyTwoPair to solve"
}, input_num_text).appendTo(testField);

function input_num_text(e){
    var str=e.data.d;
    for(var i=0; i<81; i++){
        masus[i].val( str[i]>"0" ? str[i] : "" );
    }
    $("#buttonstep").text(e.data.s);
}
//*/