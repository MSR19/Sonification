#Sonification

This is a simple javaCript that uses csv file containg a variable and transformit into sound. 
To do this the inforamtion is normalized and mapped to a intrument or the duration of the notes.

This uses the jsmidgen (https://www.npmjs.com/package/jsmidgen) to transform the normalized data into a midi file.

#Run

To run this project run the following comands

npm install

npm start OUTFILENAME MINPERCENTAGE MAXPERCENTAGE VAR1FILENAME [VAR2FILENAME [VER3FILENAME]]

Each file can contain only one variable and all the files most have the same number of data entries.

#Examples 

This repo also cotains examples of sonified data.

This examples were used in another project (https://github.com/MSR19/Multisensory-Interface)