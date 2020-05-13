/* Boolean
Number
String
Date
RegExp
Error */

/* ECMAscript内置对象 */

let b: Boolean = new Boolean(1)
b = false
let n: Number = new Number(true)
let s: String = new String("abc")
let d: Date = new Date()
// d = Date.now()  Error 为string
let r: RegExp = /^a\d2$/
let e: Error = new Error("我错了")
// e = "错了" Error 为string类型

/*Window
Document
HTMLElement
DocumentFragment
Event
NodeList */

// const div: HTMLElement = document.querySelector("div")
const divs: NodeList = document.querySelectorAll("div")
document.addEventListener("click", (e) => { console.log(e.target); })
const fragment: DocumentFragment = document.createDocumentFragment()