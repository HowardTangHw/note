var a =1;
function ani(txts) {
    a++;
    var fn = arguments.callee;
    fn();
    console.log(a);
}
ani();