# BitString

a very simple bit operation module, this module is base created for dns header decode/encode.

    npm install node-bitstring

#### Example

```js
let BitString = require("node-bitstring");

// let bitOpt = new BitString(Buffer.alloc(2)); create a bit string with 32 bits

let bitOpt = new BitString(32);
//BitString {buffer: <Buffer 00 00 00 00>,binaryString: '00000000000000000000000000000000' }
//create a bit string with 32 bits
//should be a number which can divide by 8
//if not it will auto fill

bitOpt.set(0, 111111); //"11111100000000000000000000000000"
bitOpt.set(0, 000111); //"11000000000000000000000000000000"
bitOpt.set(0, "000111"); //"00011100000000000000000000000000"
// The number will conversion to the string if the number start will 0 it will be ignored
bitOpt.get(0, 10); //"0001110000"
bitOpt.get(0, 100); //"00011100000000000000000000000000"; if length out-of-bounds, the excess part will be ignored;
bitOpt.get(32, 100); //false; if index out-of-bounds, the excess part will be ignored;

bitOpt.buffer; // <Buffer 1c 00 00 00>
bitOpt.binaryString; // "00011100000000000000000000000000"
```

#### Instance Methods

`BitString(data)` : `data` Can be either a number or buffer;
`BitString#get(index,length)`: Returns a binary string;
`BitString#set(index,value)`: Set the value of the bits. `index` start position `value` should be number string "0" will be set to 0, other is 1. if value out-of-bounds, the excess part will be ignored;

`BitString#bufferToBinaryString(buf)` : Returns a binary string;

```js
bitOpt.bufferToBinaryString(Buffer.alloc(4, "AABBCCDD", "hex")); //"10101010101110111100110011011101"
```

`BitString#binaryStringToHexString(binaryString)` : Returns a Hex string;

```js
bitOpt#binaryStringToHexString("10101010101110111100110011011101") // "AABBCCDD"
```

#### Properties

`BitString#buffer`: The contents of the BitString.

`BitString#binaryString`: The contents of the BitString.

## License

MIT
