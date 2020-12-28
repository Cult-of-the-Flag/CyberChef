/**
 * @author cult chef [me@ignis.wtf]
 */

import Operation from "../Operation.mjs";
import XORplain from "./XorKnownPlain.mjs";
import ROT13 from "./ROT13.mjs";
import ROT47 from "./ROT47.mjs";
import FromBase91 from "./FromBase91.mjs";

class CultMagic extends Operation {

    constructor() {
        super();

        this.name = "The fuck is this";
        this.module = "Default";
        this.description = "Another crappy ctf";
        this.infoURL = "https://flag.farm/";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Flag format",
                "type": "binaryString",
                "value": "flag{.*}"
            },
            //{
            //    "name": "Alphabet",
            //    "type": "binaryString",
            //    "value": "[ -~]"
            //}
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const alphabet = /^[ -~]+$/;
        const crib = args[0]
        const format = RegExp("^" + args[0].replace('{', '\\{').replace('}', '\\}') + "$")
        
        var x = String.fromCharCode.apply(String, new Uint8Array(input))
        if(this._correct(x,format,alphabet)){
            return this.str2arr("This is a fucking flag you dipshit.")
        }

        x = FromBase91.call(input, [true])
        x = String.fromCharCode.apply(String, new Uint8Array(x))
        if(this._correct(x,format,alphabet)){
            return this.str2arr("This is base91. Your fucking flag is: \n" + x)
        }

        for(var i=1; i<26; i++){
            x = ROT13.call(input, [true,true,i])
            x = String.fromCharCode.apply(null, new Uint8Array(x))
            if(this._correct(x,format,alphabet)){
                return this.str2arr("This is rot13 with offset: " + String(i) + ". Your fucking flag is: \n" + x)
            }
        }

        for(var i=1; i<26; i++){
            var x = ROT13.call(input, [false,true,i])
            x = String.fromCharCode.apply(String, new Uint8Array(x))
            if(this._correct(x,format,alphabet)){
                return this.str2arr("This is rot13 with uppercase only offset: " + String(i) + ". Your fucking flag is: \n" + x)
            }
        }

        for(var i=1; i<26; i++){
            var x = ROT13.call(input, [true,false,i])
            x = String.fromCharCode.apply(String, new Uint8Array(x))
            if(this._correct(x,format,alphabet)){
                return this.str2arr("This is rot13 with lowercase only offset: " + String(i) + ". Your fucking flag is: \n" + x)
            }
        }

        for(var i=1; i<92; i++){
            var x = ROT47.call(input, [i])
            x = String.fromCharCode.apply(String, new Uint8Array(x))
            if(this._correct(x,format,alphabet)){
                return this.str2arr("This is rot47 with offset: " + String(i) + ". Your fucking flag is: \n" + x)
            }
        }

        for(var i=0;i<crib.length;i++){
            var x = XORplain.call(input, [{option:"latin1", string:crib.slice(0,i)}, "Standart", false])
            x = String.fromCharCode.apply(String, new Uint8Array(x))
            if(this._correct(x,format,alphabet)){
                return this.str2arr("This is XOR with a " + String(i) + " length key. Your fucking flag is: \n" + x)
            }
        }

        return this.str2arr("The fuck is this")
    }

    str2arr(str) {
        const result = [];
        for (var i = 0; i < str.length; i++) {
          result.push(str.charCodeAt(i));
        }
        return result;
      }
    
    _correct(str, format, alphabet) {
        if(str.match(format) && str.match(alphabet)){
            return true;
        }
        return false;
    }

    highlight(pos, args) {
        return pos;
    }

    highlightReverse(pos, args) {
        return pos;
    }

}

export default CultMagic;
