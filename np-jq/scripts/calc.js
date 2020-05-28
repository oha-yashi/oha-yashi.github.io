/** start calc */

/** 
 * 0x03FE
 * @type {Number}
 */
const np_reset = 0x03fe

/** 
 * @class np 
 * @c data[n]
 * @js data[n].d
*/
var data = [];
class np{
    /** @param {Number} d */
    constructor(d){
        this.d = d;
    }
    /** 16進数4桁の表示を返す */
    hex(){
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
        if(data[n].sumKouho()===1){
            for(var j=1;j<=9;j++){
                if(data[n].FLAG(j)){
                    inputNumandDelete(n, j);
                }
            }
        }
    }
}

/** 
 * box[n]の値を周囲の行列ブロックの候補から除く
 * @param {Number} n マス番号
 */
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
        if(roop !== n){
            data[roop].flag_off(data[n].NUM());//js
            //flag_off(data[roop], NUM(data[n]));//c
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


/** read_and_delete */
function read_and_delete(){
    for(var lrb=0; lrb<9; lrb++){
        for(var kouho=1; kouho<=9; kouho++){
            read_delete_lrb(lrb*9, kouho, 3, 1, 9, 'b');
            read_delete_lrb(lrb, kouho, 27, 9, 1, 'b');
            read_delete_lrb( BLOCK_N_ST(lrb), kouho, 9, 1, 3, 'l');
            read_delete_lrb( BLOCK_N_ST(lrb), kouho, 1, 9, 27, 'r');
        }
    }
}

/**
 * @param {Number} start - 開始マス
 * @param {Number} kouho - 探索する候補
 * @param {Number} byA --- 探索用変数
 * @param {Number} byB
 * @param {Number} byC
 * @param {String} c ----- 2回目ループ用の変数
 */
function read_delete_lrb(start, kouho, byA, byB, byC, c){
    var sum = [], keep = [];
    var i, j, roop, sum_all, cont;
    sum_all = cont = 0;

    for(i=0; i<3; i++){
        sum[i] = 0;
        for(j=0; j<3; j++){
            roop = start + i*byA + j*byB;
            if(data[roop].NUM() === kouho) return;
            sum[i] += data[roop].FLAG(kouho);
        }
        sum_all += sum[i];
    }
    for(i=0; i<3; i++){
        keep[i]=0;
        if(sum[i] === sum_all){
            for(j=0; j<3; j++){
                roop = start + i*byA + j*byB;
                keep[j] = roop;
            }
            cont = i+1;
            break;
        }
    }

    if(!cont--) return;
    switch(c){
        case 'l': start = LINE_ST(start + cont*byA); break;
        case 'r': start = ROW_ST(start + cont*byA); break;
        case 'b': start = BLOCK_ST(start + cont*byA); break;
    }
    
    NEXT:
    for(i=0; i<3; i++)for(j=0; j<3; j++){
        roop = start + i*byB + j*byC;

        if(roop===keep[0] || roop===keep[1] || roop===keep[2]){
            //do nothing
        }else{
            data[roop].flag_off(kouho);
        }
        //*/
        /*
        for(var k=0; k<3; k++){
            if(roop===keep[k]){
               continue NEXT;
            }
        }
        data[roop].flag_off(kouho);
        //*/

    }
}
//*/



function findPairAll(){
    for(var i=0;i<9;i++){
        findPair(i*9, 3, 1);
        findPair(i, 27, 9);
        findPair(BLOCK_N_ST(i), 9, 1);
    }
}

/**
 * ペアになっている候補を見つけて、ブロック内でその候補を独占させる
 * @param {Number} start
 * @param {Number} byA
 * @param {Number} byB
 */
function findPair(start, byA, byB){
    var i, j, k, l, roop, roop2, cnt;
    for(i=0;i<3;i++)for(j=0;j<3;j++){
        roop = start + i*byA + j*byB;
        cnt = 0;
        if(data[roop].sumKouho()==2){
            //data[roop]が候補2つ
            for(k=0;k<3;k++)for(l=0;l<3;l++){
                roop2 = start + k*byA + l*byB;
                if(data[roop].d === data[roop2].d)cnt++;
            }
            if(cnt==2){
                //data[roop]のペアがブロックを独占
                for(k=0;k<3;k++)for(l=0;l<3;l++){
                    roop2 = start + k*byA + l*byB;
                    if(data[roop2].d !== data[roop].d){
                        data[roop2].d &= ~(data[roop].d);
                        //data[roop]のフラグを消す
                    }
                }
            }
        }
    }
}
//*/


/** 
 * 候補 p, q が 走査ブロック内で同じ2マスにのみ入っているとき、
 * その2マスで p, q 以外の候補を消す
 */
function only_two_pair_all(){
    for(var i=0; i<9; i++){
        only_two_pair_lrb(i*9, 3, 1);
        only_two_pair_lrb(i, 27, 9);
        only_two_pair_lrb(BLOCK_N_ST(i), 9, 1);
    }
}
//*/

/**
 * @c arr[p][q]
 * @param {number} p 
 * @param {number} q 
 * @returns {array} p行q列のArray
 */
function Array2Dnull(p, q){
    var a = new Array(p);
    for(var i=0; i<p; i++){
        a[i] = new Array(q);
    }
    return a;
}
/**
 * 
 * @param {number} start 
 * @param {number} byA 
 * @param {number} byB 
 */
function only_two_pair_lrb(start, byA, byB){
    var i, j, k, l, roop, cnt;
    var q_k = new Array(10).fill(0);//0で初期化
    for(k=1;k<=9;k++){
        for(i=0;i<3;i++)for(j=0;j<3;j++){
            roop = start + i*byA + j*byB;
            if(data[roop].FLAG(k))q_k[k]++;
        }
    }

    var pair_k_in = Array2Dnull(10, 2);
    
    for(k=1; k<=9; k++){
        cnt = 0;
        if(q_k[k] == 2){
            for(i=0;i<3;i++)for(j=0;j<3;j++){
                roop = start + i*byA + j*byB;
                if(data[roop].FLAG(k)){
                    pair_k_in[k][cnt] = roop;
                    cnt++;
                }
            }
        }
    }
    //ブロック内で2箇所のみkが入るマスがpair_k_in[k][2]に入った
    for(k=1; k<=8; k++){//k<=8で正しい
        if(q_k[k] == 2){
            for(l=k+1; l<=9; l++){
                if(pair_k_in[k][0] == pair_k_in[l][0]
                && pair_k_in[k][1] == pair_k_in[l][1]){
                    //pairの組が一致したらそこでkとlが独占
                    data[ pair_k_in[k][0] ].d = data[ pair_k_in[k][1] ].d  = 0x0;
                    data[ pair_k_in[k][0] ].d = data[ pair_k_in[k][1] ].d |= 1<<k;
                    data[ pair_k_in[k][0] ].d = data[ pair_k_in[k][1] ].d |= 1<<l;
                    //フラグ立てをkとlのみにする
                }
            }
        }
    }
}
//*/

/** end calc */