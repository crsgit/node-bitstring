function BitString(data, opts) {
    // opts for further buffer BE LE write read, Now only BE supported
    if (!(this instanceof BitString)) {
        return new BitString(data);
    }

    if (Buffer.isBuffer(data)) {
        this.buffer = Buffer.alloc(data.length, data.toString("hex"), "hex");
    } else if (typeof data === "number" || data === undefined) {
        data = data || 0;
        this.buffer = Buffer.alloc(Math.ceil(data / 8));
    } else {
        return;
    }
    this.binaryString = bufferToBinaryString(this.buffer);
}

BitString.prototype.set = function(i, l) {
    if (parseInt(i) === NaN) return;
    l = l || 1;
    l = l.toString();
    let offset = i;
    binaryString = this.binaryString.split("");
    for (let i = 0; i < l.length; i++) {
        if (offset >= binaryString.length) break;
        binaryString[offset] = parseInt(l.substr(i, 1)) ? "1" : "0";
        offset++;
    }
    this.binaryString = binaryString.join("");
    this.buffer.write(binaryStringToHexString(this.binaryString), "hex");
    return;
};

BitString.prototype.get = function(i, l) {
    if (parseInt(i) === NaN) return;
    l = l || 1;
    let result = this.binaryString.substr(i, l);
    result = result === "" ? false : result;
    return result;
};

BitString.prototype.bufferToBinaryString = bufferToBinaryString;
BitString.prototype.binaryStringToHexString = binaryStringToHexString;

function bufferToBinaryString(buf) {
    let binaryString = "";
    for (let offset = 0, length = buf.length; offset < length; offset++) {
        binaryString += buf
            .readUInt8(offset)
            .toString(2)
            .padStart(8, "0");
    }
    return binaryString;
}

function binaryStringToHexString(binaryString) {
    let length = binaryString.length;
    binaryString += "0".repeat(8 - (length % 8));
    let hexString = "";
    for (let offset = 0; offset < length; ) {
        hexString += parseInt(binaryString.slice(offset, (offset += 8)), 2)
            .toString(16)
            .toUpperCase()
            .padStart(2, "0");
    }
    return hexString;
}

module.exports = BitString;
