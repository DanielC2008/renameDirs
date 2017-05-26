'use strict'

const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

const { createReadStream } = require('fs')

let [,,...rest] = process.argv
let file = rest[0]
let bufferArr = []
let ArrayOfStrings = []

let readStream = createReadStream(file)

readStream.on('data', jobInfo => {
  bufferArr.push(jobInfo)
})

readStream.on('end', () => {
  let buffArrayToString = bufferArr.map( buff => String.fromCharCode.apply(null, new Uint16Array(buff)))
    .concat()
    .toString()
    .replace(/\s\s/g, '_') //because there are random amount of spaces between each piece of data

  let jobString = ''
  for(let letter of buffArrayToString) {
    if(letter != '_') {
      let addToString = jobString.concat(letter)
      jobString = addToString
    } else{
      if (jobString != '') {
        ArrayOfStrings.push(jobString)
        jobString = ''
      }
    }
  }
  let finalArr = ArrayOfStrings.map( string => string.trimLeft())
  console.log(finalArr)
})


app.listen()