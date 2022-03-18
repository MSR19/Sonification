var fs = require('fs');
var Midi = require('jsmidgen');
const { exit } = require('process');
const { takeCoverage } = require('v8');

const args = process.argv.slice(2)

let outFimeName;

let var1FileName;
let var2FileName;
let var3FileName;

let dataFileName;

//parsing args
if (args.length == 0) {
  console.log("No file data selected, switching to the example data file")
  dataFileName = 'exemplo.txt';
  outFimeName = "test"
}

if (args.length == 1) {
  outFimeName = "test"
  dataFileName = args[0]
}
if (args.length == 2) {
  outFimeName = args[0]
  dataFileName = args[1]
}
if (args.length == 3) {
  outFimeName = args[0]
  var1FileName = args[1]
  var2FileName = args[2]
}
if (args.length == 4) {
  outFimeName = args[0]
  var1FileName = args[1]
  var2FileName = args[2]
  var3FileName = args[3]
}


try {

  let var1 = [];
  let var2 = [];
  let var3 = [];

  //RETRIVE data
  if (dataFileName != null) {

    const data = fs.readFileSync(dataFileName, 'utf8')

    let dataFromFile = data.split(',');

    for (let i = 0; i != dataFromFile.length; i = i + 3) {
      var1.push(dataFromFile[i])
      var2.push(dataFromFile[i + 1])
      var3.push(dataFromFile[i + 2])
    }
  }

  if (var1FileName != null && var2FileName != null && var3FileName == null) {
    const data = fs.readFileSync(var1FileName, 'utf8')
    const data2 = fs.readFileSync(var2FileName, 'utf8')

    console.log(data)
    console.log(data2)

    let dataFromFile = data.split(',');
    let dataFromFile2 = data2.split(',');

    if (dataFromFile.length != dataFromFile2.length) {
      console.log("Files must be from the same dataset!")
      exit;
    }
    for (let i = 0; i != dataFromFile.length; i++) {
      var1.push(dataFromFile[i])
      var2.push(dataFromFile2[i])
      var3.push(1)
    }
  }

  if (var1FileName != null && var2FileName != null && var3FileName != null) {
    const data = fs.readFileSync(var1FileName, 'utf8')
    const data2 = fs.readFileSync(var2FileName, 'utf8')
    const data3 = fs.readFileSync(var3FileName, 'utf8')

    let dataFromFile = data.split(',');
    let dataFromFile2 = data2.split(',');
    let dataFromFile3 = data3.split(',');

    if (dataFromFile.length != dataFromFile2.length || dataFromFile2.length != dataFromFile3.length) {
      console.log("Files must be from the same dataset!")
      exit;
    }
    for (let i = 0; i != dataFromFile.length; i++) {
      var1.push(dataFromFile[i])
      var2.push(dataFromFile2[i])
      var3.push(dataFromFile3[i])
    }
  }

  if (var1 == null || var2 == null || var3 == null) {
    exit;
  }

  //DATA normalization

  let var1min = Math.min.apply(Math, var1);
  let var2min = Math.min.apply(Math, var2);
  let var3min = Math.min.apply(Math, var3);

  let var1mean = Math.max.apply(Math, var1) - var1min;
  let var2mean = Math.max.apply(Math, var2) - var2min;
  let var3mean = Math.max.apply(Math, var3) - var3min;

  for (let i = 0; i != var1.length; i++) {
    if ((var1[i] - var1min) != 0)
      var1[i] = (var1[i] - var1min) / var1mean;
    else
      var1[i] = 0
    if ((var2[i] - var2min) != 0)
      var2[i] = (var2[i] - var2min) / var2mean;
    else
      var2[i] = 0
    if ((var3[i] - var3min) != 0)
      var3[i] = (var3[i] - var3min) / var3mean;
    else
      var3[i] = 0
  }

  for (let i = 0; i != var1.length; i++) {
    var1[i] = Math.round(var1[i] * 29);
    var2[i] = Math.round(var2[i] * 29);
    var3[i] = Math.round(var3[i] * 4);
  }

  console.log("var1")
  console.log(var1)
  console.log("var2")
  console.log(var2)
  console.log("var3")
  console.log(var3)
  console.log("lengh")
  console.log(var1.length)
  console.log(var2.length)
  console.log(var3.length)


  let dataNormalize = []

  for (let i = 0; i != var1.length; i++) {
    dataNormalize.push([var1[i], var2[i], var3[i]]);
  }

  //console.log(dataNormalize);


  //Data composta por nota, intrumento, duracao
  //DataNomalize e um array de arraeis cuja data foi nomalizada para estar dentro dos limites

  //3 variaveis a nota, o instrumento e a duração da nota
  //nota e instrumento range de 0-30
  //duração de 0-5

  var file = new Midi.File();
  var track = new Midi.Track();

  var notes = ['c1', 'd1', 'e1', 'gb1', 'ab1', 'bb1', 'c2', 'd2', 'e2', 'gb2', 'ab2', 'bb2', 'c3', 'd3', 'e3', 'gb3', 'ab3', 'bb3', 'c4', 'd4', 'e4', 'gb4', 'ab4', 'bb4', 'c5', 'd5', 'e5', 'gb5', 'ab5', 'bb5'];

  var noteDuration = [32, 64, 128, 256, 512];

  var instruments = [0x01, 0x02, 0x03, 0x4, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x30];

  //Começa a escrita das notas
  file.addTrack(track);

  //Componente para uma nota
  for (let i = 0; i != dataNormalize.length; i++) {
    track.instrument(0, 0x01)
    track.addNoteOn(0, notes[dataNormalize[i][0]], noteDuration[dataNormalize[i][2]]);
    track.instrument(0, 0x12);
    track.addNoteOn(0, notes[dataNormalize[i][1]]);

    track.addNoteOff(0, notes[dataNormalize[i][0]], noteDuration[dataNormalize[i][2]]);
    track.addNoteOff(0, notes[dataNormalize[i][1]])
  }

  console.log(outFimeName)
  //Escreve a track no ficheiro MiDI
  fs.writeFileSync(outFimeName + ".midi", file.toBytes(), 'binary');
} catch (err) {
  console.error(err)
}
