/** start calc */

/** 0x03FE
 * @type {Number}
 */
const np_reset = 0x03fe

/** @class np */
var data = [81];
class np{
    /** @param {Number} d */
    constructor(d){
        this.d = d;
    }
    /** 16進数4桁の表示を返す */
    show(){
        var str = ("0000"+this.d.toString(16)).slice(-4);
        return str;
    }
    /* define in calc.h */
    /** @c NUM(data[n]) @js data[n].NUM() */
    NUM(){ return this.d>>12 }
    /** @c FLAG(data[n], i) @js data[n].FLAG(i) */
    FLAG(i){ return this.d>>i & 1 }
    /** @c set_num(data[n], i) @js data[n].set_num(i) */
    set_num(i){ this.d = this.d & 0x0fff | (i<<12) }
    /** @c flag_on(data[n], i) @js data[n].flag_on(i) */
    flag_on(i){ this.d |= 1<<i }
    /** @c flag_off(data[n], i) @js data[n].flag_off(i) */
    flag_off(i){ this.d &= ~(1<<i) }

    /* define in calc.c */
    reset(){
        this.d = np_reset;
    }
    /** @c sumKouho(n) @js data[n].sumKouho() */
    sumKouho(){
        var sum = 0;
        for(var i=1; i<=9; i++){
            sum += this.FLAG(i);
        }
        return sum;
    }
    
    /** 
     * @deprecated delete_checkが使えないので使わない
     * inputNumandDelete を使う
     */
    inputNum(input){
        if(input !== 0){
            this.set_num(input);
            this.flag_on(input);
            for(var i=1; i<=9; i++){
                if(i !== input){
                    this.flag_off(i);
                }
            //delete_check(input);inputじゃなくてマスの番号を入れなきゃいけないので外に出す
            }
        }else if(input === 0){
            this.d = np_reset;
        }
    }
}

/* define in calc.h */
/* cと同様 */
function LINE(n) {return Math.floor(n/9)}
function ROW(n)  {return n%9}
function BLOCK(n){return Math.floor(LINE(n)/3)*3 + Math.floor(ROW(n)/3)}
function LINE_ST(n) {return Math.floor(n/9)*9}
function ROW_ST(n)  {return n%9}
function BLOCK_ST(n){return Math.floor(n/27)*27 + Math.floor(n%9/3)*3}
function BLOCK_N_ST(n){return Math.floor(n/3)*27 + n%3*3}

function resetAll(){
    for(var i=0; i<81; i++){
        data[i].reset();
    }
}

/**
 * @param {Number} n マス番号
 * @param {Number} input 確定させたい数字
 */
function inputNumandDelete(n, input){
    if(input !== 0){
        data[n].set_num(input);
        data[n].flag_on(input);
        for(var i=1; i<=9; i++){
            if(i !== input){
                data[n].flag_off(i);
            }
        delete_check(n);
        }
    }else if(input === 0){
        // data[n].d = np_reset;
        // 0を入れた時にresetに戻してはいけない
        // 戻してもいいけど(?)
    }
}

/** 全マス走査してフラグ1本ならinputする */
function checkNumAll(){
    for(var n=0;n<81;n++){
        if(sumKouho(n)===1){
            for(var j=1;j<=9;j++){
                if(data[n].FLAG(j)){
                    inputNumandDelete(n, j);
                    //data[n].inputNum(j)
                }
            }
        }
    }
}

/** @param {Number} n マス番号 */
function delete_check(n){
    delete_lrb(n, 3, 1, LINE_ST(n));
    delete_lrb(n, 27, 9, ROW_ST(n));
    delete_lrb(n, 9, 1, BLOCK_ST(n));
}

/**
 * @param {Number} n 
 * @param {Number} byA 
 * @param {Number} byB 
 * @param {Number} start 
 */
function delete_lrb(n, byA, byB, start){
    var i, j, roop;
    for(i=0; i<3; i++)for(j=0; j<3; j++){
        roop = start + i*byA + j*byB;
        //console.log(n);//ok
        //console.log(byA);//ok
        if(roop !== n){
            data[roop].flag_off(data[n].NUM());//JS
            //flag_off(data[roop], NUM(data[n]));//C
        }
    }
}

/** findAllOnlyOne */
function findAllOnlyOne(){
    var isOnlyOne;
    for(var n=0; n<81; n++)for(var f=1; f<=9; f++){
        if(data[n].FLAG(f)){
            isOnlyOne = isOnlyOneIn_lrb(LINE_ST(n), f, 3, 1);
            isOnlyOne += isOnlyOneIn_lrb(ROW_ST(n), f, 27, 9);
            isOnlyOne += isOnlyOneIn_lrb(BLOCK_ST(n), f, 9, 1);
            if(isOnlyOne){
                inputNumandDelete(n, f);
            }
        }
    }
}

/**
 * @param {Number} start 
 * @param {Number} find 
 * @param {Number} byA 
 * @param {Number} byB 
 */
function isOnlyOneIn_lrb(start, find, byA, byB){
    var sum = 0;
    for(var i=0; i<3; i++)for(var j=0; j<3; j++){
        if(data[start+i*byA+j*byB].FLAG(find)) sum++;
    }
    return (sum==1) ? 1 : 0 ;
}



/** end calc */