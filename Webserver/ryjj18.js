module.exports = {
    ryjj18: function(str, seed = 1){
        let c1 = 0x17022000;
        let c2 = 0x25042004;
        
        for (let i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            c1 = Math.imul(c1*ch, 783456623);
            c2 = Math.imul(c2*ch, 783456623);
        }
    
        c1 = Math.imul(c1, 884467234) ^ Math.imul(c2, 234546542);
        c2 = Math.imul(c2, 884467234) ^ Math.imul(c1, 234546542);
    
        return 7413425 * (c1*seed + c2*seed);
    },
}