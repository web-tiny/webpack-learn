import 'babel-polyfill';
import './style/index.css';
import './less/index.less';
import { a } from './js/index.js';

import './subPageA';
import './subPageB';

import * as _ from 'lodash';
console.log("at index:", _);

let eroot=document.getElementById("root")
eroot.innerHTML = 'Hi webpack ,I am here !' + a
// console.log(b)
$('#usejq').css({"color":"blue"})

let func = () => {};
const NUM = 45;
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);

console.log(arrB.includes(8));
console.log("new Set(arrB) is ", new Set(arrB));

export default 'index';